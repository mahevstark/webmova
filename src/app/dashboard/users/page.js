"use client";
import Layout from "../../../components/layout/layout";
import { useEffect, useState } from "react";
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
import { Search } from "lucide-react";
import Active from "../../../assets/active-em.svg";
import Nonactive from "../../../assets/nonactive.svg";
import Link from "next/link";
import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const page = "Employees";

export default function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deactivatingEmployees, setDeactivatingEmployees] = useState({});
  const [activatingEmployees, setActivatingEmployees] = useState({});

  const itemsPerPage = 10;

  const token = Cookies.get("token");

  const getUsers = async (page) => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));

      setLoading(true);

      const response = await GlobalApi.getAllUsers(user?.business?.id, token);

      console.log("response from users", response);
      if (response?.success === true) {
        setEmployees(response?.data?.employees);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.log("Error while getting users", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchemployee = () => {
    getUsers(currentPage);
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const openDeleteDialog = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    console.log("Item has been deleted:", selectedEmployee);
    getUsers();
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredEmployees = employees?.filter((employee) =>
    employee?.user?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees?.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees?.length / itemsPerPage);

  const deActuser = async (id) => {
    try {
      setDeactivatingEmployees((prev) => ({ ...prev, [id]: true }));

      const response = await GlobalApi.deActUser(id, token);

      console.log("deactivnagting", response);

      if (response?.success === true) {
        toast("User DeActivated Successfully");

        getUsers();
      } else {
        toast(response?.message || "User DeActivation Failed. Try again");
      }
    } catch (error) {
      console.log("error while deActivating user", error);
      toast("Network Error");
    } finally {
      setDeactivatingEmployees((prev) => ({ ...prev, [id]: false }));
    }
  };

  const Actuser = async (id) => {
    try {
      setActivatingEmployees((prev) => ({ ...prev, [id]: true }));

      const response = await GlobalApi.ActUser(id, token);
      console.log("rr by activating", response);

      if (response?.success === true) {
        toast("User Activated Successfully");

        getUsers();
      } else {
        toast(response?.message || "User Activation Failed. Try again");
      }
    } catch (error) {
      console.log("error while Activating user", error);
      toast("Network Error");
    } finally {
      setActivatingEmployees((prev) => ({ ...prev, [id]: false }));
    }
  };

  const router = useRouter();

  const handleViewClick = (employee) => {
    sessionStorage.setItem("selectedEmployee", JSON.stringify(employee));

    router.push(`/dashboard/users/${employee.id}`, {
      employee,
    });
  };

  return (
    <Layout page={page}>
      <AddEmploye
        isOpen={isAddEmployeeDialogOpen}
        onClose={() => setIsAddEmployeeDialogOpen(false)}
        employee={fetchemployee}
      />
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
        selectedEmployee={selectedEmployee}
      />
      <div className=" px-4 sm:px-6 md:px-10 pb-12">
        <h1 className="text-2xl font-semibold mb-4">Employees</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search keyword"
                className="pl-10 pr-4 py-2 w-full border-class-employee placeholder:text-[#c2c2c2] font-medium"
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

        <Card className="border-none shadow-none p-0 mt-5 mb-5 2xl:w-auto xl:w-auto lg:w-auto md:w-[650px]">
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
                  <TableHead className="font-semibold text-black flex justify-center items-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEmployees?.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-lg font-base text-gray-500"
                    >
                      No Employee found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentEmployees
                    ?.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    ?.map((employee, index) => (
                      <TableRow
                        key={employee.id || `employee-${index}`}
                        className="text-muted-foreground border-0"
                      >
                        <TableCell>{`${employee?.user?.firstName} ${employee?.user?.lastName}`}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {employee?.user?.email}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {employee?.user?.phoneNumber}
                        </TableCell>
                        <TableCell>
                          <button
                            className={`px-2 py-1 text-xs flex items-center gap-2 font-semibold ${
                              employee?.user?.isActive
                                ? "active-status"
                                : "text-red-700 gap-2"
                            }`}
                          >
                            {employee?.user?.isActive ? (
                              <Active />
                            ) : (
                              <Nonactive />
                            )}{" "}
                            {employee?.user?.isActive ? "Active" : "Inactive"}
                          </button>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {employee?.user?.wallet?.balance}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 items-center">
                            {!employee?.user?.isActive ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-500 font-semibold text-left border"
                                onClick={() => {
                                  Actuser(employee.id);
                                }}
                              >
                                {activatingEmployees[employee.id]
                                  ? "Activating..."
                                  : "Activate"}
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-500 font-semibold text-left border"
                                onClick={() => {
                                  deActuser(employee.id);
                                }}
                              >
                                {deactivatingEmployees[employee.id]
                                  ? "DeActivating..."
                                  : "DeActive"}
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-500 font-semibold border text-left"
                              onClick={() => {
                                handleViewClick(employee);
                              }}
                            >
                              View
                            </Button>

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
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {loading ? (
          <div className="mx-auto flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          employees?.length > 9 && (
            <div className="flex justify-between items-center mt-4">
              <button
                className="hover:bg-[#544af1] hover:text-white cursor-pointer border-[#544af1] border rounded-md px-4 text-[#544af1] py-1"
                disabled={currentPage === 1 || employees.length < 10}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>

              <div>
                Page {currentPage} of {totalPages}
              </div>

              <button
                className="hover:bg-[#544af1] hover:text-white cursor-pointer border-[#544af1] border rounded-md px-4 text-[#544af1] py-1"
                disabled={currentPage === totalPages || employees.length < 10}
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
