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
      // ✅ Notice: '/media' only, because baseURL already has '/api'
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Media</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-lg">
        <input
          className="w-full mb-2 p-2 border"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full mb-2 p-2 border"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Description"
        />
        <select
          className="w-full mb-2 p-2 border"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Wedding</option>
          <option>Travel</option>
          <option>Events</option>
          <option>Food</option>
        </select>
        <input type="file" className="mb-2" onChange={e => setFile(e.target.files[0])} />
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
