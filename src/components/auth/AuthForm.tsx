// src/components/auth/AuthForm.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Login from "./Login";
import Register from "./Register";

const AuthForm: React.FC = () => {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {showRegister ? <Register /> : <Login />}
      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? "Already have an account? Login" : "Need an account? Register"}
      </button>
    </div>
  );
};

export default AuthForm;
