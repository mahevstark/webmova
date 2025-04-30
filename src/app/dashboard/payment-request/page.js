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
import PaymentRequestPopup from "../../../pop-ups/payment-req-details"; // Adjust the path as necessary
import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";

const employees = [
  {
    id: 1,
    name: "Dummy name",
    accountNumber: "0817239419528913",
    day: "23-07-2024",
    time: "10:30 AM",
    type: "Credit",
    amount: "$500",
    serviceFee: "$5",
  },
  {
    id: 2,
    name: "John Doe",
    accountNumber: "0923425894132324",
    day: "24-07-2024",
    time: "11:00 AM",
    type: "Debit",
    amount: "$300",
    serviceFee: "$3",
  },
  {
    id: 3,
    name: "Jane Smith",
    accountNumber: "1029384756102834",
    day: "25-07-2024",
    time: "09:15 AM",
    type: "Credit",
    amount: "$450",
    serviceFee: "$4.50",
  },
  {
    id: 4,
    name: "Mary Johnson",
    accountNumber: "2837465190203846",
    day: "26-07-2024",
    time: "02:30 PM",
    type: "Debit",
    amount: "$200",
    serviceFee: "$2",
  },
  {
    id: 5,
    name: "Robert Brown",
    accountNumber: "3847562839128472",
    day: "27-07-2024",
    time: "04:45 PM",
    type: "Credit",
    amount: "$600",
    serviceFee: "$6",
  },
  {
    id: 6,
    name: "Linda Taylor",
    accountNumber: "4958371029485761",
    day: "28-07-2024",
    time: "12:00 PM",
    type: "Debit",
    amount: "$350",
    serviceFee: "$3.50",
  },
  {
    id: 7,
    name: "Michael Lee",
    accountNumber: "5672839420654738",
    day: "29-07-2024",
    time: "10:00 AM",
    type: "Credit",
    amount: "$550",
    serviceFee: "$5.50",
  },
  {
    id: 8,
    name: "Patricia Harris",
    accountNumber: "6784937452618490",
    day: "30-07-2024",
    time: "01:30 PM",
    type: "Debit",
    amount: "$400",
    serviceFee: "$4",
  },
  {
    id: 9,
    name: "James Clark",
    accountNumber: "7896432958714062",
    day: "31-07-2024",
    time: "03:15 PM",
    type: "Credit",
    amount: "$700",
    serviceFee: "$7",
  },
  {
    id: 10,
    name: "Emily Lewis",
    accountNumber: "8905637280923745",
    day: "01-08-2024",
    time: "11:45 AM",
    type: "Debit",
    amount: "$250",
    serviceFee: "$2.50",
  },
  {
    id: 11,
    name: "David Walker",
    accountNumber: "9016748395842036",
    day: "02-08-2024",
    time: "05:00 PM",
    type: "Credit",
    amount: "$800",
    serviceFee: "$8",
  },
  {
    id: 12,
    name: "Susan Hall",
    accountNumber: "0127483926485793",
    day: "03-08-2024",
    time: "07:30 AM",
    type: "Debit",
    amount: "$150",
    serviceFee: "$1.50",
  },
  {
    id: 13,
    name: "William Allen",
    accountNumber: "1238593748495940",
    day: "04-08-2024",
    time: "09:00 AM",
    type: "Credit",
    amount: "$900",
    serviceFee: "$9",
  },
  {
    id: 14,
    name: "Elizabeth Young",
    accountNumber: "2349701826457381",
    day: "05-08-2024",
    time: "01:00 PM",
    type: "Debit",
    amount: "$180",
    serviceFee: "$1.80",
  },
  {
    id: 15,
    name: "Joseph King",
    accountNumber: "3450618372574809",
    day: "06-08-2024",
    time: "08:45 AM",
    type: "Credit",
    amount: "$950",
    serviceFee: "$9.50",
  },
  {
    id: 16,
    name: "Barbara Scott",
    accountNumber: "4561729483826712",
    day: "07-08-2024",
    time: "03:30 PM",
    type: "Debit",
    amount: "$550",
    serviceFee: "$5.50",
  },
  {
    id: 17,
    name: "Charles Martinez",
    accountNumber: "5672834940276925",
    day: "08-08-2024",
    time: "10:00 AM",
    type: "Credit",
    amount: "$1000",
    serviceFee: "$10",
  },
  {
    id: 18,
    name: "Nancy Thompson",
    accountNumber: "6783940562738046",
    day: "09-08-2024",
    time: "12:30 PM",
    type: "Debit",
    amount: "$400",
    serviceFee: "$4",
  },
  {
    id: 19,
    name: "Mark Robinson",
    accountNumber: "7895067381019267",
    day: "10-08-2024",
    time: "02:15 PM",
    type: "Credit",
    amount: "$1100",
    serviceFee: "$11",
  },
  {
    id: 20,
    name: "Sarah Carter",
    accountNumber: "8906178529340389",
    day: "11-08-2024",
    time: "04:00 PM",
    type: "Debit",
    amount: "$250",
    serviceFee: "$2.50",
  },
];

export default function PaymentRequest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define how many items per page

  const handleView = (employee) => {
    setSelectedData(employee); // Set the selected employee data
    setIsOpen(true); // Open the popup
  };

  const handleClose = () => {
    setIsOpen(false); // Close the popup
  };

  // Filter employees based on search term (optional)
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const token = Cookies.get("token");

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const getReq = async () => {
    try {
      const resppnse = await GlobalApi.getPendingReq(token);
      console.log("rr", resppnse);

      if (resppnse?.success === true) {
      } else {
      }
    } catch (error) {
      console.log("error while getting req", error);
    }
  };

  return (
    <Layout page="paymentrequest">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 w-72 sm:w-full pb-12">
        <h1 className="text-2xl font-semibold mb-4">Payment Requests</h1>
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
                    <TableHead className="sm:table-cell"></TableHead>
                    <TableHead className="font-semibold text-black">
                      Sender Name
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      Receiver Name
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      Account Number
                    </TableHead>
                    <TableHead className="font-semibold text-black">
                      Amount
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      Service Fee
                    </TableHead>
                    <TableHead className="font-semibold text-black flex justify-center items-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmployees.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className="text-muted-foreground border-0"
                    >
                      <TableCell className="sm:table-cell">
                        {employee.id}
                      </TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell className="sm:table-cell">
                        {employee.accountNumber}
                      </TableCell>
                      <TableCell className="sm:table-cell">
                        {employee.day}
                      </TableCell>
                      <TableCell className="sm:table-cell">
                        {employee.time}
                      </TableCell>
                      <TableCell className="sm:table-cell ">
                        {employee.type}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end flex-col sm:flex-row gap-3 ">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border text-left hover:text-blue-500"
                            onClick={() => handleView(employee)} // Pass employee data
                          >
                            View
                          </Button>
                          {/* <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border text-left hover:text-blue-500"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border text-left hover:text-blue-500"
                          >
                            Decline
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="hover:bg-[#544af1] hover:text-white cursor-pointer border-[#544af1] border rounded-md px-4 text-[#544af1] py-1"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="hover:bg-[#544af1] hover:text-white cursor-pointer border-[#544af1] border rounded-md px-4 text-[#544af1] py-1"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
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
