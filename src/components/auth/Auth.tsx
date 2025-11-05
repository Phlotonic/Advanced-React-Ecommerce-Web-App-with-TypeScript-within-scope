import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

async function login(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Handle successful login (redirect, UI update, etc.)
    } catch (error) {
        console.error(error);
    }
}

async function logout() {
    try {
        await signOut(auth);
        // Handle post-logout UI update
    } catch (error) {
        console.error(error);
    }
}

