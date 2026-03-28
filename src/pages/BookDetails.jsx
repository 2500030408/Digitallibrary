import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooks } from "../services/api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBooks().then(data => {
      const found = data.find(b => b.id == id);
      setBook(found);
    });
  }, [id]);

  if (!book) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <img src={book.image} className="w-64 mb-4 rounded-xl" />
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-500">{book.author}</p>
    </div>
  );
}