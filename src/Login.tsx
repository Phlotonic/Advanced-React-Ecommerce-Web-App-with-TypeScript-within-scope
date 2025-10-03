import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./components/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

const handleLogin = async (e: FormEvent) => {
  e.preventDefault(); // Prevents page reload on form submission.
  try {
    await signInWithEmailAndPassword(auth, email, password); // Signs in the user.
    alert("Login successful!"); // Alerts the user on successful login.
  } catch (err: any) {
    setError(err.message); // Sets error message if login fails.
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth); // Logs out the user.
    alert("Logged out!"); // Alerts the user on successful logout.
  } catch (err: any) {
    console.error("Logout error:", err.message); // Logs an error if logout fails.
  }
};

// UI Rendering
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Login;