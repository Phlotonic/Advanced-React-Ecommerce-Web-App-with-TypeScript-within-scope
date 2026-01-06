/**
 * Edit Profile Component
 * 
 * Allows users to view and edit their profile information stored in Firestore.
 * Handles user data including name, address, phone number, and preferences.
 * 
 * @fileoverview User profile editing component
 * @author Your Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile, updateUserProfile, UserProfile } from '../../utils/userApi';

const EditProfile: React.FC = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Load user profile on component mount
    useEffect(() => {
        const loadProfile = async () => {
            if (user?.uid) {
                try {
                    setLoading(true);
                    const userProfile = await getUserProfile(user.uid);
                    if (userProfile) {
                        setProfile(userProfile);
                    }
                    setError(null);
                } catch (err) {
                    console.error('Error loading profile:', err);
                    setError('Failed to load profile. Please try again.');
                } finally {
                    setLoading(false);
                }
            }
        };
        loadProfile();
    }, [user?.uid]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user?.uid || !profile) {
            setError('User not authenticated');
            return;
        }

        try {
            setSaving(true);
            setError(null);
            
            // Update user profile in Firestore
            await updateUserProfile(user.uid, {
                firstName: profile.firstName,
                lastName: profile.lastName,
                displayName: profile.displayName,
                phoneNumber: profile.phoneNumber,
                address: profile.address,
                preferences: profile.preferences
            });
            
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to save profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
        },
        header: {
            color: '#ffd700',
            fontSize: '28px',
            fontWeight: 'bold' as const,
            fontFamily: 'monospace, "Courier New"',
            letterSpacing: '2px',
            textShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
            marginBottom: '30px',
            textAlign: 'center' as const,
        },
        form: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '20px',
        },
        formSection: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
        },
        fullWidth: {
            gridColumn: '1 / -1' as const,
        },
        label: {
            color: '#ffd700',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'monospace, "Courier New"',
            letterSpacing: '1px',
        },
        input: {
            padding: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            color: '#ffd700',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
        },
        textarea: {
            padding: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            color: '#ffd700',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
            minHeight: '100px',
            resize: 'vertical' as const,
        },
        addressSection: {
            backgroundColor: 'rgba(255, 215, 0, 0.05)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            gridColumn: '1 / -1' as const,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
        },
        addressSectionFull: {
            gridColumn: '1 / -1' as const,
        },
        preferencesSection: {
            backgroundColor: 'rgba(255, 215, 0, 0.05)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            gridColumn: '1 / -1' as const,
        },
        checkboxGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px',
        },
        checkbox: {
            width: '18px',
            height: '18px',
            cursor: 'pointer',
        },
        checkboxLabel: {
            color: '#ffd700',
            fontSize: '14px',
            cursor: 'pointer',
        },
        selectInput: {
            padding: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            color: '#ffd700',
            borderRadius: '6px',
            fontSize: '14px',
        },
        submitButton: {
            padding: '14px 28px',
            backgroundColor: 'rgba(255, 215, 0, 0.15)',
            border: '2px solid rgba(255, 215, 0, 0.5)',
            color: '#ffd700',
            borderRadius: '8px',
            cursor: 'pointer' as const,
            fontWeight: 'bold' as const,
            fontSize: '14px',
            fontFamily: 'monospace, "Courier New"',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            gridColumn: '1 / -1' as const,
        },
        errorMessage: {
            backgroundColor: 'rgba(255, 68, 68, 0.1)',
            border: '2px solid rgba(255, 68, 68, 0.5)',
            color: '#ff4444',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
        },
        successMessage: {
            backgroundColor: 'rgba(100, 200, 100, 0.1)',
            border: '2px solid rgba(100, 200, 100, 0.5)',
            color: '#4CAF50',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
        },
        loadingMessage: {
            color: '#ffd700',
            textAlign: 'center' as const,
            padding: '40px',
            fontSize: '16px',
            fontFamily: 'monospace',
        },
    };

    if (loading) {
        return <div style={styles.loadingMessage}>Loading profile...</div>;
    }

    if (!profile) {
        return <div style={styles.loadingMessage}>Unable to load profile</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Edit Profile</h1>
            
            {error && <div style={styles.errorMessage}>{error}</div>}
            {success && <div style={styles.successMessage}>Profile updated successfully!</div>}

            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formSection}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="firstName">First Name</label>
                        <input
                            style={styles.input}
                            id="firstName"
                            type="text"
                            value={profile.firstName || ''}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="lastName">Last Name</label>
                        <input
                            style={styles.input}
                            id="lastName"
                            type="text"
                            value={profile.lastName || ''}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="displayName">Display Name</label>
                    <input
                        style={styles.input}
                        id="displayName"
                        type="text"
                        value={profile.displayName || ''}
                        onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="phoneNumber">Phone Number</label>
                    <input
                        style={styles.input}
                        id="phoneNumber"
                        type="tel"
                        value={profile.phoneNumber || ''}
                        onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                    />
                </div>

                {/* Address Section */}
                <div style={{ ...styles.addressSection, ...styles.addressSectionFull }}>
                    <h3 style={{ ...styles.label, gridColumn: '1 / -1' }}>Address</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="street">Street</label>
                        <input
                            style={styles.input}
                            id="street"
                            type="text"
                            value={profile.address?.street || ''}
                            onChange={(e) => setProfile({
                                ...profile,
                                address: { 
                                    street: e.target.value,
                                    city: profile.address?.city || '',
                                    state: profile.address?.state || '',
                                    zipCode: profile.address?.zipCode || '',
                                    country: profile.address?.country || 'US'
                                }
                            })}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="city">City</label>
                        <input
                            style={styles.input}
                            id="city"
                            type="text"
                            value={profile.address?.city || ''}
                            onChange={(e) => setProfile({
                                ...profile,
                                address: { 
                                    street: profile.address?.street || '',
                                    city: e.target.value,
                                    state: profile.address?.state || '',
                                    zipCode: profile.address?.zipCode || '',
                                    country: profile.address?.country || 'US'
                                }
                            })}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="state">State</label>
                        <input
                            style={styles.input}
                            id="state"
                            type="text"
                            value={profile.address?.state || ''}
                            onChange={(e) => setProfile({
                                ...profile,
                                address: { 
                                    street: profile.address?.street || '',
                                    city: profile.address?.city || '',
                                    state: e.target.value,
                                    zipCode: profile.address?.zipCode || '',
                                    country: profile.address?.country || 'US'
                                }
                            })}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="zipCode">Zip Code</label>
                        <input
                            style={styles.input}
                            id="zipCode"
                            type="text"
                            value={profile.address?.zipCode || ''}
                            onChange={(e) => setProfile({
                                ...profile,
                                address: { 
                                    street: profile.address?.street || '',
                                    city: profile.address?.city || '',
                                    state: profile.address?.state || '',
                                    zipCode: e.target.value,
                                    country: profile.address?.country || 'US'
                                }
                            })}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="country">Country</label>
                        <input
                            style={styles.input}
                            id="country"
                            type="text"
                            value={profile.address?.country || ''}
                            onChange={(e) => setProfile({
                                ...profile,
                                address: { 
                                    street: profile.address?.street || '',
                                    city: profile.address?.city || '',
                                    state: profile.address?.state || '',
                                    zipCode: profile.address?.zipCode || '',
                                    country: e.target.value
                                }
                            })}
                        />
                    </div>
                </div>

                {/* Preferences Section */}
                <div style={styles.preferencesSection}>
                    <h3 style={styles.label}>Preferences</h3>
                    <div style={styles.checkboxGroup}>
                        <input
                            style={styles.checkbox}
                            type="checkbox"
                            id="notifications"
                            checked={profile.preferences?.notifications || false}
                            onChange={(e) => setProfile({
                                ...profile,
                                preferences: { 
                                    notifications: e.target.checked,
                                    newsletter: profile.preferences?.newsletter || false,
                                    theme: profile.preferences?.theme || 'auto'
                                }
                            })}
                        />
                        <label style={styles.checkboxLabel} htmlFor="notifications">
                            Enable Notifications
                        </label>
                    </div>
                    <div style={styles.checkboxGroup}>
                        <input
                            style={styles.checkbox}
                            type="checkbox"
                            id="newsletter"
                            checked={profile.preferences?.newsletter || false}
                            onChange={(e) => setProfile({
                                ...profile,
                                preferences: { 
                                    notifications: profile.preferences?.notifications || false,
                                    newsletter: e.target.checked,
                                    theme: profile.preferences?.theme || 'auto'
                                }
                            })}
                        />
                        <label style={styles.checkboxLabel} htmlFor="newsletter">
                            Subscribe to Newsletter
                        </label>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="theme">Theme</label>
                        <select
                            style={styles.selectInput}
                            id="theme"
                            value={profile.preferences?.theme || 'auto'}
                            onChange={(e) => setProfile({
                                ...profile,
                                preferences: { 
                                    notifications: profile.preferences?.notifications || false,
                                    newsletter: profile.preferences?.newsletter || false,
                                    theme: e.target.value as 'light' | 'dark' | 'auto'
                                }
                            })}
                        >
                            <option value="auto">Auto</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>

                <button
                    style={styles.submitButton}
                    type="submit"
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;