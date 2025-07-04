"use client"

import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Plus, Edit, Trash2, Save, X, Upload, Search } from "lucide-react"
import LayoutContentManager from "../../../components/content-management/LayoutContentManager"
import Layout from "../../../components/layout/layout";
import GlobalApi from "../../../lib/GlobalApi"
import Cookies from "js-cookie"
import ImageUpload from "../../../components/ImageUpload"
import { toast } from "sonner"
import Image from "next/image"
import { Spinner } from "../../../components/ui/spinner"
import { useTranslations } from "next-intl"

export default function PartnersPage() {
    const [partners, setPartners] = useState([

    ])
    const t = useTranslations("Content-management")

    const [editingId, setEditingId] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [formData, setFormData] = useState({ name: "", logo: "", websiteUrl: "" })
    const [loading, setloading] = useState(true);
    const [Saveloading, setSaveloading] = useState(false);
    const [URL, setURL] = useState(null);


    const filteredPartners = partners.filter(
        (partner) =>
            partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEdit = (partner) => {
        setEditingId(partner.id)
        setFormData(partner)
    }

    const handleSave = async () => {
        if (editingId) {

            try {

                let websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

                if (!websiteRegex.test(formData.websiteUrl)) {
                    toast(t("please-enter-valid-url"));
                    return;
                }
                setSaveloading(true);
                const token = Cookies.get('token');
                const response = await GlobalApi.UpdatePartner(formData, token, URL ? URL : formData?.logo, editingId);


                if (response?.success === false) {
                    setShowAddForm(false)
                    setSaveloading(false);
                    setEditingId(null)
                    toast(t("error-editing-partner"))


                } else {
                    setPartners([...partners, { ...formData, id: Date.now() }])
                    setShowAddForm(false)
                    setSaveloading(false);
                    getPartners()
                    setEditingId(null)
                    toast(t("partner-edited-successfully"))


                }
            } catch (error) {
                console.log('error while adding partner', error);

                setShowAddForm(false)

                setSaveloading(false);
                setEditingId(null)

                toast(t("network-error"))


            }
        } else {



            try {

                let websiteRegexs = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

                if (!websiteRegexs.test(formData.websiteUrl)) {
                    toast(t("please-enter-valid-url"));
                    return;
                }

                if (URL === null) {
                    toast(t("partner-image-required"));
                    return;
                }



                if (formData?.name === '' || formData?.websiteUrl === '') {
                    toast(t("all-fields-required"))
                    return
                }

                const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

                // if (!websiteRegex.test(formData.websiteUrl)) {
                //     toast("Please enter a valid URL");
                //     return;
                // }
                setSaveloading(true);
                const token = Cookies.get('token');
                const response = await GlobalApi.AddPartner(formData, token, URL);

                if (response?.success === false) {
                    setShowAddForm(false)
                    setSaveloading(false);
                    toast(t("error-adding-partner"))

                } else {
                    setPartners([...partners, { ...formData, id: Date.now() }])
                    setShowAddForm(false)
                    setSaveloading(false);
                    getPartners()
                    toast(t("partner-added-successfully"))

                }
            } catch (error) {
                console.log('error while adding partner', error);

                setShowAddForm(false)

                setSaveloading(false);
                toast(t("network-error"))


            }

        }
        setFormData({ name: "", logo: "", websiteUrl: "" })
    }


    const handleDelete = async (id) => {
        try {
            setloading(true);
            const token = Cookies.get('token');
            const response = await GlobalApi.deleteParnter(token, id)

            if (response?.success === false) {
                toast(t("error-deleting-partner"));
                setloading(false);

            } else {
                toast(t("partner-deleted-successfully"));
                setPartners(partners.filter((p) => p.id !== id))
                setloading(false);

            }

        } catch (error) {
            console.log('error while deleting partner', error);
            toast(t("network-error"));
            setloading(false);



        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setShowAddForm(false)
        setFormData({ name: "", logo: "", websiteUrl: "" })
    }


    const getPartners = async () => {
        try {
            setloading(true);
            const response = await GlobalApi.getPartners();
            if (response?.success === false) {
                setPartners([])
                setloading(false);


            } else {
                setPartners(response)
                setloading(false);

            }
        } catch (error) {
            console.log('error getting partners', error);

            setPartners([])
            setloading(false);


        }
    }



    useEffect(() => {
        getPartners()
    }, [])

    return (
        <Layout page={"Content"}>
            <div className="flex sm:flex-row flex-col gap-10">
                <LayoutContentManager page={"Content"} />

                <div className="space-y-8  2xl:w-full xl:w-[50vw] mb-12 max-sm:mx-6 2xl:mr-8 lg:w-auto max-sm:w-[93vw] md:mr-8 max-sm:pr-6 ">
                    {/* Breadcrumb */}


                    <div className="flex justify-between md:items-left md:gap-4 max-sm:flex-col max-sm:gap-4 
                    2xl:flex-row xl:flex-row lg:flex-col md:flex-col ">
                        <div>
                            <h1 className="2xl:text-3xl max-sm:text-lg xl:text-3xl lg:text-lg   font-bold text-gray-900">{t("partners-management")}</h1>
                            <p className="text-gray-600 mt-2">{t("partners-management-description")}</p>
                        </div>
                        <div className="flex gap-3">

                            <Button onClick={() => setShowAddForm(true)} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                <Plus className="w-4 h-4 mr-2" />
                                {t("add-partner")}
                            </Button>
                        </div>
                    </div>

                    {
                        !showAddForm && (<><Card className="bg-purple-50 border-purple-200">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-[#6c5dd3]">{partners.length}</p>
                                        <p className="text-sm text-[#6c5dd3]">{t("total-partners")}</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#6c5dd3]">{filteredPartners.length}</p>
                                        <p className="text-sm text-[#6c5dd3]">{t("showing")}</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#6c5dd3]">100%</p>
                                        <p className="text-sm text-[#6c5dd3]">{t("active")}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder={t("search-partners")}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </CardContent>
                            </Card></>)
                    }
                    {/* Search */}


                    {/* Add Form */}
                    {showAddForm && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("add-new-partner")}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("partner-name")} *</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder={t("enter-partner-name")}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t("website-url")} *</label>
                                        <Input
                                            value={formData.websiteUrl}
                                            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                            placeholder={t("website-url-placeholder")}
                                            required
                                        />
                                    </div>
                                </div>

                                <ImageUpload setURL={setURL} />
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                                    <div className="flex items-center gap-4">
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload Logo
                                        </Button>
                                        <span className="text-sm text-gray-500">Or paste image URL below</span>
                                    </div>
                                <Input
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    placeholder="Enter logo URL"
                                    className="mt-2"
                                />
                            </div> */}
                                <div className="flex gap-4 pt-4 border-t">
                                    <Button onClick={handleSave} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                        <Save className="w-4 h-4 mr-2" />
                                        {
                                            Saveloading ? t('almost-there') : t('add-partner')
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
                        loading ? (
                            <div className="mx-auto flex justify-center items-center">
                                <Spinner />

                            </div>
                        ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {

                                filteredPartners.map((partner) => (
                                    <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            {editingId === partner.id ? (
                                                <div className="space-y-4">
                                                    <Input
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder={t("partner-name")}
                                                    />

                                                    <Image
                                                        src={formData.logoUrl || "/placeholder.svg?height=60&width=120"}
                                                        alt={partner.name}
                                                        height={200}
                                                        width={200}
                                                        className="w-32 h-16 object-contain bg-gray-50 rounded p-2"
                                                    />

                                                    <ImageUpload setURL={setURL} />



                                                    <Input
                                                        value={formData.websiteUrl}
                                                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                                        placeholder={t("website-url")}
                                                    />
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={handleSave} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                                            <Save className="w-3 h-3" />
                                                            {
                                                                Saveloading ? t('almost-there') : t('save')
                                                            }
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={handleCancel}>
                                                            <X className="w-3 h-3" />
                                                            {t("cancel")}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (


                                                <div className="flex flex-col items-center space-y-4">
                                                    <Image
                                                        src={partner.logoUrl || "/placeholder.svg?height=60&width=120"}
                                                        alt={partner.name}
                                                        height={300}
                                                        width={300}
                                                        className="w-56 h-24 object-contain bg-gray-50 rounded p-2"
                                                    />
                                                    <div className="text-center">
                                                        <h3 className="font-semibold text-lg">{partner.name}</h3>

                                                    </div>
                                                    <a
                                                        href={partner.websiteUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:underline break-all text-center"
                                                    >
                                                        {partner.websiteUrl}
                                                    </a>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => handleEdit(partner)}>
                                                            <Edit className="w-3 h-3" />
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={() => handleDelete(partner.id)}>
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>)

                                            }
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>)
                    }


                    {filteredPartners.length === 0 && !loading && !showAddForm && (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <p className="text-gray-500">{t("no-partners-found")}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Stats */}

                </div>
            </div>


        </Layout >
    )
}
