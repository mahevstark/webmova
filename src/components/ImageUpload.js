"use client";

import { Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const ImageUpload = ({ setURL }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setURL(data?.url);
        setUploadedUrl(data.url);
        setSelectedFile(null);
        // Reset file input
        document.getElementById("fileInput").value = "";
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Network error occurred");
      console.log("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-sm">
      <div className="mb-4">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className=" "
        />
      </div>

      <Button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        {uploading ? "Uploading..." : "Upload Logo"}
      </Button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {uploadedUrl && (
        <div className="mt-4">
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
