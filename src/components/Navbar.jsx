import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    setUser(current);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">

        {/* LEFT: TITLE */}
        <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
          📚 Digital Library
        </h1>

        {/* RIGHT: BUTTONS */}
        <div className="flex items-center gap-4">

          {!user && (
            <>
              <button
                onClick={() => setRole("user")}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                User
              </button>

              <button
                onClick={() => setRole("admin")}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Admin
              </button>
            </>
          )}

          {user && (
            <>
              <span className="text-gray-700 font-medium">
                👤 {user.email} ({user.role})
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </nav>

      {/* AUTH MODAL */}
      {role && (
        <AuthModal
          role={role}
          close={() => setRole(null)}
        />
      )}
    </>
  );
}