"use client";

import { useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Paymentsent from "../../../pop-ups/completed";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Search } from "lucide-react";
import GlobalApi from "../../../lib/GlobalApi";
import Cookies from "js-cookie";
import { Spinner } from "../../../components/ui/spinner";
import { useTranslations } from "use-intl";

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState("TRANSFER");
  const [selectedType, setSeletedType] = useState("COMPLETED");
  const rowsPerPage = 10; // Number of rows per page
  const [modalDetails, setModalDetails] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showExpertise, setShowExpertise] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [totalTrans, setTotalTrans] = useState(null);

  // Fix for hydration mismatch - ensure component is only fully rendered on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const token = isClient ? Cookies.get("token") : null;

  const toggleExpertise = (txn = null) => {
    setShowExpertise(!showExpertise);
    if (txn) setModalDetails(txn);
  };
  const [role, setrole] = useState("");

  useEffect(() => {
    const role = Cookies.get("role");
    setrole(role);
  }, []);

  const getTransactions = async (s, type) => {
    try {
      setLoading(true);

      if (!token) {
        setLoading(false);
        return;
      }

      const data = JSON.parse(localStorage.getItem("userData"));
      const role = Cookies.get("role");

      const response = await GlobalApi.getTransactions(
        token,
        data?.id,
        s,
        role,
        type
      );

      console.log("my data for transaction", response);

      if (role === "admin") {
        if (response?.status === 200) {
          setTotalTrans(response?.data);
          const formatted = response?.data?.transactions?.map((txn) => {
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
              type: txn.type === "ADMIN_CREDIT" ? "Admit Credit" : txn.type,
              amount: `$${txn.amount}`,
              action: txn.actions,
              currency: txn?.currency || "USA",
            };
          });
          setLoading(false);
          setEmployee(formatted);
        } else {
          setEmployee([]);
          setLoading(false);
        }
      } else {
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
          setLoading(false);
          setEmployee(formatted);
        } else {
          setEmployee([]);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error getting transaction history:", error);
      setEmployee([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      getTransactions(selected, selectedType);
    }
    if (selectedType) {
      getTransactions(selected, selectedType);
    }
  }, [isClient, selected, selectedType]);

  // Get the current page data
  const filteredEmployees = employee.filter((emp) =>
    Object.values(emp).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset filters to default
  const handleResetFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setSelected("TRANSFER");
    setSeletedType("COMPLETED");
  };

  // Total pages
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const t = useTranslations("Transactions");

  if (!isClient) {
    return null; // Return null on server-side to prevent hydration mismatch
  }

  return (
    <Layout page="transactionhistory">
      {showExpertise && (
        <Paymentsent
          isOpen={showExpertise}
          closeModal={toggleExpertise}
          details={modalDetails}
          request={"transaction"}
        />
      )}

      <div className=" px-4 sm:px-6 md:px-10 pb-12 2xl:w-full  sm:w-full">
        <h1 className="text-2xl font-semibold mb-4">
          {t("transaction-history")}
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Select
              className="border-class-employee w-full sm:w-[180px]"
              onValueChange={(value) => {
                setSelected(value);
              }}
            >
              <SelectTrigger className="border-class-employee select-color font-medium">
                <SelectValue
                  placeholder={
                    role === "admin" ? t("filter-type") : "Filter Transactions"
                  }
                />
              </SelectTrigger>
              {role === "admin" ? (
                <SelectContent>
                  <SelectItem value="TRANSFER"> {t("transfer")}</SelectItem>
                  <SelectItem value="DEPOSIT"> {t("deposit")}</SelectItem>
                  <SelectItem value="REQUESTED"> {t("requested")}</SelectItem>
                  <SelectItem value="ADMIN_CREDIT">
                    {" "}
                    {t("admin-credit")}
                  </SelectItem>
                  <SelectItem value="WITHDRAW">{t("withdraw")}</SelectItem>
                </SelectContent>
              ) : (
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              )}
            </Select>

            {role === "admin" && (
              <Select
                className="border-class-employee w-full sm:w-[180px]"
                onValueChange={(value) => {
                  setSeletedType(value);
                }}
              >
                <SelectTrigger className="border-class-employee select-color font-medium">
                  <SelectValue placeholder={t("filter-status")} />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="COMPLETED">{t("completed")} </SelectItem>
                  <SelectItem value="PENDING">{t("pending")} </SelectItem>
                  <SelectItem value="FAILED">{t("failed")} </SelectItem>
                </SelectContent>
              </Select>
            )}

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
            {/* Reset button */}
            <Button
              variant="outline"
              className="ml-0 sm:ml-2"
              onClick={handleResetFilters}
            >
              {t("reset")}
            </Button>
          </div>
          {role === "admin" && (
            <>
              <div className=" px-4 py-2  rounded-md border-class-employee select-color font-medium  text-sm flex gap-2">
                <span className="block">{t("total-amount")} : </span>
                <span className="select-color font-semibold">
                  {totalTrans?.totalAmount || 0}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="border-t">
          <Card className="border-none shadow-none p-0 mt-5 mb-5">
            <CardContent className="p-0 overflow-x-auto">
              <Table className="p-0">
                <TableHeader className="tb-col">
                  <TableRow>
                    <TableHead className="sm:table-cel font-semibold text-black">
                      {t("id")}
                    </TableHead>
                    <TableHead className="font-semibold text-black">
                      {t("name")}
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      {t("account-number")}
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      {t("day")}
                    </TableHead>
                    <TableHead className="font-semibold text-black">
                      {t("time")}
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      {t("type")}
                    </TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">
                      {t("amount")}
                    </TableHead>

                    <TableHead className="sm:table-cell font-semibold text-black">
                      {t("currency")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmployees.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-lg font-base text-gray-500"
                      >
                        No Recent Transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentEmployees
                      ?.sort(
                        (a, b) =>
                          new Date(b?.createdAt) - new Date(a?.createdAt)
                      )
                      .map((employee) => (
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

        {/* Pagination Controls */}
        {loading ? (
          <div className="mx-auto flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          currentEmployees.length > 10 && (
            <div className="flex justify-between items-center mt-4">
              <button
                className="hover:bg-[#544af1] hover:text-white cursor-pointer border-[#544af1] border rounded-md px-4 text-[#544af1] py-1"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <div>
                Page {currentPage} of {totalPages || 1}
              </div>
              <button
                className="hover:bg-[#544af1] hover:text-white cursor-pointer border-[#544af1] border rounded-md px-4 text-[#544af1] py-1"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
