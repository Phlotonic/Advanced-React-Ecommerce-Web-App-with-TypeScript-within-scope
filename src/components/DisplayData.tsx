import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Type definition for our User data
type User = {
  id: string; // Unique Firestore document ID, provided when fetching from Firestore
  name: string;
  age: number;
};

const DisplayData = () => {
  // Store list of users fetched from Firestore
  const [users, setUsers] = useState<User[]>([]);

  // Track which user's name/age edits are currently being written to (by user.id)
  // This way, each edit field is separate for each user row
  const [editNames, setEditNames] = useState<{ [id: string]: string }>({});
  const [editAges, setEditAges] = useState<{ [id: string]: string }>({});

  // Basic loading and error state for fetching data and updates
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users from Firestore when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Show a loading indicator while data is loading
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        // Map Firestore docs to our User array, attaching document id
        const usersArray = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as User[];
        setUsers(usersArray);
        setError(null); // Success: clear error if any
      } catch (err) {
        setError('Failed to load users');
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Function to update a Firestore doc by id with changed fields
  // Partial<User>: allows updating *only* the fields provided
  const updateUser = async (userId: string, updatedData: Partial<User>) => {
    try {
      const userDoc = doc(db, 'users', userId); // Reference to specific user in 'users' collection
      await updateDoc(userDoc, updatedData); // Send changes to Firestore
      await refetchUsers(); // Refresh user list after update so UI is accurate
    } catch (err) {
      setError('Failed to update user');
    }
  };

  // Function to delete a user from Firestore
  const deleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId)); // Remove the doc from Firestore
      await refetchUsers(); // Refresh UI after delete
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  // Helper to refetch users after update/delete to keep UI in sync
  const refetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersArray = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as User[];
      setUsers(usersArray);
      setError(null);
    } catch (err) {
      setError('Failed to refresh users');
    }
    setLoading(false);
  };

  // UI is split: loading/error section, then user listing
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
      <h2>Users List</h2>
      {/* Iterate users, rendering props for each with editable state */}
      {users.map((user) => (
        <div key={user.id} style={{ border: '2px solid black', margin: '10px' }}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>

          {/* Name update input: tracks edits in editNames[user.id] */}
          <input
            value={editNames[user.id] ?? ''}
            onChange={e =>
              setEditNames({ ...editNames, [user.id]: e.target.value })
            }
            type="text"
            placeholder="Enter new name"
          />
          <button onClick={() => updateUser(user.id, { name: editNames[user.id] ?? '' })}>
            Update Name
          </button>

          {/* Age update input: tracks edits in editAges[user.id] */}
          <input
            value={editAges[user.id] ?? ''}
            onChange={e =>
              setEditAges({ ...editAges, [user.id]: e.target.value })
            }
            type="number"
            placeholder="Enter new age"
          />
          <button onClick={() => updateUser(user.id, { age: Number(editAges[user.id]) })}>
            Update Age
          </button>

          {/* Delete user with confirmation */}
          <button
            style={{ backgroundColor: 'crimson', color: 'white' }}
            onClick={() => deleteUser(user.id)}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;