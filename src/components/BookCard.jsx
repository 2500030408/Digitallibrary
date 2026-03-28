export default function BookCard({ book }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:scale-105 transition">
      <h2 className="font-bold">{book.title}</h2>
      <p className="text-gray-500">{book.author}</p>
    </div>
  );
}