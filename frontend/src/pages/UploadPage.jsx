import React, { useState } from 'react';
import API from '../api';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return alert('Select a file');
    setLoading(true);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    fd.append('description', desc);
    fd.append('category', category);

    try {
      await API.post('/media', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Uploaded successfully!');
      setTitle('');
      setDesc('');
      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:scale-[1.02]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Upload Media</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />

          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Wedding</option>
            <option>Travel</option>
            <option>Events</option>
            <option>Food</option>
          </select>

          <div className="w-full">
            <label className="block mb-2 font-medium text-gray-600">Choose File</label>
            <input
              type="file"
              className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-600
              hover:file:bg-blue-100 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 text-white font-medium rounded-md shadow-md transition-all 
              ${loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg'
              }`}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} Admin Panel
        </p>
      </div>
    </div>
  );
}
