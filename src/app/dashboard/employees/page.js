"use client";

import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddEmploye from "../../../pop-ups/add-employe";
import DeleteConfirmation from "../../../pop-ups/delete-employee";
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
import Active from "../../../assets/active-em.svg";
import Nonactive from "../../../assets/nonactive.svg";
import Link from "next/link";

const employees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+987654323243", status: "Active", balance: "30k" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+987654323244", status: "Inactive", balance: "22k" },
  { id: 3, name: "Michael Johnson", email: "michael.johnson@example.com", phone: "+987654323245", status: "Active", balance: "25k" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com", phone: "+987654323246", status: "Inactive", balance: "15k" },
  { id: 5, name: "David Martinez", email: "david.martinez@example.com", phone: "+987654323247", status: "Active", balance: "40k" },
  { id: 6, name: "Sarah Brown", email: "sarah.brown@example.com", phone: "+987654323248", status: "Inactive", balance: "12k" },
  { id: 7, name: "James Wilson", email: "james.wilson@example.com", phone: "+987654323249", status: "Active", balance: "50k" },
  { id: 8, name: "Linda Lee", email: "linda.lee@example.com", phone: "+987654323250", status: "Inactive", balance: "8k" },
  { id: 9, name: "Daniel White", email: "daniel.white@example.com", phone: "+987654323251", status: "Active", balance: "28k" },
  { id: 10, name: "Laura Harris", email: "laura.harris@example.com", phone: "+987654323252", status: "Inactive", balance: "18k" },
  { id: 11, name: "Robert Clark", email: "robert.clark@example.com", phone: "+987654323253", status: "Active", balance: "45k" },
  { id: 12, name: "Sophia Lewis", email: "sophia.lewis@example.com", phone: "+987654323254", status: "Inactive", balance: "5k" },
  { id: 13, name: "William Walker", email: "william.walker@example.com", phone: "+987654323255", status: "Active", balance: "33k" },
  { id: 14, name: "Olivia Scott", email: "olivia.scott@example.com", phone: "+987654323256", status: "Inactive", balance: "20k" },
  { id: 15, name: "Benjamin Hall", email: "benjamin.hall@example.com", phone: "+987654323257", status: "Active", balance: "38k" },
  { id: 16, name: "Mia Adams", email: "mia.adams@example.com", phone: "+987654323258", status: "Inactive", balance: "10k" },
  { id: 17, name: "Ethan Nelson", email: "ethan.nelson@example.com", phone: "+987654323259", status: "Active", balance: "35k" },
  { id: 18, name: "Chloe Carter", email: "chloe.carter@example.com", phone: "+987654323260", status: "Inactive", balance: "14k" },
  { id: 19, name: "Alexander Perez", email: "alexander.perez@example.com", phone: "+987654323261", status: "Active", balance: "55k" },
  { id: 20, name: "Amelia Roberts", email: "amelia.roberts@example.com", phone: "+987654323262", status: "Inactive", balance: "6k" }
];


var page = "Employees";

export default function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To store the employee to delete
  const [currentPage, setCurrentPage] = useState(1); // To store the current page
  const itemsPerPage = 10; // Number of items per page

  // Function to open the delete confirmation dialog
  const openDeleteDialog = (employee) => {
    setSelectedEmployee(employee); // Set the employee to delete
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    console.log("Item has been deleted:", selectedEmployee); // Log the deleted employee
    // Add your delete logic here, such as making an API call
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null); // Reset selected employee
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <Layout page={page}>
      <AddEmploye
        isOpen={isAddEmployeeDialogOpen}
        onClose={() => setIsAddEmployeeDialogOpen(false)}
      />
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 pb-12">
        <h1 className="text-2xl font-semibold mb-4">Employees</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Select className="border-class-employee w-full sm:w-[180px]">
              <SelectTrigger className="border-class-employee select-color font-medium">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
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
          <Button
            className="button-border btn-txt-color bg-white hover:bg-white border"
            onClick={() => setIsAddEmployeeDialogOpen(true)}
          >
            Add Employee
          </Button>
        </div>

        <Card className="border-none shadow-none p-0 mt-5 mb-5">
          <CardContent className="p-0 overflow-x-auto">
            <Table className="p-0">
              <TableHeader className="tb-col">
                <TableRow>
                  <TableHead className="font-semibold text-black">
                    Name
                  </TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold text-black">
                    Email
                  </TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold text-black">
                    Phone Number
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Status
                  </TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold text-black">
                    Balance
                  </TableHead>
                  <TableHead className="font-semibold text-black  flex justify-center   items-center">
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
                    <TableCell>{employee.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {employee.email}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {employee.phone}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs flex items-center gap-2 font-semibold ${
                          employee.status === "Active"
                            ? "active-status"
                            : "text-red-700 gap-2"
                        }`}
                      >
                        {employee.status === "Active" ? (
                          <Active />
                        ) : (
                          <Nonactive />
                        )}{" "}
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {employee.balance}
                    </TableCell>
                    <TableCell>
                      <div className="flex  flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-500 font-semibold  text-left  border"
                        >
                          {employee.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </Button>
                        <Link href="/dashboard/employees/2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border text-left"
                          >
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-500 font-semibold border text-left"
                          onClick={() => openDeleteDialog(employee)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
    </Layout>
  );
}
