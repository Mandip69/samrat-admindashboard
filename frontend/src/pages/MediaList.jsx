import React, { useEffect, useState } from 'react';
import API from '../api';

export default function MediaList() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(()=> {
    async function load() {
      const res = await API.get('/media', { params: category ? { category } : {} });
      setItems(res.data);
    }
    load();
  }, [category]);

  async function handleDelete(id) {
    if (!confirm('Delete?')) return;
    await API.delete(`/media/${id}`);
    setItems(items.filter(i=>i._id !== id));
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <select onChange={e=>setCategory(e.target.value)} className="p-2 border">
          <option value="">All</option>
          <option>Wedding</option>
          <option>Travel</option>
          <option>Events</option>
          <option>Food</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map(i => (
          <div key={i._id} className="border p-2 rounded">
            {i.resource_type === 'video' || i.secure_url?.endsWith('.mp4') ? (
              <video src={i.secure_url} controls className="w-full h-48 object-cover"/>
            ) : (
              <img src={i.secure_url} alt={i.title} className="w-full h-48 object-cover" />
            )}
            <h3 className="font-bold mt-2">{i.title}</h3>
            <p className="text-sm">{i.description}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={()=>handleDelete(i._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
