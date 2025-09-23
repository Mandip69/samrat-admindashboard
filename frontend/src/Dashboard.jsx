import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import API, { setToken } from "./api";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  if (token) setToken(token);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleUpload = async () => {
    if (!files.length) return setError("No files selected");
    if (!category) return setError("Please enter a category");

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category);

      try {
        const res = await API.post("/upload", formData);
        setUploaded(prev => [...prev, res.data.url]);
      } catch (err) {
        console.error(err);
        setError("Upload failed. Check your internet or backend.");
        return;
      }
    }
    setFiles([]);
    setError("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded mb-4 cursor-pointer ${
          isDragActive ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop files here ...</p> : <p>Drag & drop images or click to select</p>}
      </div>

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload {files.length} Image(s)
        </button>
      )}

      <div className="grid grid-cols-3 gap-4 mt-4">
        {uploaded.map((url, idx) => (
          <img key={idx} src={url} className="w-full h-40 object-cover rounded" />
        ))}
      </div>
    </div>
  );
}
