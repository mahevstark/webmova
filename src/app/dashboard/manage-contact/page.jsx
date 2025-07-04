"use client"

import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Edit, Save, X, MapPin, Phone, Mail, Clock, Plus, Trash2, ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"
import LayoutContentManager from "../../../components/content-management/LayoutContentManager"
import Layout from "../../../components/layout/layout";
import GlobalApi from "../../../lib/GlobalApi"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { Spinner } from "../../../components/ui/spinner"
import { useTranslations } from "next-intl"

export default function ContactPage() {
    const t = useTranslations("Content-management")
    
    const [isEditing, setIsEditing] = useState(false)
    const [contactInfo, setContactInfo] = useState({
        address: "",
        phoneNumbers: [],
        emails: [],
        socialMedia: {
            twitter: "",
            linkedin: "",
            facebook: "",
        },
    })

    const [editData, setEditData] = useState(contactInfo)
    const [newPhone, setNewPhone] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [loading, setLoading] = useState(false)

    // Sync editData with contactInfo whenever contactInfo changes
    useEffect(() => {
        setEditData(contactInfo)
    }, [contactInfo])

    const [saveloading, setsaveloading] = useState(false);

    const handleSave = async () => {
        try {
            const isValid = validateAllFields()
            if (!isValid) {
                alert(t('fix-validation-errors'))
                return
            }


            setsaveloading(true);
            // Format social media URLs before saving
            const formattedData = {
                ...editData,
                socialMedia: {
                    twitter: formatSocialMediaUrl('twitter', editData.socialMedia.twitter),
                    linkedin: formatSocialMediaUrl('linkedin', editData.socialMedia.linkedin),
                    facebook: formatSocialMediaUrl('facebook', editData.socialMedia.facebook),
                }
            }

            const token = Cookies.get('token')
            const response = await GlobalApi.UpdateContact(formattedData, token);
            if (response?.success === false) {
                setIsEditing(false)
                setNewPhone("")
                setNewEmail("")
                toast(t("error-updating-contact"))
                setsaveloading(false);


            } else {
                setContactInfo(formattedData)
                setIsEditing(false)
                setNewPhone("")
                setNewEmail("")
                toast(t("contact-updated-successfully"))
                setsaveloading(false);


            }


        } catch (error) {
            console.error('Error saving contact info:', error)
            toast(t("network-error"))
            setsaveloading(false);


        }
    }

    // Validate all fields
    const validateAllFields = () => {
        const phoneValid = editData.phoneNumbers?.every(phone => isValidPhone(phone)) ?? true
        const emailValid = editData.emails?.every(email => isValidEmail(email)) ?? true
        const twitterValid = isValidTwitter(editData.socialMedia.twitter)
        const linkedinValid = isValidLinkedIn(editData.socialMedia.linkedin)
        const facebookValid = isValidFacebook(editData.socialMedia.facebook)

        return phoneValid && emailValid && twitterValid && linkedinValid && facebookValid
    }

    const handleCancel = () => {
        setEditData(contactInfo)
        setIsEditing(false)
        setNewPhone("")
        setNewEmail("")
    }

    const addPhone = () => {
        if (newPhone.trim()) {
            setEditData({
                ...editData,
                phoneNumbers: [...(editData.phoneNumbers || []), newPhone.trim()],
            })
            setNewPhone("")
        }
    }

    const removePhone = (index) => {
        setEditData({
            ...editData,
            phoneNumbers: editData.phoneNumbers.filter((_, i) => i !== index),
        })
    }

    const addEmail = () => {
        if (newEmail.trim() && isValidEmail(newEmail.trim())) {
            setEditData({
                ...editData,
                emails: [...(editData.emails || []), newEmail.trim()],
            })
            setNewEmail("")
        }
    }

    const removeEmail = (index) => {
        setEditData({
            ...editData,
            emails: editData.emails.filter((_, i) => i !== index),
        })
    }

    // Email validation helper
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // Phone validation helper (basic)
    const isValidPhone = (phone) => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7
    }


    const isValidTwitter = (username) => {
        if (!username.trim()) return true // Allow empty
        const twitterRegex = /^@?[A-Za-z0-9_]{1,15}$/
        return twitterRegex.test(username.replace('@', ''))
    }

    const isValidLinkedIn = (profile) => {
        if (!profile.trim()) return true // Allow empty
        // Accept either full URL or just the company/profile name
        const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(company|in)\/[A-Za-z0-9_-]+\/?$|^[A-Za-z0-9_-]+$/
        return linkedinRegex.test(profile)
    }

    const isValidFacebook = (profile) => {
        if (!profile.trim()) return true // Allow empty
        // Accept either full URL or just the page name
        const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.]+\/?$|^[A-Za-z0-9_.]+$/
        return facebookRegex.test(profile)
    }

    // Format social media URLs
    const formatSocialMediaUrl = (platform, input) => {
        if (!input.trim()) return input

        switch (platform) {
            case 'twitter':
                return input.startsWith('@') ? input : `@${input}`
            case 'linkedin':
                if (input.includes('linkedin.com')) return input
                return `https://linkedin.com/company/${input}`
            case 'facebook':
                if (input.includes('facebook.com')) return input
                return `https://facebook.com/${input}`
            default:
                return input
        }
    }

    const getContact = async () => {
        try {
            setLoading(true)
            const response = await GlobalApi.getContact()
            console.log('Contact response:', response)

            if (response?.success === false) {
                setContactInfo({
                    address: "",
                    phoneNumbers: [],
                    emails: [],
                    socialMedia: {
                        twitter: "",
                        linkedin: "",
                        facebook: "",
                    },
                })
            } else {
                setContactInfo({
                    address: response?.address || "",
                    phoneNumbers: response?.phoneNumbers || [],
                    emails: response?.emails || [],
                    socialMedia: {
                        twitter: response?.socialMedia?.twitter || "",
                        linkedin: response?.socialMedia?.linkedin || "",
                        facebook: response?.socialMedia?.facebook || "",
                    },
                })
            }
        } catch (error) {
            console.error('Error getting contact:', error)
            setContactInfo({
                address: "",
                phoneNumbers: [],
                emails: [],
                socialMedia: {
                    twitter: "",
                    linkedin: "",
                    facebook: "",
                },
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getContact()
    }, [])

    // Helper function to check if a section should be displayed
    const shouldShowSection = (data) => {
        if (isEditing) return true
        if (Array.isArray(data)) return data.length > 0
        if (typeof data === 'object') {
            return Object.values(data).some(value => value && value.trim())
        }
        return data && data.trim()
    }



    return (
        <Layout page={"Content"}>
            <div className="flex sm:flex-row flex-col gap-10">
                <LayoutContentManager page={"Content"} />

                <div className="space-y-8 2xl:w-full xl:w-[50vw] mb-12 max-sm:mx-6 2xl:mr-8 lg:w-auto max-sm:w-[93vw] md:mr-8 max-sm:pr-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4">
                        <div>
                            <h1 className="2xl:text-3xl xl:text-3xl lg:text-lg max-sm:text-lg font-bold text-gray-900">{t("contact-information")}</h1>
                            <p className="text-gray-600 mt-2">{t("contact-information-description")}</p>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => setIsEditing(!isEditing)} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                                {isEditing ? t("cancel") : t("edit-contact-info")}
                            </Button>
                        </div>
                    </div>

                    {/* Address Section */}

                    {
                        loading ? (
                            <div className="mx-auto flex justify-center items-center">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                {shouldShowSection(contactInfo.address) && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-[#6c5dd3]" />
                                                {t("address")}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {isEditing ? (
                                                <Textarea
                                                    value={editData.address}
                                                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                                    placeholder={t("enter-business-address")}
                                                    className="resize-none"
                                                    rows={3}
                                                />
                                            ) : (
                                                <p className="text-gray-700">{contactInfo.address}</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {shouldShowSection(contactInfo.phoneNumbers) && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Phone className="w-5 h-5 text-[#6c5dd3]" />
                                                {t("phone-numbers")}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {isEditing ? (
                                                <div className="space-y-3">
                                                    {editData.phoneNumbers?.map((phone, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            <Input value={phone} readOnly className="flex-1" />
                                                            <Button size="sm" variant="outline" onClick={() => removePhone(index)}>
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            value={newPhone}
                                                            onChange={(e) => setNewPhone(e.target.value)}
                                                            placeholder={t("add-new-phone-number")}
                                                            className="flex-1"
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    addPhone()
                                                                }
                                                            }}
                                                        />
                                                        <Button
                                                            size="sm"
                                                            onClick={addPhone}
                                                            disabled={!newPhone.trim() || !isValidPhone(newPhone.trim())}
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    {newPhone.trim() && !isValidPhone(newPhone.trim()) && (
                                                        <p className="text-red-500 text-sm">{t("enter-valid-phone-number")}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {contactInfo.phoneNumbers?.map((phone, index) => (
                                                        <p key={index} className="text-gray-700 flex items-center gap-2">
                                                            <Phone className="w-4 h-4" />
                                                            <a href={`tel:${phone}`} className="hover:underline">
                                                                {phone}
                                                            </a>
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {shouldShowSection(contactInfo.emails) && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Mail className="w-5 h-5 text-[#6c5dd3]" />
                                                {t("email-addresses")}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {isEditing ? (
                                                <div className="space-y-3">
                                                    {editData.emails?.map((email, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            <Input value={email} readOnly className="flex-1" />
                                                            <Button size="sm" variant="outline" onClick={() => removeEmail(index)}>
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            value={newEmail}
                                                            onChange={(e) => setNewEmail(e.target.value)}
                                                            placeholder={t("add-new-email-address")}
                                                            className="flex-1"
                                                            type="email"
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    addEmail()
                                                                }
                                                            }}
                                                        />
                                                        <Button
                                                            size="sm"
                                                            onClick={addEmail}
                                                            disabled={!newEmail.trim() || !isValidEmail(newEmail.trim())}
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    {newEmail.trim() && !isValidEmail(newEmail.trim()) && (
                                                        <p className="text-red-500 text-sm">{t("enter-valid-email-address")}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {contactInfo.emails?.map((email, index) => (
                                                        <p key={index} className="text-blue-600 flex items-center gap-2">
                                                            <Mail className="w-4 h-4" />
                                                            <a href={`mailto:${email}`} className="hover:underline">
                                                                {email}
                                                            </a>
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {shouldShowSection(contactInfo.socialMedia) && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{t("social-media")}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {isEditing ? (
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm text-gray-600">{t("twitter")}</label>
                                                        <Input
                                                            value={editData.socialMedia.twitter}
                                                            onChange={(e) =>
                                                                setEditData({
                                                                    ...editData,
                                                                    socialMedia: { ...editData.socialMedia, twitter: e.target.value },
                                                                })
                                                            }
                                                            placeholder={t("twitter-placeholder")}
                                                            className={!isValidTwitter(editData.socialMedia.twitter) ? "border-red-500" : ""}
                                                        />
                                                        {editData.socialMedia.twitter && !isValidTwitter(editData.socialMedia.twitter) && (
                                                            <p className="text-red-500 text-sm mt-1">{t("twitter-validation-error")}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="text-sm text-gray-600">{t("linkedin")}</label>
                                                        <Input
                                                            value={editData.socialMedia.linkedin}
                                                            onChange={(e) =>
                                                                setEditData({
                                                                    ...editData,
                                                                    socialMedia: { ...editData.socialMedia, linkedin: e.target.value },
                                                                })
                                                            }
                                                            placeholder={t("linkedin-placeholder")}
                                                            className={!isValidLinkedIn(editData.socialMedia.linkedin) ? "border-red-500" : ""}
                                                        />
                                                        {editData.socialMedia.linkedin && !isValidLinkedIn(editData.socialMedia.linkedin) && (
                                                            <p className="text-red-500 text-sm mt-1">{t("linkedin-validation-error")}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="text-sm text-gray-600">{t("facebook")}</label>
                                                        <Input
                                                            value={editData.socialMedia.facebook}
                                                            onChange={(e) =>
                                                                setEditData({
                                                                    ...editData,
                                                                    socialMedia: { ...editData.socialMedia, facebook: e.target.value },
                                                                })
                                                            }
                                                            placeholder={t("facebook-placeholder")}
                                                            className={!isValidFacebook(editData.socialMedia.facebook) ? "border-red-500" : ""}
                                                        />
                                                        {editData.socialMedia.facebook && !isValidFacebook(editData.socialMedia.facebook) && (
                                                            <p className="text-red-500 text-sm mt-1">{t("facebook-validation-error")}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {contactInfo.socialMedia.twitter && (
                                                        <p className="text-gray-700 flex items-center gap-2">
                                                            <strong>{t("twitter")}:</strong>
                                                            <a
                                                                href={`https://twitter.com/${contactInfo.socialMedia.twitter.replace('@', '')}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {contactInfo.socialMedia.twitter}
                                                            </a>
                                                        </p>
                                                    )}
                                                    {contactInfo.socialMedia.linkedin && (
                                                        <p className="text-gray-700 flex items-center gap-2">
                                                            <strong>{t("linkedin")}:</strong>
                                                            <a
                                                                href={contactInfo.socialMedia.linkedin.includes('linkedin.com')
                                                                    ? contactInfo.socialMedia.linkedin
                                                                    : `https://linkedin.com/company/${contactInfo.socialMedia.linkedin}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {contactInfo.socialMedia.linkedin}
                                                            </a>
                                                        </p>
                                                    )}
                                                    {contactInfo.socialMedia.facebook && (
                                                        <p className="text-gray-700 flex items-center gap-2">
                                                            <strong>{t("facebook")}:</strong>
                                                            <a
                                                                href={contactInfo.socialMedia.facebook.includes('facebook.com')
                                                                    ? contactInfo.socialMedia.facebook
                                                                    : `https://facebook.com/${contactInfo.socialMedia.facebook}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {contactInfo.socialMedia.facebook}
                                                            </a>
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </>
                        )
                    }

                    {/* Save/Cancel Buttons */}
                    {isEditing && (
                        <div className="flex gap-4">
                            <Button
                                onClick={handleSave}
                                className="bg-[#6c5dd3] hover:bg-[#6c5dd3]"
                                disabled={!validateAllFields()}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {saveloading ? t('almost-there') : t('save-changes')}
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                {t("cancel")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}