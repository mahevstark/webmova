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
      className={`absolute cls inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity   ${
        isOpen ? "opacity-100 " : "opacity-0 "
      }`}
    >
      <Card className="w-full max-w-sm mx-auto bg-white ">
        <CardHeader className="text-center">
          {!request && <Image src={Paid} alt="check" className="mx-auto" />}
          {request === "transaction" && (
            <Image src={Paid} alt="check" className="mx-auto" />
          )}

          {(request && (
            <CardTitle className="text-2xl font-semibold">
              ${details.amountSent}{" "}
              {request === "transaction" ? "Added" : "Request Send for $5k "}
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
            Details
          </button>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="txt-detail">Sender Name</span>
              <span className="txt-detail">{details.senderName}</span>
            </div>
            <div className="flex justify-between">
              <span className="txt-detail">Receiver Name</span>
              <span className="txt-detail">{details.receiverName}</span>
            </div>
            <div className="flex justify-between">
              <span className="txt-detail">Receiver Account Type</span>
              <span className="txt-detail">{details.receiverAccountType}</span>
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
                ${details.amountSent.toLocaleString()}
              </span>
            </div>
            {!request === "transaction" && (
              <div>
                <p className="line-color">
                  ---------------------------------------------------
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <span className="txt-detail">Service Fee</span>
              <span className="txt-detail">
                ${details.serviceFee.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>

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
