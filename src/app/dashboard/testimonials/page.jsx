"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Save, X, Star, ArrowLeft, Search, Filter } from "lucide-react"
import Layout from "../../../components/layout/layout";
import LayoutContentManager from "@/components/content-management/LayoutContentManager"
import GlobalApi from "@/lib/GlobalApi"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { Spinner } from "@/components/ui/spinner"
export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([])

    const [editingId, setEditingId] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRating, setFilterRating] = useState("all")
    const [formData, setFormData] = useState({
        clientName: "",
        position: "",
        company: "",
        content: "",
        rating: 0,
        featured: false,
    })
    const [loading, setloading] = useState(false);

    const filteredTestimonials = testimonials.filter((testimonial) => {
        const matchesSearch =
            testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRating = filterRating === "all" || testimonial.rating.toString() === filterRating
        return matchesSearch && matchesRating
    })

    const handleEdit = (testimonial) => {
        setEditingId(testimonial.id)
        setFormData(testimonial)
        console.log('ff', testimonial);

        console.log('here to edit');

    }

    const [SaveAdd, setSaveAdd] = useState(false);

    const handleSave = async () => {
        if (editingId) {

            console.log('formData', formData);

            try {
                const token = Cookies.get('token');
                setSaveAdd(true);
                const response = await GlobalApi.UpdateTestimonials(formData, token, editingId);
                if (response?.success === false) {
                    toast("Error Editing Testimonial")
                    setEditingId(null)

                    setSaveAdd(false);
                } else {
                    setTestimonials(testimonials.map((t) => (t.id === editingId ? { ...formData, id: editingId } : t)))
                    setEditingId(null)
                    toast("Testimonial Edited successfully")

                    setSaveAdd(false);
                    getTestimonials()
                }

            } catch (error) {

                console.log('error while Editing testimonials', error);
                setEditingId(null)
                setSaveAdd(false);
            }

        } else {

            try {
                const token = Cookies.get('token');
                setSaveAdd(true);
                const response = await GlobalApi.CreateTestimonials(formData, token);
                if (response?.success === false) {
                    toast("Error Adding Testimonial")
                    setShowAddForm(false)
                    setSaveAdd(false);

                } else {
                    setTestimonials([...testimonials, { ...formData, id: Date.now() }])
                    setShowAddForm(false)
                    toast("Testimonial Added successfully")
                    setSaveAdd(false);
                    getTestimonials()

                }

            } catch (error) {
                setSaveAdd(false);

                console.log('error while adding testimonials', error);
                setShowAddForm(false)

            }

        }
        setFormData({ clientName: "", position: "", company: "", content: "", rating: 0, featured: false })
    }



    const handleDelete = async (id) => {
        try {
            setloading(true);
            const token = Cookies.get('token');
            const response = await GlobalApi.deleteTestimonial(token, id);

            if (response?.success === false) {
                toast("Error while deleting testimonial");
                setloading(false);

            } else {
                toast("Testimonial deleted successfully");
                setTestimonials(testimonials.filter((t) => t.id !== id))
                setloading(false);

            }
        } catch (error) {
            toast("Network Error");
            console.log('error deleting testimonial', error);
            setloading(false);



        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setShowAddForm(false)
        setFormData({ clientName: "", position: "", company: "", content: "", rating: 0, featured: false })
    }


    const renderStars = (rating, interactive = false, onChange = null) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
                onClick={interactive ? () => onChange(i + 1) : undefined}
            />
        ))
    }

    const averageRating =
        testimonials.length > 0 ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1) : 0



    const getTestimonials = async () => {
        try {

            setloading(true);


            const response = await GlobalApi.getTestimonials();


            if (response?.success === false) {
                setloading(false);
                setTestimonials([])

            } else {
                setloading(false);
                setTestimonials(response)
            }

        } catch (error) {
            console.log('error getting testimonials', error);
            setloading(false);
            setTestimonials([])


        }
    }

    useEffect(() => {
        getTestimonials()
    }, [])

    return (
        <Layout page={"Content"}>
            <div className="flex sm:flex-row flex-col gap-10">

                <LayoutContentManager page={"Content"} />
                <div className="space-y-8  2xl:w-full xl:w-[50vw] mb-12 max-sm:mx-6 2xl:mr-8 lg:w-[30vw] max-sm:w-[93vw] max-sm:pr-6 md:mr-6  ">
                    {/* Breadcrumb */}


                    <div className="flex justify-between md:items-left md:gap-4 max-sm:flex-col max-sm:gap-4 
                    2xl:flex-row xl:flex-row lg:flex-col md:flex-col ">
                        <div>
                            <h1 className="2xl:text-3xl xl:text-3xl lg:text-lg max-sm:text-lg md:text-2xl  font-bold text-gray-900">Testimonials Management</h1>
                            <p className="text-gray-600 mt-2">Manage customer testimonials and reviews</p>
                        </div>
                        <div className="flex gap-3">

                            <Button onClick={() => setShowAddForm(true)} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Testimonial
                            </Button>
                        </div>
                    </div>
                    {showAddForm && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Testimonial</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                                        <Input
                                            value={formData.clientName}
                                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                            placeholder="Enter client name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                                        <Input
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            placeholder="Enter position"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                                    <Input
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Enter company name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Content *</label>
                                    <Textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Enter testimonial content"
                                        rows={4}
                                        className="resize-none"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                                        <div className="flex gap-1">
                                            {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                                        </div>
                                    </div>

                                </div>
                                <div className="flex gap-4 pt-4 border-t">
                                    <Button onClick={handleSave} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                        <Save className="w-4 h-4 mr-2" />
                                        {SaveAdd ? 'Almost there...' : '  Add Testimonial'}
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}



                    {
                        !showAddForm && (<>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <p className="text-2xl font-bold text-[#6c5dd3]">{testimonials.length}</p>
                                        <p className="text-sm text-gray-600">Total Reviews</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <p className="text-2xl font-bold text-green-600">{averageRating}</p>
                                        <p className="text-sm text-gray-600">Average Rating</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <p className="text-2xl font-bold text-yellow-600">{testimonials.filter((t) => t.rating === 5).length}</p>
                                        <p className="text-sm text-gray-600">5-Star Reviews</p>
                                    </CardContent>
                                </Card>
                            </div>


                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <Input
                                                placeholder="Search testimonials..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Filter className="w-4 h-4 text-gray-400" />
                                            <select
                                                value={filterRating}
                                                onChange={(e) => setFilterRating(e.target.value)}
                                                className="border rounded-md px-3 py-2 text-sm"
                                            >
                                                <option value="all">All Ratings</option>
                                                <option value="5">5 Stars</option>
                                                <option value="4">4 Stars</option>
                                                <option value="3">3 Stars</option>
                                                <option value="2">2 Stars</option>
                                                <option value="1">1 Star</option>
                                            </select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {
                                loading ? (<div className="mx-auto flex justify-center items-center">
                                    <Spinner />
                                </div>) : (

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                        {filteredTestimonials?.sort((a, b) => (
                                            new Date(b.createdAt) - new Date(a.createdAt)
                                        ))?.map((testimonial) => (
                                            <Card
                                                key={testimonial.id}
                                                className={`hover:shadow-lg transition-shadow `}
                                            >
                                                <CardContent className="p-6">
                                                    {editingId === testimonial.id ? (
                                                        <div className="space-y-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <Input
                                                                    value={formData.clientName}
                                                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                                                    placeholder="Client name"
                                                                />
                                                                <Input
                                                                    value={formData.position}
                                                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                                    placeholder="Position"
                                                                />
                                                            </div>
                                                            <Input
                                                                value={formData.company}
                                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                                placeholder="Company"
                                                            />
                                                            <Textarea
                                                                value={formData.content}
                                                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                                placeholder="Testimonial content"
                                                                rows={3}
                                                                className="resize-none"
                                                            />
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex gap-1">
                                                                    {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button size="sm" onClick={handleSave} className="bg-[#6c5dd3] hover:bg-[#6c5dd3]">
                                                                    <Save className="w-3 h-3" />
                                                                    {SaveAdd ? 'Almost there...' : 'Save'}

                                                                </Button>
                                                                <Button size="sm" variant="outline" onClick={handleCancel}>
                                                                    <X className="w-3 h-3" />
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            <div className="flex items-start justify-between md:flex-col md:gap-2 flex-row ">

                                                                <div className="flex gap-2">

                                                                    <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial)}>
                                                                        <Edit className="w-3 h-3" />
                                                                    </Button>
                                                                    <Button size="sm" variant="outline" onClick={() => handleDelete(testimonial.id)}>
                                                                        <Trash2 className="w-3 h-3" />

                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <blockquote className="text-gray-700 italic">"{testimonial.content}"</blockquote>
                                                            <div className="border-t pt-4">
                                                                <p className="font-semibold text-gray-900">{testimonial.clientName}</p>
                                                                <p className="text-sm text-gray-600">
                                                                    {testimonial.position} at {testimonial.company}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>)
                            }


                        </>)
                    }

                    {filteredTestimonials.length === 0 && !loading && (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <p className="text-gray-500">No testimonials found matching your criteria.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>


        </Layout >
    )
}
