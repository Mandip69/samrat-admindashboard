import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import API, { setToken } from "./api";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [error, setError] = useState(""); // for error messages
  const token = localStorage.getItem("token");
  if (token) setToken(token);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    setError(""); // clear error when new files selected
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleUpload = async () => {
    if (files.length === 0) return setError("No files selected");

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await API.post("/upload", formData);
        setUploaded(prev => [...prev, res.data.url]);
      } catch (err) {
        console.error(err);
        if (!navigator.onLine) {
          setError("No internet connection. Please check your network.");
        } else if (err.response) {
          setError(err.response.data.message || "Upload failed.");
        } else {
          setError("Cannot connect to backend. Make sure server is running.");
        }
        return;
      }
    }

    setFiles([]);
    setError("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded cursor-pointer mb-4 ${
          isDragActive ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop images here, or click to select</p>
        )}
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
          <img
            key={idx}
            src={url}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
