"use client"
import LayoutContentManager from "../../../components/content-management/LayoutContentManager";
import Layout from "../../../components/layout/layout";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Eye, FileText } from "lucide-react"
import GlobalApi from "@/lib/GlobalApi";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function AboutPage() {
    const [aboutSections, setAboutSections] = useState({
        mainContent: "",
        mission: "",
        vision: "",
        values: [],
        privacyPolicy: "",
        published: true,
    })

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        mainContent: "",
        mission: "",
        vision: "",
        values: [],
        privacyPolicy: "",
        published: true,
    })

    const handleEdit = () => {
        setIsEditing(true)
        setFormData(aboutSections)
    }



    const handleSave = async () => {
        try {

            const token = Cookies.get('token')
            setLoading(true);
            const response = await GlobalApi.createAbout(formData, token);


            if (response?.success === false) {
                setAboutSections(formData)
                setIsEditing(false)
                setFormData(formData)
                setLoading(false);
                toast("Error while saving about")


            } else {
                console.log('me');

                setAboutSections(formData)
                setIsEditing(false)
                setFormData(formData)
                setLoading(false);
                toast("About saved successfully")

            }



        } catch (error) {
            console.log('Error saving about data:', error)
            setIsEditing(false)
            setLoading(false);
            toast("Error while updating about")



        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setFormData(aboutSections)
    }

    const [loading, setLoading] = useState(false);

    const getAbout = async () => {
        try {
            setLoading(true)
            const response = await GlobalApi.getAbout();
            console.log('API response:', response?.values);

            if (response?.success === false) {
                const defaultData = {
                    mainContent: "",
                    mission: "",
                    vision: "",
                    values: [],
                    privacyPolicy: "",
                    published: true,
                }
                setAboutSections(defaultData)
                setFormData(defaultData)
            } else {
                const aboutData = {
                    mainContent: response?.mainContent || "",
                    mission: response?.mission || "",
                    vision: response?.vision || "",
                    values: response?.values || [],
                    privacyPolicy: response?.privacyPolicy || "",
                    published: response?.published ?? true,
                }
                setAboutSections(aboutData)
                setFormData(aboutData)
            }
        } catch (error) {
            console.log('Error getting about data:', error);
            const defaultData = {
                mainContent: "",
                mission: "",
                vision: "",
                values: "",
                privacyPolicy: "",
                published: true,
            }
            setAboutSections(defaultData)
            setFormData(defaultData)
        } finally {
            setLoading(false)
        }
    }



    console.log('aboutData', aboutSections);






    useEffect(() => {
        getAbout()
    }, [])



    return (
        <Layout page={"Content"}>
            <div className="flex sm:flex-row flex-col gap-10">
                <LayoutContentManager page={"Content"} />
                <div className="space-y-8 2xl:w-full xl:w-[50vw] mb-12 max-sm:mx-6 2xl:mr-8 lg:w-[30vw] max-sm:w-[93vw] max-sm:pr-6 md:mr-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="2xl:text-3xl xl:text-3xl lg:text-lg max-sm:text-lg font-bold text-gray-900 md:text-2xl">
                                About Us Management
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage your company information, mission, vision, and policies
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                {isEditing ? (
                                    // Edit Form
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Main Content
                                            </label>
                                            <Textarea
                                                value={formData.mainContent}
                                                onChange={(e) => setFormData({ ...formData, mainContent: e.target.value })}
                                                className="resize-none"
                                                rows={4}
                                                placeholder="Enter main content about your company..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Mission
                                                </label>
                                                <Textarea
                                                    value={formData.mission}
                                                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                                    rows={3}
                                                    placeholder="Enter your company mission..."
                                                    className="resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Vision
                                                </label>
                                                <Textarea
                                                    value={formData.vision}
                                                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                                    rows={3}
                                                    placeholder="Enter your company vision..."
                                                    className="resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Values
                                            </label>
                                            <Textarea
                                                value={formData.values.join('\n')}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, values: e.target.value.split('\n') })
                                                }
                                                rows={2}
                                                placeholder="Enter your company values, one per line..."
                                                className="resize-none"
                                            />


                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Privacy Policy
                                            </label>
                                            <Textarea
                                                value={formData.privacyPolicy}
                                                onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.value })}
                                                rows={4}
                                                placeholder="Enter your privacy policy..."
                                                className="resize-none"
                                            />
                                        </div>

                                        {/* <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.published}
                                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                                className="rounded"
                                            />
                                            <span className="text-sm text-gray-600">Published</span>
                                        </div> */}

                                        <div className="flex gap-2">
                                            <Button onClick={handleSave} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]/90">
                                                <Save className="w-4 h-4 mr-2" />
                                                {loading ? "Almost there..." : 'Save Changes'}
                                            </Button>
                                            <Button variant="outline" onClick={handleCancel}>
                                                <X className="w-4 h-4 mr-2" />
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    // Display/Preview Mode



                                    loading ? (<div className="mx-auto flex justify-center items-center">
                                        <Spinner />
                                    </div>) : (<div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
                                            <Button size="sm" variant="outline" onClick={handleEdit}>
                                                <Edit className="w-3 h-3 mr-2" />
                                                Edit
                                            </Button>
                                        </div>

                                        {aboutSections.mainContent || aboutSections.mission || aboutSections.vision ||
                                            aboutSections.values || aboutSections.privacyPolicy ? (
                                            <>
                                                {aboutSections.mainContent && (
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                            <FileText className="w-5 h-5" />
                                                            About Our Company
                                                        </h3>
                                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                            {aboutSections.mainContent}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {aboutSections.mission && (
                                                        <div>
                                                            <h4 className="text-md font-semibold text-gray-900 mb-2">
                                                                Our Mission
                                                            </h4>
                                                            <p className="text-gray-700 whitespace-pre-wrap">
                                                                {aboutSections.mission}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {aboutSections.vision && (
                                                        <div>
                                                            <h4 className="text-md font-semibold text-gray-900 mb-2">
                                                                Our Vision
                                                            </h4>
                                                            <p className="text-gray-700 whitespace-pre-wrap">
                                                                {aboutSections.vision}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {aboutSections.values && (
                                                    <div>
                                                        <h4 className="text-md font-semibold text-gray-900 mb-2">
                                                            Our Values
                                                        </h4>
                                                        {
                                                            aboutSections?.values?.map?.((i, j) => (
                                                                <p key={j} className="text-gray-700 whitespace-pre-wrap">
                                                                    {i}
                                                                </p>
                                                            ))
                                                        }

                                                    </div>
                                                )}

                                                {aboutSections.privacyPolicy && (
                                                    <div>
                                                        <h4 className="text-md font-semibold text-gray-900 mb-2">
                                                            Privacy Policy
                                                        </h4>
                                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                                            {aboutSections.privacyPolicy}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="pt-4 border-t">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${aboutSections.published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {aboutSections.published ? 'Published' : 'Draft'}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-8">
                                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">
                                                    No content added yet. Click "Edit" to add your company information.
                                                </p>
                                            </div>
                                        )}
                                    </div>)

                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    )
}