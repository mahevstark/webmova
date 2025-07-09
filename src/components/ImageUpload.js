"use client"
import { useState, useEffect } from "react"

const ImageUpload = ({ setURL, initialUrl, reset }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState(initialUrl || "")
  const [error, setError] = useState("")

  // Reset component when reset prop changes
  useEffect(() => {
    if (reset) {
      setSelectedFile(null)
      setUploadedUrl("")
      setError("")
      setURL("") // Also clear the parent state
    }
  }, [reset, setURL])

  // Update uploadedUrl when initialUrl changes
  useEffect(() => {
    setUploadedUrl(initialUrl || "")
  }, [initialUrl])

  // Automatically upload when file is selected
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }
      setSelectedFile(file)
      setError("")
      uploadImage(file)
    }
  }

  // Upload image to server as soon as selected
  const uploadImage = async (file) => {
    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("image", file)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (response.ok) {
        setURL(data?.url)
        setUploadedUrl(data.url)
        setSelectedFile(null)
      } else {
        setError(data.error || "Upload failed")
      }
    } catch (err) {
      setError("Network error occurred")
      console.log("Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  // Click on avatar triggers file input
  const handleAvatarClick = () => {
    document.getElementById("fileInput").click()
  }

  // Clear uploaded image
  const handleClearImage = (e) => {
    e.stopPropagation()
    setUploadedUrl("")
    setSelectedFile(null)
    setError("")
    setURL("")
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 flex justify-center relative">
        {uploadedUrl ? (
          <div className="relative">
            <img
              src={uploadedUrl || "/placeholder.svg"}
              alt="Profile Preview"
              className={`w-24 h-24 object-cover rounded-full border shadow cursor-pointer ${
                uploading ? "opacity-50" : ""
              }`}
              onClick={handleAvatarClick}
              style={{ transition: "opacity 0.2s" }}
            />
            <button
              onClick={handleClearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              type="button"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            className="w-24 h-24 flex items-center justify-center rounded-full border shadow cursor-pointer bg-gray-100"
            onClick={handleAvatarClick}
          >
            <span className="text-xs text-gray-500 text-center">Profile Photo</span>
          </div>
        )}
      </div>
      <input id="fileInput" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      {uploading && <div className="text-xs text-gray-500 mt-1">Uploading...</div>}
      {error && <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">{error}</div>}
      <div className="text-xs text-gray-400 mt-1">Click to upload profile picture</div>
    </div>
  )
}

export default ImageUpload
