"use client"

import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Edit, Save, X, Eye, ArrowLeft } from "lucide-react"
import LayoutContentManager from "../../../components/content-management/LayoutContentManager"
import Layout from "../../../components/layout/layout";
import GlobalApi from "../../../lib/GlobalApi"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { Spinner } from "../../../components/ui/spinner"
import Link from "next/link"
import { useTranslations } from "next-intl"
export default function HeroSection() {
    const t = useTranslations("Content-management")
    
    const [isEditing, setIsEditing] = useState(false)
    const [heroData, setHeroData] = useState({
        title: "",
        content:
            "",
        ctaText: "",
        ctaLink: "",
    })

    const [editData, setEditData] = useState(heroData)
    const [loading, setloading] = useState(false);



    const isValidLink = (ctaLink) => {

        if (!ctaLink.startsWith('http://') && !ctaLink.startsWith('https://')) {
            return false
        } else if (ctaLink.startsWith('http://') || ctaLink.startsWith('https://')) {
            return true
        }

    }
    const handleSave = async () => {
        setHeroData(editData)

        try {


            if (editData?.title === '' || editData?.content === '' || editData?.ctaText === '' || editData?.ctaLink === '') {
                toast(t("all-fields-required"))
                setloading(false);

                return;
            }

            console.log(isValidLink(editData?.ctaLink));

            if (isValidLink(editData?.ctaLink) === false) {
                toast(t("invalid-link"))
                setloading(false);
                return;
            }


            setloading(true);
            const token = Cookies.get('token')

            const response = await GlobalApi.createCTA(editData);


            console.log(
                'resppnse by cta add ', response
            );

            if (response?.success === false) {
                setIsEditing(false)
                toast(response?.message || t("error-saving-cta-section"))
                setloading(false);

            } else {
                setIsEditing(false)
                toast(t("cta-section-saved"))
                setloading(false);


            }
        } catch (error) {
            console.log('error while saving Hero Section', error);
            toast(t("network-error"))
            setloading(false);

        }
    }

    const handleCancel = () => {
        setEditData(heroData)
        setIsEditing(false)
    }



    const getHeroSection = async () => {
        try {
            setloading(true);
            const response = await GlobalApi.getCta();


            if (response?.success === false) {
                toast(t("error-getting-cta-content"))
                setHeroData({
                    title: "",
                    content:
                        "",
                    ctaText: "",
                    ctaLink: "",
                })
                setloading(false);

            } else {
                setHeroData({
                    title: response?.data?.content?.heading,
                    content:
                        response?.data?.content?.description,
                    ctaText: response?.data?.content?.ctaButton?.text,
                    ctaLink: response?.data?.content?.ctaButton?.link,
                })
                setloading(false);

            }
        } catch (error) {
            setloading(false);
            console.log('error getting hero section', error);


        }
    }

    useEffect(() => {
        getHeroSection()
    }, [])

    useEffect(() => {

        setEditData(heroData);
    }, [heroData]);

    return (

        <Layout page={"Content"}>
            <div className="flex sm:flex-row flex-col gap-10">

                <LayoutContentManager page={"Content"} />
                <div className="space-y-8  2xl:w-full xl:w-[50vw] mb-12 max-sm:mx-6 2xl:mr-8 lg:w-[30vw] max-sm:w-[93vw] max-sm:pr-6  md:mr-6  ">


                    <div className="flex justify-between md:items-left md:gap-4 max-sm:flex-col max-sm:gap-4 
                    2xl:flex-row xl:flex-row lg:flex-col md:flex-col 
                    ">
                        <div>
                            <h1 className="2xl:text-3xl xl:text-3xl lg:text-lg max-sm:text-lg font-bold text-gray-900 md:text-2xl">{t("cta-section-management")}</h1>
                            <p className="text-gray-600 mt-2">{t("cta-section-management-description")}</p>
                        </div>
                        <div className="flex gap-3">

                            <Button onClick={() => setIsEditing(!isEditing)} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                                {isEditing ? t("cancel") : t("edit-cta")}
                            </Button>
                        </div>
                    </div>
                    {isEditing && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("edit-cta-section")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("cta-title")} *</label>
                                    <Input
                                        value={editData.title}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                        placeholder={t("enter-cta-title")}
                                        className="text-lg"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{t("cta-title-description")}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("cta-content")} *</label>
                                    <Textarea
                                        value={editData.content}
                                        onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                                        placeholder={t("enter-cta-content")}
                                        rows={4}
                                        className="resize-none"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{t("cta-content-description")}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("cta-button-text")} *</label>
                                        <Input
                                            value={editData.ctaText}
                                            onChange={(e) => setEditData({ ...editData, ctaText: e.target.value })}
                                            placeholder={t("enter-cta-button-text")}
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">{t("cta-button-text-description")}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("cta-link")} *</label>
                                        <Input
                                            value={editData.ctaLink}
                                            onChange={(e) => setEditData({ ...editData, ctaLink: e.target.value })}
                                            placeholder={t("enter-cta-link")}
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">{t("cta-link-description")}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t">
                                    <Button onClick={handleSave} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                        <Save className="w-4 h-4 mr-2" />


                                        {
                                            loading ? t("almost-there") : t("save-changes")
                                        }
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel}>
                                        {t("cancel")}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    {
                        !isEditing && (
                            loading ? (<div className="mx-auto flex justify-center items-center">
                                <Spinner />
                            </div>) : (<Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Eye className="w-5 h-5" />
                                        {t("live-preview")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
                                        <h2 className="2xl:text-4xl xl:text-3xl lg:text-lg   font-bold mb-4">{heroData.title}</h2>
                                        <p className=" 2xl:text-xl xl:text-xl lg:text-lg max-sm:text-sm  mb-6 opacity-90">{heroData.content}</p>
                                        <div className="flex items-start gap-4 flex-col">
                                            <span className="bg-white text-purple-600 xl:px-6 xl:py-3  *:
                                        text-sm max-sm:px-2 max-sm:py-2 lg:px-6 lg:py-3 md:px-4 md:py-2
                                        2xl:px-6 2xl:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                                                {heroData.ctaText}
                                            </span>
                                            <span className="text-sm opacity-75">→
                                                <Link href={heroData.ctaLink || 'no'} target="_blank" rel="noopener noreferrer">{heroData.ctaLink}</Link>
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>)

                        )
                    }



                    <Card className="bg-blue-50 border-[#6c5dd3]">
                        <CardHeader>
                            <CardTitle className="text-[#6c5dd3]">{t("tips-for-effective-cta-sections")}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-[#6c5dd3]">
                            <ul className="space-y-2 text-sm">
                                <li>• {t("keep-title-clear-compelling")}</li>
                                <li>• {t("focus-on-benefits-not-features")}</li>
                                <li>• {t("use-action-oriented-cta-text")}</li>
                                <li>• {t("test-different-versions-converts")}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}
