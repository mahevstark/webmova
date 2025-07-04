"use client"
import LayoutContentManager from "../../../components/content-management/LayoutContentManager";
import Layout from "../../../components/layout/layout";
import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Eye, FileText } from "lucide-react"
import GlobalApi from "../../../lib/GlobalApi";
import { Spinner } from "../../../components/ui/spinner";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("Content-management")
    
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
                toast(t("error-saving-about"))


            } else {
                console.log('me');

                setAboutSections(formData)
                setIsEditing(false)
                setFormData(formData)
                setLoading(false);
                toast(t("about-saved-successfully"))

            }



        } catch (error) {
            console.log('Error saving about data:', error)
            setIsEditing(false)
            setLoading(false);
            toast(t("error-updating-about"))



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
                values: [],
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
                                {t("about-us-management")}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {t("about-us-management-description")}
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
                                                {t("main-content")}
                                            </label>
                                            <Textarea
                                                value={formData.mainContent}
                                                onChange={(e) => setFormData({ ...formData, mainContent: e.target.value })}
                                                className="resize-none"
                                                rows={4}
                                                placeholder={t("enter-main-content")}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t("mission")}
                                                </label>
                                                <Textarea
                                                    value={formData.mission}
                                                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                                    rows={3}
                                                    placeholder={t("enter-company-mission")}
                                                    className="resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t("vision")}
                                                </label>
                                                <Textarea
                                                    value={formData.vision}
                                                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                                    rows={3}
                                                    placeholder={t("enter-company-vision")}
                                                    className="resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t("values")}
                                            </label>
                                            <Textarea
                                                value={formData.values.join('\n')}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, values: e.target.value.split('\n') })
                                                }
                                                rows={2}
                                                placeholder={t("enter-company-values")}
                                                className="resize-none"
                                            />


                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t("privacy-policy")}
                                            </label>
                                            <Textarea
                                                value={formData.privacyPolicy}
                                                onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.value })}
                                                rows={4}
                                                placeholder={t("enter-privacy-policy")}
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
                                                {loading ? t("almost-there") : t('save-changes')}
                                            </Button>
                                            <Button variant="outline" onClick={handleCancel}>
                                                <X className="w-4 h-4 mr-2" />
                                                {t("cancel")}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    // Display/Preview Mode



                                    loading ? (<div className="mx-auto flex justify-center items-center">
                                        <Spinner />
                                    </div>) : (<div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-semibold text-gray-900">{t("preview")}</h2>
                                            <Button size="sm" variant="outline" onClick={handleEdit}>
                                                <Edit className="w-3 h-3 mr-2" />
                                                {t("edit")}
                                            </Button>
                                        </div>

                                        {aboutSections.mainContent || aboutSections.mission || aboutSections.vision ||
                                            aboutSections.values || aboutSections.privacyPolicy ? (
                                            <>
                                                {aboutSections.mainContent && (
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                            <FileText className="w-5 h-5" />
                                                            {t("about-our-company")}
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
                                                                {t("our-mission")}
                                                            </h4>
                                                            <p className="text-gray-700 whitespace-pre-wrap">
                                                                {aboutSections.mission}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {aboutSections.vision && (
                                                        <div>
                                                            <h4 className="text-md font-semibold text-gray-900 mb-2">
                                                                {t("our-vision")}
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
                                                            {t("our-values")}
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
                                                            {t("privacy-policy")}
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
                                                        {aboutSections.published ? t('published') : t('draft')}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-8">
                                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">
                                                    {t("no-content-added")}
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