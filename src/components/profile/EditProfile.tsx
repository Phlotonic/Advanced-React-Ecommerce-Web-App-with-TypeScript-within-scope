import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../utils/userApi';

interface UserProfile {
    name: string;
    address: string;
}


const EditProfile: React.FC = () => {
    const { user } = useAuth();
    const [profile, setProfile] =useState<UserProfile>({ name: '', address: '' });

    useEffect(() => {
        const loadProfile = async () => {
            if (user?.uid) {
                const userProfile = await getUserProfile(user.uid);
                if (userProfile) {
                    setProfile({
                        name: userProfile.name || '',
                        address: userProfile.address || ''
                    });
                }
            }
        };
        loadProfile();
    }, [user?.uid]);

    return (
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                id="name" 
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input 
                id="address" 
                type="text" 
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default EditProfile;