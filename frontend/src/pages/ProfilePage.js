import React, { useState, useEffect } from 'react';
import { authAPI } from '../api/api';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setProfile(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading"><div className="spinner"></div></div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card card">
          <div className="profile-header">
            <div className="profile-avatar">
              {profile?.fullName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1>{profile?.fullName}</h1>
              <p className="profile-role">{profile?.role}</p>
            </div>
          </div>

          <div className="profile-details">
            <h3>Account Information</h3>
            <div className="detail-group">
              <label>Full Name</label>
              <p>{profile?.fullName}</p>
            </div>
            <div className="detail-group">
              <label>Email</label>
              <p>{profile?.email}</p>
            </div>
            <div className="detail-group">
              <label>Role</label>
              <p className="badge badge-blue">{profile?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
