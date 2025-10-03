import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./components/firebaseConfig";
import Register from "./Register";
import Login from "./Login";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
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
  );
};

export default App;