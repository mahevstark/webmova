"use client"

import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Plus, Edit, Trash2, Save, X, ChevronDown, ChevronUp, ArrowLeft, Search, Eye } from "lucide-react"
import LayoutContentManager from "../../../components/content-management/LayoutContentManager"
import Layout from "../../../components/layout/layout";
import GlobalApi from "../../../lib/GlobalApi"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { Spinner } from "../../../components/ui/spinner"

export default function FaqsPage() {
    const [faqs, setFaqs] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [formData, setFormData] = useState({ question: "", answer: "" })
    const [loading, setloading] = useState(false)
    const [createLoading, setcreateLoading] = useState(false)

    const filteredFaqs = faqs?.filter((faq) => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    // Fixed: Properly handle starting edit mode
    const handleStartEdit = (faq, id) => {
        setEditingId(id)

        console.log('fq to go', id);

        setFormData({ question: faq.question, answer: faq.answer })
        // Close add form if open
    }

    // Fixed: Properly handle edit API call
    const handleEdit = async () => {
        try {


            setcreateLoading(true)
            const token = Cookies.get('token')

            const response = await GlobalApi.editfaqs(formData, token, editingId)


            if (response?.success === false) {
                setcreateLoading(false)
                toast("Error while editing faq")
                setShowAddForm(false)
                setFormData({ question: "", answer: "" })
            } else {
                setcreateLoading(false)
                toast("FAQ edited successfully")

                // Update the FAQ in the state
                setFaqs(faqs.map((f) => (f.id === editingId ? { ...formData, id: editingId } : f)))

                // Reset form
                setEditingId(null)
                setFormData({ question: "", answer: "" })
                setShowAddForm(false)
            }
        } catch (error) {
            setcreateLoading(false)
            console.log('error while editing faq', error)
            toast("Network error")
            setFormData({ question: "", answer: "" })
            setShowAddForm(false)

        }
    }

    const handleSave = () => {
        if (editingId) {
            handleEdit()
        } else {
            createFaq()
        }
    }

    const handleDelete = async (id) => {
        try {


            setloading(true)
            const token = Cookies.get('token')
            const response = await GlobalApi.deleteFaq(id, token)

            if (response?.success === false) {
                setloading(false)
                toast("Error deleting faq")
            } else {
                setFaqs(faqs.filter((f) => f.id !== id))
                setloading(false)
                toast("FAQ deleted successfully")
            }
        } catch (error) {
            console.log('error while deleting faq', error)
            setloading(false)
            toast("Networking error")
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setShowAddForm(false)
        setFormData({ question: "", answer: "" })
    }

    const toggleExpanded = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id)
    }

    const getFaqs = async () => {
        try {
            setloading(true)
            const response = await GlobalApi.getFaqs()

            if (response?.success === false) {
                setloading(false)
                setFaqs([])
            } else {
                setloading(false)
                setFaqs(response)
            }
        } catch (error) {
            setloading(false)
            setFaqs([])
            console.log('error fetching faqs', error)
        }
    }

    useEffect(() => {
        getFaqs()
    }, [])

    const createFaq = async () => {
        try {
            setcreateLoading(true)
            const token = Cookies.get('token')
            const response = await GlobalApi.createFaq(formData, token)

            if (response?.success === false) {
                setcreateLoading(false)
                setEditingId(null)
                setFormData({ question: "", answer: "" })
                toast("Error creating faq")
            } else {
                setcreateLoading(false)
                setFaqs([...faqs, { ...formData, id: Date.now() }])
                setShowAddForm(false)
                setFormData({ question: "", answer: "" })
                toast("FAQ created successfully")
            }
        } catch (error) {
            setcreateLoading(false)
            console.log('error while creating faq', error)
            setEditingId(null)
            setFormData({ question: "", answer: "" })
            toast("Networking error")
        }
    }

    return (
        <Layout page={"Content"}>
            <div className="flex sm:flex-row flex-col gap-10">
                <LayoutContentManager page={"Content"} />
                <div className="space-y-8  2xl:w-full xl:w-[50vw] mb-12 max-sm:mx-6 2xl:mr-8 lg:w-[30vw] max-sm:w-[93vw] md:mr-8  max-sm:pr-6 ">
                    {/* Breadcrumb */}
                    <div className="flex justify-between md:items-left md:gap-4 max-sm:flex-col max-sm:gap-4 
                    2xl:flex-row xl:flex-row lg:flex-col md:flex-col ">
                        <div>
                            <h1 className="2xl:text-3xl xl:text-3xl lg:text-xl max-sm:text-lg font-bold text-gray-900">FAQs Management</h1>
                            <p className="text-gray-600 mt-2">Manage frequently asked questions and help content</p>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => setShowAddForm(true)} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                <Plus className="w-4 h-4 mr-2" />
                                Add FAQ
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    {
                        !showAddForm && (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <p className="text-2xl font-bold text-[#6c5dd3]">{faqs?.length}</p>
                                    <p className="text-sm text-gray-600">Total FAQs</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <p className="text-2xl font-bold text-green-600">{faqs?.length}</p>
                                    <p className="text-sm text-gray-600">Published</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <p className="text-2xl font-bold text-yellow-600">0</p>
                                    <p className="text-sm text-gray-600">Draft</p>
                                </CardContent>
                            </Card>
                        </div>)
                    }

                    {/* Search and Filter */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search FAQs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Add Form */}
                    {showAddForm && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New FAQ</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                                    <Input
                                        value={formData.question}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                        placeholder="Enter the question"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
                                    <Textarea
                                        value={formData.answer}
                                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                        placeholder="Enter the answer"
                                        className='resize-none'
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 pt-4 border-t">
                                    <Button onClick={handleSave} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]" disabled={createLoading}>
                                        <Save className="w-4 h-4 mr-2" />
                                        {createLoading ? "Almost there" : "Add FAQ"}
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* FAQs List */}
                    {loading ? (
                        <div className="mx-auto flex justify-center items-center">
                            <Spinner />
                        </div>
                    ) : (

                        !showAddForm && (<div className="space-y-4">
                            {filteredFaqs.map((faq) => (
                                <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        {
                                            editingId === faq.id ? (
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                                                        <Input
                                                            value={formData.question}
                                                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                                            placeholder="Question"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                                                        <Textarea
                                                            value={formData.answer}
                                                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                                            placeholder="Answer"
                                                            className='resize-none'
                                                            rows={4}
                                                        />
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            onClick={handleSave}
                                                            className="bg-purple-600 hover:bg-purple-700"
                                                            disabled={createLoading}
                                                        >
                                                            <Save className="w-3 h-3 mr-1" />
                                                            {createLoading ? "Saving..." : "Save"}
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={handleCancel}>
                                                            <X className="w-3 h-3 mr-1" />
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <button
                                                            onClick={() => toggleExpanded(faq.id)}
                                                            className="flex-1 text-left flex items-center justify-between group"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <h3 className="font-semibold text-lg text-gray-900 ">
                                                                    {faq.question}
                                                                </h3>
                                                            </div>
                                                            {expandedFaq === faq.id ? (
                                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                                            )}
                                                        </button>
                                                        <div className="flex gap-2 ml-4">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleStartEdit(faq, faq?.id)}
                                                            >
                                                                <Edit className="w-3 h-3" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleDelete(faq.id)}
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`transition-all duration-300 ease-in-out overflow-hidden border-t pt-4 ${expandedFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 '
                                                            }`}
                                                    >
                                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                                    </div>


                                                </div>
                                            )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>)

                    )}

                    {filteredFaqs.length === 0 && !loading && (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <p className="text-gray-500">No FAQs found matching your criteria.</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Tips */}
                    <Card className="bg-blue-50 border-[#6c5dd3]">
                        <CardHeader>
                            <CardTitle className="text-[#6c5dd3]">💡 FAQ Best Practices</CardTitle>
                        </CardHeader>
                        <CardContent className="text-[#6c5dd3]">
                            <ul className="space-y-2 text-sm">
                                <li>• Keep questions clear and specific</li>
                                <li>• Provide comprehensive but concise answers</li>
                                <li>• Organize FAQs by categories for easy navigation</li>
                                <li>• Update regularly based on customer feedback</li>
                                <li>• Use simple language that your audience understands</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}