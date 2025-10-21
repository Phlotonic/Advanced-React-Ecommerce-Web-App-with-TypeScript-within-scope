import { firestore } from '../components/firebaseConfig';

export async function createUserProfile(id, email, name, address) {
    const userRef = firestore.collection('users').doc(id);
    const data = { id, email, name, address };
    await userRef.set(data);
    return data;
}

export async function getUserProfile(id) {
    const doc = await firestore.collection('users').doc(id).get();
    return doc.exists ? doc.data() : null;
}