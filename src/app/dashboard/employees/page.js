"use client";

import Layout from "../../../components/layout/layout";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddEmploye from '../../../pop-ups/add-employe';
import DeleteConfirmation from '../../../pop-ups/delete-employee';

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
  // Sample employee data
  { id: 1, name: "Dummy name 1", email: "anna123@gmail.com", phone: "+987654323243", status: "Active", balance: "27k" },
  { id: 2, name: "Dummy name 2", email: "anna123@gmail.com", phone: "+987654323243", status: "Active", balance: "27k" },
  { id: 3, name: "Dummy name 3", email: "anna123@gmail.com", phone: "+987654323243", status: "Active", balance: "27k" },
  { id: 4, name: "Dummy name 4", email: "anna123@gmail.com", phone: "+987654323243", status: "Not Active", balance: "27k" },
  { id: 5, name: "Dummy name 5", email: "anna123@gmail.com", phone: "+987654323243", status: "Active", balance: "27k" },
  // Add more employees as needed
];

var page = "Employees";

export default function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To store the employee to delete

  // Function to open the delete confirmation dialog
  const openDeleteDialog = (employee) => {
    setSelectedEmployee(employee); // Set the employee to delete
    setIsDeleteDialogOpen(true);
  };
  const onDelete = (employee) => {
    setSelectedEmployee(employee); // Set the employee to delete
    setIsDeleteDialogOpen(true);
  };


  // Function to close the delete confirmation dialog
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null); // Reset selected employee
  };

  // Function to open the add employee dialog
  const openAddEmployeeDialog = () => {
    setIsAddEmployeeDialogOpen(true);
  };

  // Function to close the add employee dialog
  const closeAddEmployeeDialog = () => {
    setIsAddEmployeeDialogOpen(false);
  };

  // Function to handle the delete action
  const handleDelete = () => {
    console.log("Item has been deleted:", selectedEmployee); // Log the deleted employee
    // Add your delete logic here, such as making an API call
    closeDeleteDialog();
  };

  return (
    <Layout page={page}>
      <AddEmploye
        isOpen={isAddEmployeeDialogOpen}   // Pass state to control visibility
        onClose={closeAddEmployeeDialog}   // Function to close the dialog
      />
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}   // Pass state to control visibility
        onClose={closeDeleteDialog}   // Function to close the dialog
        onDelete={handleDelete}       // Function to handle the delete action
      />
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
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
            onClick={openAddEmployeeDialog} // Open add employee dialog
          >
            Add Employee
          </Button>
        </div>
        <div className="border-t">
          <Card className="border-none shadow-none p-0 mt-5 mb-5">
            <CardContent className="p-0 overflow-x-auto">
              <Table className="p-0">
                <TableHeader className="tb-col">
                  <TableRow>
                    <TableHead className="hidden sm:table-cell"></TableHead>
                    <TableHead className="font-semibold text-black">Name</TableHead>
                    <TableHead className="hidden sm:table-cell font-semibold text-black">Email</TableHead>
                    <TableHead className="hidden sm:table-cell font-semibold text-black">Phone Number</TableHead>
                    <TableHead className="font-semibold text-black">Status</TableHead>
                    <TableHead className="hidden sm:table-cell font-semibold text-black">Balance</TableHead>
                    <TableHead className="font-semibold text-black sm:pl-28">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} className="text-muted-foreground border-0">
                      <TableCell className="hidden sm:table-cell">{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{employee.email}</TableCell>
                      <TableCell className="hidden sm:table-cell">{employee.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs flex items-center gap-2 font-semibold ${employee.status === "Active" ? "active-status" : "text-red-700 gap-2"}`}
                        >
                          {employee.status === "Active" ? <Active /> : <Nonactive />} {employee.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{employee.balance}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                          <Button variant="outline" size="sm" className="text-blue-500 font-semibold border-none text-left m-0 p-0 hover:text-blue-500">
                            {employee.status === "Active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Link href="/dashboard/employees/2">
                            <Button variant="outline" size="sm" className="text-blue-500 font-semibold border-none text-left hover:text-blue-500">
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 font-semibold border-none text-left hover:text-blue-500"
                            onClick={() => openDeleteDialog(employee)} // Pass employee data to the delete dialog
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
        </div>
      </div>
    </Layout>
  );
}
