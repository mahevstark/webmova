"use client";
import Layout from "../../../components/layout/layout";
import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Recieverdetail from "../../../components/receiver-details/page";
import GlobalApi from "../../../lib/GlobalApi";
import Cookie from "js-cookie";
import { toast } from "sonner";
import { Spinner } from "../../../components/ui/spinner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SendMoney() {
  const [step, setStep] = useState("userSelection"); // userSelection, amountEntry, receiverDetails
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Sample users data - replace with your actual users data
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = Cookie.get("token");
      const user = JSON.parse(localStorage.getItem("userData"));

      setloading(true);
      const response = await GlobalApi.getUsers(user?.id, token);

      if (response?.success === true) {
        setusers(response?.data?.users);
        setloading(false);
      } else {
        setusers([]);
        toast(response?.message || "Error getting users list");
        setloading(false);
      }
    } catch (error) {
      console.log("error while getting users", error);
      toast("Network Error while getting users list");
      setusers([]);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();

    return fullName.includes(query) || email.includes(query);
  });

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setStep("amountEntry");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStep("receiverDetails");
  };

  const handleBackToUsers = () => {
    setStep("userSelection");
    setSelectedUser(null);
  };

  const handleBackToAmount = () => {
    setStep("amountEntry");
  };

  var page = "Dashboard";

  return (
    <Layout page={page}>
      <div className="px-11">
        <div className="flex gap-2 items-center mb-4 ">
          {" "}
          <Link href="/">
            {" "}
            <ArrowLeft />
          </Link>
          <h1 className="text-lg md:text-2xl font-semibold">Send Money</h1>
        </div>
        <p className="text-gray-600 mb-6 text-sm">
          Easily send money to friends, family, or anyone, anytime and anywhere.
          Just enter the recipient’s details, the amount, and hit send.
        </p>

        <div>
          {step === "userSelection" && (
            <div className="w-full mx-auto border shadow-md px-6 py-5 rounded-md mb-4 ">
              <h2 className="text-lg font-semibold mb-5 text-center ">
                Select Recipient
              </h2>

              {/* Search Bar */}
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto scroll-container ">
                {loading ? (
                  <div className="mx-auto flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : filteredUsers.length < 1 ? (
                  <div className="mx-auto flex justify-center items-center text-gray-500">
                    {searchQuery
                      ? "No users found matching your search"
                      : "No Users Available"}
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-colors "
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#544af1] rounded-full flex items-center justify-center text-white font-semibold">
                          {user.firstName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-sm text-gray-400">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {step === "amountEntry" && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 w-full max-w-96 mx-auto border shadow-md px-12 py-5 rounded-md"
            >
              {selectedUser && (
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Sending money to:</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <div className="w-8 h-8 bg-[#6c5dd3] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {selectedUser.firstName.charAt(0)}
                    </div>
                    <span className="font-medium">
                      {selectedUser.firstName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleBackToUsers}
                    className="text-[#544af1] text-sm hover:underline mt-1"
                  >
                    Change recipient
                  </button>
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold mb-5 text-center">
                  Enter Amount
                </h2>
                <textarea
                  cols="50"
                  rows="4"
                  placeholder="Enter Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border rounded resize-none focus:outline-none focus:ring-0 text-center mx-auto pt-14"
                  required
                ></textarea>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="button-background text-white font-semibold border rounded-lg w-full no-hover"
                >
                  NEXT
                </Button>
                <Button
                  type="button"
                  onClick={handleBackToUsers}
                  className="w-full border border-gray-300 text-gray-700 font-semibold rounded-lg bg-white hover:bg-gray-50"
                >
                  BACK
                </Button>
              </div>
            </form>
          )}

          {step === "receiverDetails" && (
            <div>
              <div className="mb-4 text-center"></div>
              <Recieverdetail
                selectedUser={selectedUser}
                amount={formData.amount}
                handleBackToAmount={handleBackToAmount}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
