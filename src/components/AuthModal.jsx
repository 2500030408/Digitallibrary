import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ role, close }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      const user = users.find(
        u => u.email === email && u.password === password && u.role === role
      );

      if (!user) {
        alert("User not found ❌");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

    } else {
      const exists = users.find(u => u.email === email);

      if (exists) {
        alert("User already exists ❌");
        return;
      }

      const newUser = { email, password, role };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    }

    close();

    // 🔥 FIXED NAVIGATION
    setTimeout(() => {
      if (role === "admin") navigate("/admin");
      else navigate("/user");
    }, 100);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

      <div className="bg-white p-6 rounded-xl w-80 shadow-xl">

        <h2 className="text-xl font-bold mb-4 text-center">
          {role.toUpperCase()} {isLogin ? "Login" : "Signup"}
        </h2>

        <input
          placeholder="Email"
          className="input"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleAuth} className="btn w-full">
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="text-sm text-center mt-3 cursor-pointer text-indigo-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "New user? Signup" : "Already have account? Login"}
        </p>

        <button onClick={close} className="text-red-500 mt-3 w-full">
          Close
        </button>
      </div>
    </div>
  );
}