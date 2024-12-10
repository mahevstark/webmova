"use client";
import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pin from '../../../pop-ups/pin';
export default function requestmoney() {
  const [formData, setFormData] = useState({
    amount: "",
    accountNumber: "",
    bankName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
   
  };
  var page="Dashboard"

  return (
    <Layout page={page}>
      <div className="px-11">
        <h1 className="text-2xl font-semibold mb-4">Payment Request</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          bibendum laoreet massa quis viverra.
        </p>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-80 mx-auto border shadow-md px-12 py-5 rounded-md">
            <div>
              <h2 className="text-lg font-semibold mb-5 text-center">Enter Request Amount</h2>
              <textarea
                cols="50"
                rows="4"
                placeholder="Enter Request Amount "
                className="w-full border rounded resize-none focus:outline-none focus:ring-0 focus:border-1 text-center mx-auto pt-14"
              ></textarea>
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            
            <Pin
          value="Next"
          style="button-background text-white font-semibold border rounded-lg w-full mt-12  no-hover "
          request="payment"
        />
          </form>
        </div>
      </div>
    </Layout>
  );
}
