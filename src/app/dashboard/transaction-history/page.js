"use client"

import { useEffect, useState } from "react"
import Layout from "../../../components/layout/layout"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import Paymentsent from "../../../pop-ups/completed"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Search } from "lucide-react"
import GlobalApi from "../../../lib/GlobalApi"
import Cookies from "js-cookie"
import { Spinner } from "../../../components/ui/spinner"
import { useTranslations } from "use-intl"

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState("") // Filter selection
  const [selectedType, setSelectedType] = useState("") // Additional filter if needed
  const rowsPerPage = 15
  const [modalDetails, setModalDetails] = useState(null)
  const [allTransactions, setAllTransactions] = useState([]) // Store all transactions
  const [loading, setLoading] = useState(false)
  const [showExpertise, setShowExpertise] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [totalTrans, setTotalTrans] = useState(null)

  // Fix for hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Debounce searchTerm - 700ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 700)
    return () => clearTimeout(handler)
  }, [searchTerm])

  const token = isClient ? Cookies.get("token") : null
  const [role, setRole] = useState("")

  useEffect(() => {
    const userRole = Cookies.get("role")
    setRole(userRole)
  }, [])

  const toggleExpertise = (txn = null) => {
    setShowExpertise(!showExpertise)
    if (txn) setModalDetails(txn)
  }

  // Helper function to format transaction types
  const formatTransactionType = (type) => {
    if (!type) return "Unknown"

    // Handle concatenated types by splitting on capital letters
    const formatted = type
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")

    // Handle specific cases
    const typeMap = {
      TRANSFER: "Transfer",
      DEPOSIT: "Deposit",
      ADMIN_CREDIT: "Admin Credit",
      ADMIN_CREDITS: "Admin Credits",
      ADMIN_ADD_BALANCE: "Admin Add Balance",
      CARD_DEPOSIT: "Card Deposit",
      SALARY_RECEIVED: "Salary Received",
      WITHDRAW: "Withdraw",
      REQUESTED: "Requested",
    }

    return typeMap[type] || formatted
  }

  // Fetch all transactions without server-side filtering
  const getAllTransactions = async () => {
    try {
      setLoading(true)
      if (!token) {
        setLoading(false)
        return
      }

      const data = JSON.parse(localStorage.getItem("userData"))
      const userRole = Cookies.get("role")

      // Fetch all transactions without filters (pass empty strings or null for filters)
      const response = await GlobalApi.getTransactions(token, data?.id, "", userRole, "")
      console.log("All transactions data:", response)

      if (userRole === "admin") {
        const responseData = response?.data?.data || response?.data
        if (response?.status === 200 && responseData) {
          setTotalTrans(responseData)
          const transactions = responseData?.transactions || []
          console.log("Admin transactions found:", transactions.length)

          const formatted = transactions.map((txn) => {
            const date = new Date(txn.timestamp)
            return {
              id: txn.id,
              name: `${txn.wallet?.user?.firstName || "User"} ${txn.wallet?.user?.lastName || txn.id}`,
              accountNumber: txn.transactionId || "N/A",
              day: date.toLocaleDateString(),
              time: date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: txn.type || txn.actions,
              formattedType: formatTransactionType(txn.type || txn.actions),
              amount: `$${txn.amount}`,
              action: txn.actions,
              currency: txn?.currency || "USD",
              createdAt: txn.timestamp,
            }
          })

          setAllTransactions(formatted)
          console.log("Formatted admin transactions:", formatted.length)
        } else {
          console.log("No transactions found in admin response")
          setAllTransactions([])
        }
      } else {
        if (response?.success === true) {
          const transactions = response?.data?.recentTransactions || []
          console.log("User transactions found:", transactions.length)

          const formatted = transactions.map((txn) => {
            const date = new Date(txn.timestamp)
            return {
              id: txn.id,
              name: `${txn.wallet?.user?.firstName || "User"} ${txn.wallet?.user?.lastName || txn.id}`,
              accountNumber: txn.transactionId || "N/A",
              day: date.toLocaleDateString(),
              time: date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: txn.action || txn.type,
              formattedType: formatTransactionType(txn.action || txn.type),
              amount: `$${txn.amount}`,
              action: "View",
              currency: txn?.currency || "USD",
              createdAt: txn.timestamp,
            }
          })

          setAllTransactions(formatted)
          console.log("Formatted user transactions:", formatted.length)
        } else {
          console.log("No transactions found")
          setAllTransactions([])
        }
      }
      setLoading(false)
    } catch (error) {
      console.error("Error getting transaction history:", error)
      setAllTransactions([])
      setLoading(false)
    }
  }

  // Fetch all transactions on component mount
  useEffect(() => {
    if (isClient) {
      getAllTransactions()
    }
  }, [isClient])

  // Client-side filtering logic
  const getFilteredTransactions = () => {
    let filtered = [...allTransactions]

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (txn) =>
          (txn.name && txn.name.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
          (txn.id && txn.id.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
          (txn.accountNumber && txn.accountNumber.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())),
      )
    }

    // Filter by transaction type
    if (selected) {
      filtered = filtered.filter((txn) => {
        const txnType = txn.type?.toUpperCase()
        const selectedUpper = selected.toUpperCase()

        // Handle exact matches and partial matches
        return (
          txnType === selectedUpper ||
          txnType?.includes(selectedUpper) ||
          txn.formattedType?.toUpperCase().includes(selectedUpper)
        )
      })
    }

    return filtered
  }

  // Get filtered and paginated data
  const filteredTransactions = getFilteredTransactions()
  const indexOfLastTransaction = currentPage * rowsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Reset filters to clear all values
  const handleResetFilters = () => {
    setSearchTerm("")
    setDebouncedSearchTerm("")
    setCurrentPage(1)
    setSelected("")
    setSelectedType("")
  }

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selected, selectedType, debouncedSearchTerm])

  // Total pages
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage)

  const t = useTranslations("Transactions")

  if (!isClient) {
    return null
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
      <div className="px-4 sm:px-6 md:px-10 pb-12 2xl:w-full sm:w-full">
        <h1 className="text-2xl font-semibold mb-4">{t("transaction-history")}</h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" size={18} />
              <Input
                type="text"
                placeholder={t("search-by-name-or-id")}
                className="pl-10 pr-4 py-2 w-[300px] border-class-employee font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Transaction Type Filter */}
            <Select
              className="border-class-employee w-full sm:w-[180px]"
              value={selected}
              onValueChange={(value) => setSelected(value)}
            >
              <SelectTrigger className="border-class-employee select-color font-medium">
                <SelectValue placeholder={t("filter-type")} />
              </SelectTrigger>
              {role === "admin" ? (
                <SelectContent>
                  <SelectItem value="TRANSFER">{t("transfer")}</SelectItem>
                  <SelectItem value="DEPOSIT">{t("deposit")}</SelectItem>
                  <SelectItem value="ADMIN_CREDIT">{t("admin-credit")}</SelectItem>
                </SelectContent>
              ) : (
                <SelectContent>
                  <SelectItem value="TRANSFER">{t("transfer")}</SelectItem>
                  <SelectItem value="DEPOSIT">{t("deposit")}</SelectItem>
                </SelectContent>
              )}
            </Select>

            {/* Reset button */}
            <Button variant="outline" className="ml-0 sm:ml-2 bg-transparent" onClick={handleResetFilters}>
              {t("reset")}
            </Button>
          </div>

          {role === "admin" && (
            <div className="px-4 py-2 rounded-md border-class-employee select-color font-medium text-sm flex gap-2">
              <span className="block">{t("total-amount")} : </span>
              <span className="select-color font-semibold">${totalTrans?.totalAmount || 0}</span>
            </div>
          )}
        </div>

        <div className="border-t">
          <Card className="border-none shadow-none p-0 mt-5 mb-5">
            <CardContent className="p-0 overflow-x-auto">
              <Table className="p-0">
                <TableHeader className="tb-col">
                  <TableRow>
                    <TableHead className="sm:table-cel font-semibold text-black">{t("id")}</TableHead>
                    <TableHead className="font-semibold text-black">{t("name")}</TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">{t("account-number")}</TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">{t("day")}</TableHead>
                    <TableHead className="font-semibold text-black">{t("time")}</TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">{t("type")}</TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">{t("amount")}</TableHead>
                    <TableHead className="sm:table-cell font-semibold text-black">{t("currency")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTransactions.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-lg font-base text-gray-500">
                        {filteredTransactions.length === 0 && allTransactions.length > 0
                          ? "No transactions match your filters."
                          : "No Recent Transactions found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentTransactions
                      ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
                      .map((transaction) => (
                        <TableRow key={transaction.id} className="text-muted-foreground border-0">
                          <TableCell className="sm:table-cell">{transaction.id}</TableCell>
                          <TableCell>{transaction.name}</TableCell>
                          <TableCell className="sm:table-cell">{transaction.accountNumber}</TableCell>
                          <TableCell className="sm:table-cell">{transaction.day}</TableCell>
                          <TableCell className="sm:table-cell">{transaction.time}</TableCell>
                          <TableCell className="sm:table-cell">{transaction.formattedType}</TableCell>
                          <TableCell className="sm:table-cell">{transaction.amount}</TableCell>
                          <TableCell className="sm:table-cell">{transaction.currency}</TableCell>
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
          filteredTransactions.length > rowsPerPage && (
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

        {/* Debug info for development */}
        {/* <div className="mt-4 text-sm text-gray-500 bg-gray-100 p-2 rounded">
          <div>Total Transactions: {allTransactions.length}</div>
          <div>Filtered Transactions: {filteredTransactions.length}</div>
          <div>Current Page Transactions: {currentTransactions.length}</div>
          <div>Selected Filter: {selected || "None"}</div>
          <div>Search Term: {debouncedSearchTerm || "None"}</div>
        </div> */}
      </div>
    </Layout>
  )
}
