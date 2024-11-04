"use client";

import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import PaymentRequestPopup from '../../../pop-ups/payment-req-details' // Adjust the path as necessary

const employees = [
  {
    id: 1,
    name: "Dummy name",
    accountNumber: "0817239419528913",
    day: "23-07-2024",
    time: "10:30 AM",
    type: "Credit",
    amount: "$500",
    serviceFee: "$5", // Add service fee
  },
  // Add more employee objects...
];

export default function PaymentRequest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  
  const page = "paymentrequest";

  const handleView = (employee) => {
    setSelectedData(employee); // Set the selected employee data
    setIsOpen(true); // Open the popup
  };

  const handleClose = () => {
    setIsOpen(false); // Close the popup
  };

  return (
    <Layout page={page}>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 w-72 sm:w-full">
        <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Select className="border-class-employee w-full sm:w-[180px]">
              <SelectTrigger className="border-class-employee select-color font-medium">
                <SelectValue placeholder="All Requests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search keyword"
                className="pl-10 pr-4 py-2 w-full border-class-employee select-f-color font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="border-t">
          <Card className="border-none shadow-none p-0 mt-5 mb-5">
            <CardContent className="p-0 overflow-x-auto">
              <Table className="p-0">
                <TableHeader className="tb-col">
                  <TableRow>
                    <TableHead className=" sm:table-cell"></TableHead>
                    <TableHead className="font-semibold text-black">Sender Name</TableHead>
                    <TableHead className=" sm:table-cell font-semibold text-black">Receiver Name</TableHead>
                    <TableHead className=" sm:table-cell font-semibold text-black">Account Number</TableHead>
                    <TableHead className="font-semibold text-black">Amount</TableHead>
                    <TableHead className=" sm:table-cell font-semibold text-black">Service Fee</TableHead>
                    <TableHead className="font-semibold text-black">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} className="text-muted-foreground border-0">
                      <TableCell className=" sm:table-cell">{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell className=" sm:table-cell">{employee.accountNumber}</TableCell>
                      <TableCell className=" sm:table-cell">{employee.day}</TableCell>
                      <TableCell className=" sm:table-cell">{employee.time}</TableCell>
                      <TableCell className=" sm:table-cell">{employee.type}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row ">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border-none text-left hover:text-blue-500"
                            onClick={() => handleView(employee)} // Pass employee data
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border-none text-left hover:text-blue-500"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border-none text-left hover:text-blue-500"
                          >
                            Decline
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Request Popup */}
      <PaymentRequestPopup
        isOpen={isOpen}
        onClose={handleClose}
        onApprove={() => {
          // Handle approval logic here
          console.log("Approved", selectedData);
          handleClose(); // Close the popup after approval
        }}
        onDecline={() => {
          // Handle decline logic here
          console.log("Declined", selectedData);
          handleClose(); // Close the popup after decline
        }}
        data={selectedData} // Pass the selected data to the popup
        setIsOpen={setIsOpen}
      />
    </Layout>
  );
}
