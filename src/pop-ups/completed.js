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

export default function Component({ details, isOpen, onClose, request }) {
  const [isVisible, setIsVisible] = useState(false);

  console.log("details", details);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleDownload = () => {
    // Handle download logic here
    setIsVisible(false);
  };

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
                ? "Bill paid"
                : request === "transaction"
                ? `Transaction ${details?.name}`
                : "Request Send for $5k"}
            </CardTitle>
          )) || (
            <CardTitle className="text-2xl font-semibold">
              ${details.amountSent.toLocaleString()}k Sent
            </CardTitle>
          )}
          <p className="text-sm text-p font-medium mt-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
            mi id purus
          </p>
          <button className="btn-bg hover:bg-inherit rounded-xl text-black">
            Details of Transaction
          </button>
        </CardHeader>

        {request === "balance" ? (
          <CardContent>
            <div className="space-y-2 ">
              <div className="flex justify-between">
                <span className="txt-detail">Sender Name</span>
                <span className="txt-detail">{details.senderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Receiver Name</span>
                <span className="txt-detail">{details.receiverName}</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Bill ID</span>
                <span className="txt-detail">{details.billid}</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Receiver Account Type</span>
                <span className="txt-detail">
                  {details.receiverAccountType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Date</span>
                <span className="txt-detail">{details.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Time</span>
                <span className="txt-detail">{details.time}</span>
              </div>
              <div>
                <p className="line-color">
                  ---------------------------------------------------
                </p>
              </div>

              <div className="flex justify-between">
                <span className="txt-detail">Amount Sent</span>
                <span className="txt-detail">${details.amountSent}</span>
              </div>

              <div className="flex justify-between">
                <span className="txt-detail">Service Fee</span>
                <span className="txt-detail">${details.serviceFee}</span>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="txt-detail">Sender Name</span>
                <span className="txt-detail">{details?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Account Number</span>
                <span className="txt-detail truncate">
                  {details?.accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="txt-detail">Payment Type</span>
                <span className="txt-detail">{details?.type}</span>
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
                <span className="txt-detail">{details?.amount}</span>
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
                <span className="txt-detail">{details?.time}</span>
              </div>
            </div>
          </CardContent>
        )}

        <CardFooter>
          <Button
            onClick={handleDownload}
            className="w-auto mx-auto hover:bg-inherit btn-txt shadow-none font-semibold bg-none bg-inherit"
          >
            Download Slip
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
