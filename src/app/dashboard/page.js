"use client";
import Layout from "../../components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Dcard from "../../assets/card.png";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner";
import CardMowa from "../../components/Card";
export default function Dashboard() {
  var page = "Dashboard";

  const [user, setuser] = useState(null);

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const token = Cookies.get("token");
  console.log("token", token);

  console.log("here i am", user);
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTransactions = async (s) => {
    try {
      setLoading(true);

      const token = Cookies.get("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const data = JSON.parse(localStorage.getItem("userData"));

      const response = await GlobalApi.getTransactions(
        token,
        data?.id,
        "weekly"
      );

      console.log("my data", response?.data?.recentTransactions);

      if (response?.success === true) {
        const formatted = response?.data?.recentTransactions?.map((txn) => {
          const date = new Date(txn.timestamp);
          return {
            id: txn.id,
            name: `User ${txn.id}`, // Replace with actual name if available
            accountNumber: txn.transactionId || "N/A",
            day: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: txn.action,
            amount: `$${txn.amount}`,
            action: "View",
            currency: txn?.currency || "USA",
          };
        });
        setEmployee(formatted);
      } else {
        setEmployee([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error getting transaction history:", error);
      setEmployee([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <Layout page={page}>
      <div className="2xl:mx-10 xl:mx-10 lg:px-10 md:px-10 max-sm:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between  sm:w-[38%] gap-2 sm:gap-0">
              <h1 className="text-2xl font-semibold">Card</h1>
              <button className="rounded-md font-semibold bg-[#544af1] text-white px-3 py-1">
                Add New Card
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/dashboard/send-money">
                {" "}
                <Button className="button-border  btn-txt-color bg-white hover:text-white hover:bg-[#544af1] border">
                  Send Payment
                </Button>
              </Link>{" "}
              <Link href="/dashboard/request-money">
                <Button className="button-border btn-txt-color bg-white  border hover:text-white hover:bg-[#544af1]">
                  Withdraw Payment
                </Button>
              </Link>{" "}
              <Link href="/dashboard/bill-payment">
                <Button className="button-border btn-txt-color bg-white border hover:text-white hover:bg-[#544af1]">
                  Bill Payment
                </Button>{" "}
              </Link>
            </div>
          </div>

          <div
            className="flex lg:flex-col md:flex-col max-sm:flex-col xl:flex-row 2xl:flex-row justify-between gap-4  lg:gap-0"
            style={{ margin: 0 }}
          >
            <div className="w-full">
              <CardMowa
                balance={user?.wallet?.balance ? user?.wallet?.balance : 0}
                date={
                  user?.wallet?.createdAt
                    ? user?.wallet?.createdAt
                    : user?.business?.createdAt
                }
              />
            </div>

            <Card className="mt-4 shadow-md border ">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <p className="btn-txt-color font-semibold text-lg">Stats</p>
                  {/* <select
                    className="border px-4 py-2 cursor-pointer rounded-full font-medium btn-txt-color"
                    style={{ background: "#cfccff69" }}
                  >
                    <option value="weekly">Weekly</option>
                  </select> */}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Showing Spending Recent Results
                </p>
              </CardHeader>
              <CardContent>
                <div
                  className="flex justify-normal 2xl:justify-around  md:justify-around  items-center 
             2xl:flex-nowrap xl:flex-nowrap max-sm:flex-wrap   gap-5 sm:gap-auto"
                >
                  <div className="flex  gap-3 items-center border shadow-md px-4 sm:px-5 pt-4 pb-4 rounded-lg ">
                    <p className="text-2xl font-bold text-gray-700">
                      ${user?.wallet?.balance ? user?.wallet?.balance : 0}
                    </p>
                    <p className="text-sm text-gray-700">Balance</p>
                  </div>
                  <div className="flex border justify-between items-center px-4 gap-3 shadow-md sm:px-5 pt-4 pb-4 rounded-lg ">
                    <p className="text-2xl font-bold">
                      {user?.wallet?.type ? user?.wallet?.type : "None"}
                    </p>
                    <p className="text-sm text-muted-foreground">Wallet Type</p>
                  </div>
                  <div className="flex border justify-between items-center px-4 gap-3 shadow-md sm:px-5 pt-4 pb-4 rounded-lg ">
                    <p className="text-2xl font-bold">
                      {user?.wallet?.provider ? user?.wallet?.provider : "None"}
                    </p>
                    <p className="text-sm text-muted-foreground">Provider</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col lg:flex-row gap-7  sm:w-auto">
            <Card className="border-none shadow-none p-0 mt-5 mb-5 w-full ">
              <CardHeader className="p-0 py-2">
                <CardTitle className="text-xl text-[#544AF1] ">
                  Recent Employee Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table className="p-0">
                  <TableHeader className="tb-col">
                    <TableRow>
                      <TableHead className="sm:table-cel font-semibold text-blackl">
                        ID
                      </TableHead>
                      <TableHead className="font-semibold text-black">
                        Name
                      </TableHead>
                      <TableHead className="sm:table-cell font-semibold text-black">
                        Transaction ID
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
                      <TableHead className="sm:table-cell font-semibold text-black">
                        Currency
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center text-xl font-base text-gray-500"
                        >
                          <Spinner />
                        </TableCell>
                      </TableRow>
                    ) : employee.length === 0 && !loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center text-lg font-base text-gray-500"
                        >
                          No Recent Transactions found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      employee
                        ?.sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        ?.slice(0, 7)
                        ?.map((employee) => (
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
                            <TableCell className="sm:table-cell">
                              {employee.currency}
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
