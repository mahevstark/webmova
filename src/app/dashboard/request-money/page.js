"use client";
import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pin from "../../../pop-ups/pin";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
export default function requestmoney() {
  const [formData, setFormData] = useState({
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl =
      "https://usmansharif910.github.io/redirect-link/sendmoney.html";

    const token = Cookies.get("token");

    const formData = {
      token: token,
      link: baseUrl,
    };

    try {
      const response = await GlobalApi.withdrawmoney(formData, token);
      console.log("rrr", response);

      if (response?.success === true) {
        toast("Payment withdraw sucess");
        setFormData({
          email: "",
        });
        // const queryParams = new URLSearchParams({
        //   amount: amount.toString(),
        //   user_id: loggedUser?.id?.toString(),
        //   wallet_id: loggedUser?.wallet?.id?.toString(),
        //   transaction_id: Date.now().toString(),
        //   action: "requested",
        //   firstName: loggedUser?.firstName,
        //   lastName: loggedUser?.lastName,
        //   bank: loggedUser?.bank,
        // });
        // return queryParams;
      } else {
        toast(response?.message || "Error while withdraw money");
        setFormData({
          email: "",
        });
      }
    } catch (error) {
      console.log("error while withdraw money", error);
      toast("Network Error");
      setFormData({
        email: "",
      });
    }
  };
  var page = "Dashboard";

  return (
    <Layout page={page}>
      <div className="px-11">
        <h1 className="text-2xl font-semibold mb-4">Withdraw Payment</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          bibendum laoreet massa quis viverra.
        </p>
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-80 mx-auto border shadow-md px-12 py-5 rounded-md"
          >
            <div>
              <h2 className="text-lg font-semibold mb-5 text-center">
                Enter Withdraw Amount
              </h2>
              <textarea
                cols="50"
                rows="4"
                placeholder="Enter Withdraw Amount "
                className="w-full border rounded resize-none focus:outline-none focus:ring-0 focus:border-1 text-center mx-auto pt-14"
                value={formData.amount}
                onChange={(e) => {
                  setFormData(e.target.value);
                }}
              ></textarea>
            </div>
            {/* <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Account Number
              </label>
              <Input
                type="text"
                placeholder="Enter Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-0 focus:border-0 mt-2"
              />
            </div> */}
            {/* <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-700"
              >
                Bank Name
              </label>
              <Input
                type="text"
                placeholder="Enter Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-2"
              />
            </div> */}

            {/* <Pin
              value="Next"
              style="button-background text-white font-semibold border rounded-lg w-full mt-12  no-hover "
              request="payment"
            /> */}

            <Button
              type="submit"
              className="button-background text-white font-semibold border rounded-lg w-full no-hover"
            >
              Withdraw
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
