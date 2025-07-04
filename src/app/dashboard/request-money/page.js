"use client";
import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Pin from "../../../pop-ups/pin";
import GlobalApi from "../../../lib/GlobalApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Paymentsent from "../../../pop-ups/completed";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RequestMoney() {
  const [formData, setFormData] = useState({
    amount: "",
  });
  const [paymentData, setPaymentdata] = useState({
    amount: 0,
    data: "",
    url: "",
  });
  const [showExpertise, setShowExpertise] = useState(false);
  const toggleExpertise = () => {
    setShowExpertise(!showExpertise);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || formData.amount <= 0) {
      toast("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    const baseUrl =
      "https://usmansharif910.github.io/redirect-link/sendmoney.html";
    const token = Cookies.get("token");

    const requestData = {
      token: token,
      link: baseUrl,
    };

    try {
      const response = await GlobalApi.withdrawmoney(requestData, token);
      console.log("API response: ", response);

      if (response?.success === true) {
        toast("Payment withdraw success");

        const login_data = JSON.parse(localStorage.getItem("userData"));
        console.log("login_data", login_data?.firstName, login_data?.lastName);

        // Build query parameters in the exact order you specified
        const queryParams = new URLSearchParams();
        queryParams.append("amount", formData.amount);
        queryParams.append("user_id", login_data?.id);
        queryParams.append("wallet_id", login_data.wallet.id);
        queryParams.append("transaction_id", Date.now().toString());
        queryParams.append("action", "requested");
        queryParams.append("firstName", login_data?.firstName);
        queryParams.append("lastName", login_data?.lastName);
        queryParams.append("bank", login_data?.bank || "undefined");

        // Get the payment URL from response (contains the code parameter)
        const paymentUrl = response?.data?.paymentUrl;

        if (paymentUrl) {
          console.log("Received payment URL:", paymentUrl);

          let code = null;

          // Handle different URL protocols
          if (
            paymentUrl.startsWith("mowa://") ||
            paymentUrl.startsWith("app://")
          ) {
            // Handle custom protocol URLs (deep links)
            try {
              // Extract code from custom protocol URL
              const urlParts = paymentUrl.split("?");
              if (urlParts.length > 1) {
                const params = new URLSearchParams(urlParts[1]);
                code = params.get("code");
              }
            } catch (error) {
              console.log("Error parsing custom protocol URL:", error);
            }
          } else if (paymentUrl.startsWith("http")) {
            // Handle standard HTTP/HTTPS URLs
            try {
              const url = new URL(paymentUrl);
              code = url.searchParams.get("code");
            } catch (error) {
              console.log("Error parsing HTTP URL:", error);
            }
          }

          // Add the code to our query parameters if found (at the end)
          if (code) {
            queryParams.append("code", code);
            console.log("Extracted code:", code);
          } else {
            console.log("No code parameter found in payment URL");
          }

          // Construct the final web URL with all parameters
          const finalUrl = `${baseUrl}?${queryParams.toString()}`;
          setPaymentdata({
            url: finalUrl,
            amount: formData?.amount,
            data: response?.data,
          });

          console.log("Final redirect URL:", finalUrl);
          toggleExpertise();
        } else {
          console.log("Payment URL not found in response");
          toast("Payment URL not received from server");
        }

        // Reset form
        setFormData({
          amount: "",
        });
      } else {
        toast(response?.message || "Error while withdrawing money");
        setFormData({
          amount: "",
        });
      }
    } catch (error) {
      console.log("Error while withdrawing money", error);
      toast("Network Error");
      setFormData({
        amount: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const page = "Dashboard";

  return (
    <Layout page={page}>
      <div className="px-11">
        <div className="flex gap-2 items-center mb-4 ">
          {" "}
          <Link href="/">
            {" "}
            <ArrowLeft />
          </Link>
          <h1 className="text-lg md:text-2xl font-semibold">
            Withdraw Payment
          </h1>
        </div>
        <p className="text-gray-600 mb-6 text-sm">
          Transfer your funds quickly and securely to your account.
        </p>
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-xl mx-auto border shadow-md px-12 py-5 rounded-md"
          >
            <div>
              <h2 className="text-lg font-semibold mb-5 text-center">
                Enter Withdraw Amount
              </h2>
              <textarea
                cols="50"
                rows="4"
                placeholder="Enter Withdraw Amount"
                className="w-full border rounded resize-none focus:outline-none focus:ring-0 focus:border-1 text-center mx-auto pt-14"
                value={formData.amount}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }));
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="button-background text-white font-semibold border rounded-lg w-full no-hover disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Withdraw"}
            </Button>
          </form>
        </div>
      </div>
      <Paymentsent
        isOpen={showExpertise}
        closeModal={toggleExpertise}
        paymentData={paymentData}
        request={"withdraw"}
      />
    </Layout>
  );
}
