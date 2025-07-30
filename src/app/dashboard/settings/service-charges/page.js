"use client";
import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../../../../components/ui/spinner";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { toast } from "sonner";
import GlobalApi from "../../../../lib/GlobalApi";
import Cookies from "js-cookie";

export default function ServiceCharges() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentCharges, setCurrentCharges] = useState({
    domesticCharge: 0,
    internationalCharge: 0,
    isActive: false
  });
  const [chargesHistory, setChargesHistory] = useState([]);
  const [formData, setFormData] = useState({
    domesticCharge: "",
    internationalCharge: ""
  });
  const [fetchingData, setFetchingData] = useState(true);

  // Handle client-side data loading after hydration
  useEffect(() => {
    setIsClient(true);
    const loadData = async () => {
      setFetchingData(true);
      try {
        await Promise.all([fetchCurrentCharges(), fetchChargesHistory()]);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load service charges data");
      } finally {
        setFetchingData(false);
      }
    };
    loadData();
  }, []);

  const fetchCurrentCharges = async () => {
    try {
      const token = Cookies.get("token");
      const response = await GlobalApi.getServiceCharges(token);
      if (response?.success) {
        setCurrentCharges(response.data);
        setFormData({
          domesticCharge: response.data.domesticCharge.toString(),
          internationalCharge: response.data.internationalCharge.toString()
        });
      } else {
        console.error("Failed to fetch current charges:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching current charges:", error);
      throw error;
    }
  };

  const fetchChargesHistory = async () => {
    try {
      const token = Cookies.get("token");
      const response = await GlobalApi.getServiceChargesHistory(token);
      if (response?.success) {
        setChargesHistory(response.data);
      } else {
        console.error("Failed to fetch charges history:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching charges history:", error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await GlobalApi.setServiceCharges(token, formData);
      
      if (response?.success) {
        toast.success("Service charges updated successfully");
        fetchCurrentCharges();
        fetchChargesHistory();
        setFormData({
          domesticCharge: response.data.domesticCharge.toString(),
          internationalCharge: response.data.internationalCharge.toString()
        });
      } else {
        toast.error(response?.message || "Failed to update service charges");
      }
    } catch (error) {
      console.error("Error updating service charges:", error);
      toast.error("Failed to update service charges");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state during hydration if needed
  if (!isClient) {
    return (
      <Layout page="settings">
        <div className="flex sm:flex-row flex-col 2xl:h-[87vh] xl:h-[77vh] lg:h-[80vh] md:h-[79vh] ">
          <Layoutsettings page="service-charges" />
          <div className="mx-2 mr-6 md:mx-6 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg ">
            <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
              <h1 className="text-xl font-semibold text-black">Service Charges</h1>
            </div>
            <hr />
            <div className="px-6" style={{ marginTop: "13px" }}>
              <Spinner />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout page="settings">
      <div className="flex 2xl:h-[87vh] xl:h-[77vh] lg:h-[80vh] md:h-[79vh] sm:flex-row flex-col">
        <Layoutsettings page="service-charges" />
        <div className="mx-2 mr-6 md:mx-6 max-sm:ml-4 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-2 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg max-sm:pb-6">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Service Charges</h1>
          </div>
          <hr />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Manage service charges for domestic and international transactions. 
              Set competitive rates to optimize revenue while maintaining customer satisfaction.
            </p>

            {fetchingData ? (
              <div className="flex justify-center items-center py-12">
                <Spinner />
                <span className="ml-2 text-gray-500">Loading service charges...</span>
              </div>
            ) : (
              <Tabs defaultValue="current" className="w-full mt-6">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                  <TabsTrigger value="current" className="data-[state=active]:bg-white data-[state=active]:text-[#544af1]">Current Charges</TabsTrigger>
                  <TabsTrigger value="update" className="data-[state=active]:bg-white data-[state=active]:text-[#544af1]">Update Charges</TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-[#544af1]">History</TabsTrigger>
                </TabsList>

              <TabsContent value="current" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Service Charges</CardTitle>
                    <CardDescription>
                      View the currently active service charges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Domestic Charge (%)</Label>
                        <div className="text-2xl font-bold text-green-600">
                          {currentCharges.domesticCharge}%
                        </div>
                        <p className="text-sm text-gray-500">
                          Applied to transactions within the same country
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">International Charge (%)</Label>
                        <div className="text-2xl font-bold text-blue-600">
                          {currentCharges.internationalCharge}%
                        </div>
                        <p className="text-sm text-gray-500">
                          Applied to cross-border transactions
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${currentCharges.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium">
                          Status: {currentCharges.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {currentCharges.createdAt && (
                        <p className="text-sm text-gray-500 mt-1">
                          Last updated: {new Date(currentCharges.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="update" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Update Service Charges</CardTitle>
                    <CardDescription>
                      Set new service charges for domestic and international transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="domesticCharge">Domestic Charge (%)</Label>
                          <Input
                            id="domesticCharge"
                            name="domesticCharge"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            value={formData.domesticCharge}
                            onChange={handleInputChange}
                            placeholder="Enter domestic charge percentage"
                            required
                          />
                          <p className="text-sm text-gray-500">
                            Percentage charged for domestic transactions
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="internationalCharge">International Charge (%)</Label>
                          <Input
                            id="internationalCharge"
                            name="internationalCharge"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            value={formData.internationalCharge}
                            onChange={handleInputChange}
                            placeholder="Enter international charge percentage"
                            required
                          />
                          <p className="text-sm text-gray-500">
                            Percentage charged for international transactions
                          </p>
                        </div>
                      </div>
                                             <div className="flex justify-end space-x-4">
                         <Button
                           type="button"
                           variant="outline"
                           className="border-[#544af1] text-[#544af1] hover:bg-[#544af1] hover:text-white"
                           onClick={() => {
                             setFormData({
                               domesticCharge: currentCharges.domesticCharge.toString(),
                               internationalCharge: currentCharges.internationalCharge.toString()
                             });
                           }}
                         >
                           Reset
                         </Button>
                         <Button 
                           type="submit" 
                           disabled={loading}
                           className="bg-[#544af1] hover:bg-[#544af1] text-white"
                         >
                           {loading ? <Spinner /> : "Update Charges"}
                         </Button>
                       </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Charges History</CardTitle>
                    <CardDescription>
                      View the history of service charge updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chargesHistory.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Domestic (%)</TableHead>
                            <TableHead>International (%)</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {chargesHistory.map((charge) => (
                            <TableRow key={charge.id}>
                              <TableCell>
                                {new Date(charge.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{charge.domesticCharge}%</TableCell>
                              <TableCell>{charge.internationalCharge}%</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  charge.isActive 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {charge.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No service charges history found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 