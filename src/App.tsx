import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./components/firebaseConfig";
import { AuthProvider } from "./context/AuthContext";
import AuthForm from "./components/auth/AuthForm";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <AuthForm />
        <div>
          {user ? (
            <div>
              <h2>Welcome, {user.email}</h2>
              <Login /> {/* To provide a logout button */}
            </div>
          ) : (
            <>
              <Register />
              <Login />
            </>
          )}
        </div>
        </AuthProvider>
      );
};

export default App;