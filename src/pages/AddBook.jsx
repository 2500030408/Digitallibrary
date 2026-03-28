import { useState } from "react";
import { addBook } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [pdf, setPdf] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // 📸 Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // 📄 PDF Upload
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPdf(reader.result);
    reader.readAsDataURL(file);
  };

  // ➕ Add Book
  const handleAdd = () => {
    if (!title || !author || !image || rating === 0 || !pdf || !category) {
      alert("Please fill all fields!");
      return;
    }

    addBook({ title, author, image, rating, pdf, category });

    alert("Book added successfully! 🎉");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Book 📚
        </h1>

        {/* Title */}
        <input
          placeholder="Title"
          className="w-full mb-4 p-3 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Author */}
        <input
          placeholder="Author"
          className="w-full mb-4 p-3 border rounded-lg"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/* Category */}
        <select
          className="w-full mb-4 p-3 border rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="self">📚 Self-Improvement</option>
          <option value="psychology">🧠 Psychology</option>
          <option value="fiction">📖 Fiction</option>
          <option value="tech">🚀 Tech / AI / Programming</option>
        </select>

        {/* 📸 Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleImageUpload}
        />

        {/* 🖼️ Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        {/* 📄 PDF Upload */}
        <input
          type="file"
          accept="application/pdf"
          className="w-full mb-4"
          onChange={handlePdfUpload}
        />

        {/* ⭐ Rating */}
        <div className="mb-4 text-center">
          <p>Rate this book:</p>
          <div className="flex justify-center gap-2">
            {[1,2,3,4,5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-3xl"
              >
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-500">
              Selected: {rating} ⭐
            </p>
          )}
        </div>

        {/* ➕ Button */}
        <button
          onClick={handleAdd}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Add Book
        </button>

      </div>
    </div>
  );
}