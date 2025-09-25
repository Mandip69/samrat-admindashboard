import React, { useState } from "react";

export default function UploadMedia() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("image", file); // must match backend multer field
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const res = await fetch("http://localhost:5000/api/media", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Upload successful!");
        setTitle("");
        setDescription("");
        setCategory("");
        setFile(null);
        console.log(data);
      } else {
        alert(data.message || "Upload failed");
        console.log(data);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Upload Media
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Enter description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Select File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
