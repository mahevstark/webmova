"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Paid from "../assets/paid/paid.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Component({ paymentData, isOpen, onClose, request }) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [senderName, setSenderName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));

    setSenderName(data?.firstName);

    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleDownload = () => {
    // Handle download logic here
    setIsVisible(false);
    pathname === "/dashboard/send-money" && router.push("/dashboard");
  };

  console.log("v", paymentData?.payment?.createdAt);
  console.log("my payyment data", paymentData);

  function getTodayFormatted() {
    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  }
  if (!isVisible) return null;

  return (
    <div
      className={`absolute cls pt-12 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity   ${
        isOpen ? "opacity-100 " : "opacity-0 "
      }`}
    >
      <Card className="w-full max-w-sm mx-auto bg-white mt-7 ">
        <CardHeader className="text-center">
          {!request && <Image src={Paid} alt="check" className="mx-auto" />}
          {request === "transaction" ||
            (request === "balance" && (
              <Image src={Paid} alt="check" className="mx-auto" />
            ))}

          {(request && (
            <CardTitle className="text-2xl font-semibold">
              {request === "balance"
                ? "Balance Added"
                : request === "transaction"
                ? `Transaction ${details?.name}`
                : request === "withdraw"
                ? "Withdraw Success"
                : "Request Send for $5k"}
            </CardTitle>
          )) || (
            <CardTitle className="text-2xl font-semibold">
              ${paymentData.transferAmount} Sent
            </CardTitle>
          )}
          <p className="text-sm text-p font-medium mt-7">
            {request === "withdraw"
              ? "Your funds have been transferred successfully to your account. You should see the amount reflected shortly."
              : request === "balance"
              ? "Your balance has been sent successfully. The funds are now on their way to the recipient’s account. "
              : request === "transaction"
              ? "Your transaction has been completed successfully. The amount has been securely transferred, and you will receive a confirmation receipt shortly"
              : null}
          </p>
          <button className="btn-bg hover:bg-inherit rounded-xl text-black">
            {request === "withdraw"
              ? " Withdraw Details"
              : " Details of Transaction"}
          </button>
        </CardHeader>

        {request === "balance" ? (
          <CardContent>
            <div className="space-y-2 ">
              <div className="flex justify-between">
                <span className="txt-detail">Sender Name</span>
                <span className="txt-detail">{senderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Receiver Name</span>
                <span className="txt-detail">
                  {paymentData.employee?.user?.firstName
                    ? paymentData.employee?.user?.firstName
                    : paymentData.employee?.firstName}
                </span>
              </div>
              {/* <div className="flex justify-between">
                <span className="txt-detail">Bill ID</span>
                <span className="txt-detail">{details.billid}</span>
              </div> */}
              <div className="flex justify-between">
                <span className="txt-detail">Receiver Account Type</span>
                <span className="txt-detail">Stripe</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Date</span>
                <span className="txt-detail"> {getTodayFormatted()}</span>
              </div>

              <div>
                <p className="line-color">
                  ---------------------------------------------------
                </p>
              </div>

              <div className="flex justify-between">
                <span className="txt-detail">Amount Sent</span>
                <span className="txt-detail">
                  $
                  {paymentData?.payment?.transferAmount
                    ? paymentData?.payment?.transferAmount
                    : paymentData?.payment?.addedAmounta}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="txt-detail">Service Fee</span>
                <span className="txt-detail">$0</span>
              </div>
            </div>
          </CardContent>
        ) : request === "withdraw" ? (
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-col gap-1">
                <span className="txt-detail text-center font-semibold">
                  Payment Url
                </span>
                <div className="flex items-center gap-2 flex-col">
                  <div className="txt-detail text-sm flex-1">
                    <div
                      className="break-all  overflow-wrap-anywhere word-break-break-all"
                      style={{ wordBreak: "break-all" }}
                    >
                      {paymentData?.url}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paymentData?.url);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2 py-1 button-background text-white text-xs rounded transition-colors flex-shrink-0"
                  >
                    {copied ? "Copied!" : "Copy URL"}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Withdraw Amount</span>
                <span className="txt-detail">${paymentData?.amount}</span>
              </div>

              {request === "transaction" && (
                <div>
                  <p className="line-color">
                    ---------------------------------------------------
                  </p>
                </div>
              )}

              {request !== "transaction" && (
                <div>
                  <p className="line-color">
                    ---------------------------------------------------
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <span className="txt-detail">Time</span>
                <span className="txt-detail">{getTodayFormatted()}</span>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="txt-detail">Sender Name</span>
                <span className="txt-detail">{senderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Account Number</span>
                <span className="txt-detail truncate">
                  {paymentData?.stripeAccountId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Payment Type</span>
                <span className="txt-detail">Standard</span>
              </div>
              {request === "transaction" && (
                <div>
                  <p className="line-color">
                    ---------------------------------------------------
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <span className="txt-detail">Amount Sent</span>
                <span className="txt-detail">
                  {paymentData?.transferAmount}
                </span>
              </div>
              {request !== "transaction" && (
                <div>
                  <p className="line-color">
                    ---------------------------------------------------
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <span className="txt-detail">Time</span>
                <span className="txt-detail">{getTodayFormatted()}</span>
              </div>
            </div>
          </CardContent>
        )}

        <CardFooter>
          <Button
            onClick={handleDownload}
            className="w-auto mx-auto hover:bg-inherit btn-txt shadow-none font-semibold bg-none bg-inherit"
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
