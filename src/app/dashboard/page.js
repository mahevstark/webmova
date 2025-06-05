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
import { toast } from "sonner";
import { useUser } from "@/app/provider/UserProvider";

export default function Dashboard() {
  var page = "Dashboard";
  const { user } = useUser();

  const [users, setusers] = useState(null);

  useEffect(() => {
    setusers(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const token = Cookies.get("token");
  console.log("token", token);

  console.log("here i am", users);
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
      console.log("Error getting transaction history:", error);
      setEmployee([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleCard = () => {
    toast("Your Card is already added");
  };
  return (
    <Layout page={page}>
      <div className=" 2xl:mx-0 xl:mx-0 lg:px-10 md:px-10 max-sm:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            {user?.role !== "STANDARD" && (
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between  sm:w-[38%] gap-2 sm:gap-0 2xl:justify-normal 2xl:gap-60 ">
                <h1 className="text-2xl font-semibold">Card</h1>
                <button
                  className="rounded-md font-semibold bg-[#544af1] text-white px-3 py-1"
                  onClick={handleCard}
                >
                  Add New Card
                </button>
              </div>
            )}
            {user?.role !== "STANDARD" && (
              <div className="flex 2xl:block xl:block lg:hidden md:hidden max-sm:hidden flex-wrap gap-2">
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
            )}
          </div>

          <div
            className="flex lg:flex-col md:flex-col max-sm:flex-col xl:flex-row 2xl:flex-row justify-between gap-4  lg:gap-0"
            style={{ margin: 0 }}
          >
            {user?.role !== "STANDARD" && (
              <div className="w-full">
                <CardMowa
                  balance={users?.wallet?.balance ? users?.wallet?.balance : 0}
                  date={
                    users?.wallet?.createdAt
                      ? users?.wallet?.createdAt
                      : users?.business?.createdAt
                  }
                />
              </div>
            )}

            {user?.role !== "STANDARD" && (
              <div className="flex lg:block lg:mt-4 2xl:hidden xl:hidden md:block flex-wrap gap-2">
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
            )}

            <Card className="mt-4 shadow-md border xl:w-[139%] 2xl:w-[135%]">
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
                      ${users?.wallet?.balance ? users?.wallet?.balance : 0}
                    </p>
                    <p className="text-sm text-gray-700">Balance</p>
                  </div>
                  <div className="flex border justify-between items-center px-4 gap-3 shadow-md sm:px-5 pt-4 pb-4 rounded-lg ">
                    <p className="text-2xl font-bold">
                      {users?.wallet?.type ? users?.wallet?.type : "None"}
                    </p>
                    <p className="text-sm text-muted-foreground">Wallet Type</p>
                  </div>
                  <div className="flex border justify-between items-center px-4 gap-3 shadow-md sm:px-5 pt-4 pb-4 rounded-lg ">
                    <p className="text-2xl font-bold">
                      {users?.wallet?.provider
                        ? users?.wallet?.provider
                        : "None"}
                    </p>
                    <p className="text-sm text-muted-foreground">Provider</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col lg:flex-row gap-7 sm:w-auto">
            <Card className="border-none shadow-none p-0 mt-5 mb-5 w-full lg:w-2/3">
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

            <Card className="border-none shadow-none p-0 mt-5 mb-5 w-auto lg:w-1/3">
              <CardHeader className="p-0 py-2">
                <CardTitle className="text-xl text-[#544AF1]">
                  New Payment Request
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {[1, 2].map((req, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 flex flex-col gap-2 bg-[#ffffff] shadow-md"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Receiver:</span>
                        <span>Hanif Ali</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Sender:</span>
                        <span>Miran Butt</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Amount:</span>
                        <span>$500</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button className="bg-[#f4f4ff] text-[#544AF1] border border-[#544AF1] hover:bg-[#ecebff]">
                          Decline
                        </Button>
                        <Button className="bg-[#544AF1] text-white hover:bg-[#3d36b2]">
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
