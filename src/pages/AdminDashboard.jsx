import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <button
          onClick={() => navigate("/add")}
          className="block w-full bg-white text-indigo-600 p-2 mb-3 rounded"
        >
          ➕ Add Book
        </button>

        <button
          onClick={load}
          className="block w-full bg-gray-200 text-black p-2 rounded"
        >
          🔄 Refresh
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

        {books.map(book => (
          <div
            key={book.id}
            className="flex justify-between bg-white p-4 mb-3 rounded-xl shadow"
          >
            <span>{book.title}</span>

            <button
              onClick={async () => {
                await deleteBook(book.id);
                load();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}