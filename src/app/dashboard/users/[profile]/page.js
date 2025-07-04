"use client";
import Layout from "../../../../components/layout/layout";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import DeleteConfirmation from "../../../../pop-ups/delete-employee";
import Link from "next/link";
import { useEffect, useState } from "react";
import Addbalance from "../../../../pop-ups/add-balance";
import GlobalApi from "../../../../lib/GlobalApi";
import Cookies from "js-cookie";
export default function profile() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [Role, setRole] = useState(null);
  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  // Function to handle the delete action
  const handleDelete = () => {
    closeDeleteDialog();
  };
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddBalance = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
    const b = balance + amount;
    setBalance(b);
    console.log(`New balance: ${balance + amount}`);
  };
  var page = "Employees";

  const [employee, setEmployee] = useState(null);

  console.log("employee", employee);

  const [req, setReq] = useState([]);

  const [loading, setloading] = useState(false);

  const getrequests = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));

      console.log("login data", data);

      const token = Cookies.get("token");
      console.log(token);

      console.log("my employee", employee);

      setloading(true);
      const response = await GlobalApi.getPaymentRequests(
        data?.business?.id,
        1,
        10,
        employee?.id
      );

      console.log("response by page", response);

      if (response?.success === true) {
        setReq(response?.requests);
        setloading(false);
      } else {
        setReq([]);
        setloading(false);
      }
    } catch (error) {
      console.log("error while getting employee req", error);

      setReq([]);
      setloading(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedEmployee");
    console.log("stored", JSON.parse(stored));

    const role = Cookies.get("role");

    setRole(role);

    if (stored) {
      setEmployee(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (employee) {
      getrequests();
    }
  }, [employee]);

  if (!employee && loading) return <div>Loading...</div>;

  return (
    <Layout page={page}>
      {" "}
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen} // Pass state to control visibility
        onClose={closeDeleteDialog} // Function to close the dialog
        onDelete={handleDelete} // Function to handle the delete action
      />
      <Addbalance
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onAddBalance={handleAddBalance}
        employee={employee}
      />
      <div className="  sm:px-6 md:px-10">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center flex-col sm:flex-row sm:justify-between w-full sm:w-[38%] gap-2 sm:gap-0">
              <h1 className="text-2xl font-semibold">Employee Profile </h1>
            </div>
            <div className="flex flex-wrap gap-4">
              {/* <span className="flex text-sm items-center gap-2">
                <p className="btn-txt-color font-medium">Payment Request</p>
                <p className="custom-p-color">NO</p>
                <Switch className="" />
              </span> */}
              {/* <span className="flex text-sm items-center gap-2">
                <p className="btn-txt-color font-medium">Status:</p>
                <p className="custom-p-color">Active:</p>
                <Switch className="" />
              </span> */}
              <Link href="#">
                {" "}
                <Button
                  className="button-border btn-txt-color bg-white hover:bg-white border px-7"
                  onClick={() => setModalOpen(true)}
                >
                  Add Balance
                </Button>
              </Link>{" "}
              {/* <Button
                className="button-border btn-txt-color bg-white hover:bg-white border "
                onClick={openDeleteDialog}
              >
                Delete Employee
              </Button> */}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
            <div className="w-full lg:w-auto">
              <span>
                <h1 className="btn-txt-color font-semibold text-xl mb-4">
                  Employee Details
                </h1>
                <span className="flex gap-2">
                  <p className=" text-muted-foreground">Name: </p>
                  <p className="text-gray-800">
                    {employee?.user?.firstName
                      ? employee?.user?.firstName
                      : employee?.firstName || "Employee Name"}{" "}
                    {employee?.user?.lastName}{" "}
                  </p>
                </span>
                <span className="flex gap-2">
                  <p className=" text-muted-foreground">Contact Number: </p>
                  <p className="text-gray-600">
                    {employee?.user?.phoneNumber
                      ? employee?.user?.phoneNumber
                      : employee?.phoneNumber || "Contact Number"}
                  </p>
                </span>
                <span className="flex gap-2">
                  <p className=" text-muted-foreground">EMail: </p>
                  <p className="text-gray-600">
                    ``
                    {employee?.user?.email
                      ? employee?.user?.email
                      : employee?.email || "Email"}
                  </p>
                </span>
                <span className="flex gap-2">
                  <p className=" text-muted-foreground">Status: </p>
                  <p className="text-gray-600">
                    {employee?.user?.isActive || employee?.isActive
                      ? "Active"
                      : "InActive"}
                  </p>
                </span>
                {/* <span className="flex gap-2">
                  <p className=" text-muted-foreground">DoB: </p>
                  <p className="text-gray-600">{employee?.user?.dob}</p>
                </span>
                <span className="flex gap-2">
                  <p className=" text-muted-foreground">Address: </p>
                  <p className="text-gray-600">
                    {employee?.user?.permanentAddress}
                  </p>
                </span> */}
              </span>
            </div>

            <Card className=" sm:w-full lg:w-1/2 border px-5 py-3  shadow w-80  ">
              <CardHeader className="p-0">
                <CardTitle className="flex justify-between items-center">
                  <p className="btn-txt-color font-semibold text-lg">Stats</p>
                  {/* <select
                    className="border p-2 rounded-full font-medium btn-txt-color"
                    style={{ background: "#cfccff69" }}
                  >
                    <option value="weekly">Weekly</option>
                  </select> */}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Showing Recent Results
                </p>
              </CardHeader>
              <CardContent className="p-0 ">
                <div className="flex gap-5 justify-center  items-center mt-8 flex-col sm:flex-row ">
                  <div className="flex gap-1 items-center flex-col border px-12 pt-2 shadow pb-2 rounded-lg">
                    <p className="text-2xl font-bold text-gray-600">
                      $
                      {employee?.user?.wallet?.balance
                        ? employee?.user?.wallet?.balance + balance
                        : employee?.wallet?.balance + balance || 0}
                      .00
                    </p>
                    <p className="text-sm text-gray-500">Balance</p>
                  </div>
                  <div className="flex gap-1 justify-between items-center  flex-col border px-12 pt-2 shadow pb-2 rounded-lg">
                    <p className="text-2xl font-bold text-gray-600">
                      {employee?.wallet?.type || "Wallet Type"}
                    </p>
                    <p className="text-sm text-muted-foreground text-gray-500">
                      Wallet Type
                    </p>
                  </div>
                  {/* <div className="flex gap-1 justify-between items-center  flex-col border px-12 pt-2 shadow pb-2 rounded-lg">
                    <p className="text-2xl font-bold text-gray-600">$50k</p>
                    <p className="text-sm text-muted-foreground text-gray-500">
                      Receiving
                    </p>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col lg:flex-row gap-7 ">
            <Card className="border-none shadow-none p-0 mt-5 mb-5 w-full">
              <h1 className="btn-txt-color font-semibold text-xl mb-6">
                {Role === "admin"
                  ? " Transaction requests"
                  : " Payment requests"}
              </h1>
              <CardContent className="p-0 overflow-x-auto w-80 sm:w-full">
                <Table className="p-0">
                  <TableHeader className="tb-col">
                    <TableRow>
                      <TableHead className="sm:table-cell"></TableHead>
                      <TableHead className="font-semibold text-black">
                        Receiver Name
                      </TableHead>
                      <TableHead className="sm:table-cell font-semibold text-black">
                        Sender Name
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
                    {!req?.length > 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center h-32">
                          <p className="text-muted-foreground font-semibold">
                            No Payment requests made yet
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      req?.map((request) => (
                        <TableRow
                          key={request.id}
                          className="text-muted-foreground border-0"
                        >
                          <TableCell className="sm:table-cell">
                            {request?.id}
                          </TableCell>
                          <TableCell>{request?.employee?.firstName}</TableCell>
                          <TableCell className="sm:table-cell">
                            {request.accountNumber}
                          </TableCell>
                          <TableCell className="sm:table-cell">
                            {request.day}
                          </TableCell>
                          <TableCell className="sm:table-cell">
                            {request.time}
                          </TableCell>
                          <TableCell className="sm:table-cell">
                            {request.type}
                          </TableCell>
                          <TableCell className="sm:table-cell">
                            {request?.amount}
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col sm:flex-row ">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-500 font-semibold border-none text-left hover:text-blue-500"
                              >
                                View
                              </Button>
                            </div>
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
