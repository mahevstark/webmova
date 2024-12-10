"use client";

import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Paymentsent from "../../../pop-ups/completed";
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

const details = {
  senderName: "John Doe",
  receiverName: "Jane Smith",
  receiverAccountType: "Savings",
  amountSent: 500,
  serviceFee: 15,
  title: "Request Send for $5k",
};

const employees = [
  {
    id: 1,
    name: "Dummy name",
    accountNumber: "0817239419528913",
    day: "23-07-2024",
    time: "10:30 AM",
    type: "Credit",
    amount: "$500",
    action: "View",
  },
  {
    id: 2,
    name: "Dummy name",
    accountNumber: "0817239419528913",
    day: "23-07-2024",
    time: "2:15 PM",
    type: "Debit",
    amount: "$200",
    action: "View",
  },
  {
    id: 3,
    name: "Dummy name",
    accountNumber: "0817239419528913",
    day: "23-07-2024",
    time: "9:00 AM",
    type: "Credit",
    amount: "$750",
    action: "View",
  },
  {
    id: 4,
    name: "Dummy name",
    accountNumber: "0817239419528913",
    day: "23-07-2024",
    time: "3:45 PM",
    type: "Debit",
    amount: "$100",
    action: "View",
  },
  {
    id: 5,
    name: "Dummy name",
    accountNumber: "0817239419528913",
    day: "23-07-2024",
    time: "11:30 AM",
    type: "Credit",
    amount: "$300",
    action: "View",
  },
  {
    id: 6,
    name: "Alice Johnson",
    accountNumber: "0817239419528914",
    day: "24-07-2024",
    time: "1:00 PM",
    type: "Credit",
    amount: "$1000",
    action: "View",
  },
  {
    id: 7,
    name: "Bob Smith",
    accountNumber: "0817239419528915",
    day: "24-07-2024",
    time: "12:30 PM",
    type: "Debit",
    amount: "$350",
    action: "View",
  },
  {
    id: 8,
    name: "Charlie Brown",
    accountNumber: "0817239419528916",
    day: "24-07-2024",
    time: "3:00 PM",
    type: "Credit",
    amount: "$1200",
    action: "View",
  },
  {
    id: 9,
    name: "David Green",
    accountNumber: "0817239419528917",
    day: "25-07-2024",
    time: "10:15 AM",
    type: "Debit",
    amount: "$500",
    action: "View",
  },
  {
    id: 10,
    name: "Eve White",
    accountNumber: "0817239419528918",
    day: "25-07-2024",
    time: "4:45 PM",
    type: "Credit",
    amount: "$700",
    action: "View",
  },
  {
    id: 11,
    name: "Frank Harris",
    accountNumber: "0817239419528919",
    day: "25-07-2024",
    time: "9:45 AM",
    type: "Debit",
    amount: "$150",
    action: "View",
  },
  {
    id: 12,
    name: "Grace Lee",
    accountNumber: "0817239419528920",
    day: "26-07-2024",
    time: "11:00 AM",
    type: "Credit",
    amount: "$2000",
    action: "View",
  },
  {
    id: 13,
    name: "Hank Thomas",
    accountNumber: "0817239419528921",
    day: "26-07-2024",
    time: "2:00 PM",
    type: "Debit",
    amount: "$800",
    action: "View",
  },
  {
    id: 14,
    name: "Ivy Allen",
    accountNumber: "0817239419528922",
    day: "27-07-2024",
    time: "1:30 PM",
    type: "Credit",
    amount: "$950",
    action: "View",
  },
  {
    id: 15,
    name: "Jack Walker",
    accountNumber: "0817239419528923",
    day: "27-07-2024",
    time: "4:00 PM",
    type: "Debit",
    amount: "$400",
    action: "View",
  },
  {
    id: 16,
    name: "Kimberly Scott",
    accountNumber: "0817239419528924",
    day: "28-07-2024",
    time: "10:00 AM",
    type: "Credit",
    amount: "$1200",
    action: "View",
  },
  {
    id: 17,
    name: "Liam Young",
    accountNumber: "0817239419528925",
    day: "28-07-2024",
    time: "2:30 PM",
    type: "Debit",
    amount: "$250",
    action: "View",
  },
  {
    id: 18,
    name: "Mona Davis",
    accountNumber: "0817239419528926",
    day: "29-07-2024",
    time: "11:30 AM",
    type: "Credit",
    amount: "$600",
    action: "View",
  },
  {
    id: 19,
    name: "Nathan Perez",
    accountNumber: "0817239419528927",
    day: "29-07-2024",
    time: "1:00 PM",
    type: "Debit",
    amount: "$100",
    action: "View",
  },
  {
    id: 20,
    name: "Olivia Moore",
    accountNumber: "0817239419528928",
    day: "30-07-2024",
    time: "9:30 AM",
    type: "Credit",
    amount: "$1500",
    action: "View",
  },
];

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Number of rows per page

  const [showExpertise, setShowExpertise] = useState(false);
  const toggleExpertise = () => setShowExpertise(!showExpertise);

  // Get the current page data
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total pages
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  return (
    <Layout page="transactionhistory">
      <Paymentsent
        isOpen={showExpertise}
        closeModal={toggleExpertise}
        details={details}
        request={"transaction"}
      />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 w-72 sm:w-full pb-8">
        <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Select className="border-class-employee w-full sm:w-[180px]">
              <SelectTrigger className="border-class-employee select-color font-medium">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transection</SelectItem>
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
                      Name
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      Account Number
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      Day
                    </TableHead>
                    <TableHead className="font-semibold text-black">
                      Time
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      Type
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      Amount
                    </TableHead>
                    <TableHead className="font-semibold text-black">
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
                      <TableCell className="sm:table-cell">
                        {employee.type}
                      </TableCell>
                      <TableCell className="sm:table-cell">
                        {employee.amount}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border-none text-left hover:text-blue-500"
                            onClick={toggleExpertise}
                          >
                            View
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

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  );
}
