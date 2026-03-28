import { useEffect, useState } from "react";
import { getBooks } from "../services/api";

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  // 🔍 Filter Logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10">
        <h1 className="text-4xl font-bold">Explore Books 📚</h1>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button onClick={() => setSelectedCategory("all")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
          All
        </button>
        <button onClick={() => setSelectedCategory("self")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
          📚 Self-Improvement
        </button>
        <button onClick={() => setSelectedCategory("psychology")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
          🧠 Psychology
        </button>
        <button onClick={() => setSelectedCategory("fiction")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
          📖 Fiction
        </button>
        <button onClick={() => setSelectedCategory("tech")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
          🚀 Tech / AI / Programming
        </button>
      </div>

      {/* SEARCH */}
      <div className="p-6 flex justify-center">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-3 rounded-xl shadow"
        />
      </div>

      {/* BOOK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-xl shadow">

            {/* IMAGE */}
            <img
              src={book.image || "https://via.placeholder.com/300x200"}
              alt={book.title}
              className="h-48 w-full object-cover rounded-lg"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200";
              }}
            />

            {/* INFO */}
            <h2 className="text-lg font-bold mt-2">{book.title}</h2>
            <p className="text-gray-500">{book.author}</p>

            {/* ⭐ Rating */}
            <p className="text-yellow-400">
              {"⭐".repeat(book.rating || 0)}
            </p>

            {/* 📄 VIEW PDF */}
            <button
              onClick={() => {
                if (book.pdf) {
                  window.open(book.pdf, "_blank");
                } else {
                  alert("No PDF available");
                }
              }}
              className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              View Details
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}