// 📦 Load books from localStorage or use default data
let books = JSON.parse(localStorage.getItem("books")) || [
  {
    id: 1,
    title: "React Mastery",
    author: "Dan Abramov",
    image: "https://source.unsplash.com/300x200/?react,code"
  },
  {
    id: 2,
    title: "JavaScript Guide",
    author: "MDN",
    image: "https://source.unsplash.com/300x200/?javascript"
  },
  {
    id: 3,
    title: "AI Basics",
    author: "Andrew Ng",
    image: "https://source.unsplash.com/300x200/?ai,technology"
  },
  {
    id: 4,
    title: "UI/UX Design",
    author: "DesignLab",
    image: "https://source.unsplash.com/300x200/?design"
  }
];

// 💾 Save to localStorage
const saveBooks = () => {
  localStorage.setItem("books", JSON.stringify(books));
};

// 📚 GET ALL BOOKS
export const getBooks = async () => {
  return books;
};

// 🔍 GET SINGLE BOOK
export const getBookById = async (id) => {
  return books.find(b => b.id == id);
};

// ➕ ADD BOOK
export const addBook = async (book) => {
  const newBook = {
    id: Date.now(),
    ...book
  };

  books.push(newBook);
  saveBooks();
};

// ❌ DELETE BOOK
export const deleteBook = async (id) => {
  books = books.filter(b => b.id !== id);
  saveBooks();
};