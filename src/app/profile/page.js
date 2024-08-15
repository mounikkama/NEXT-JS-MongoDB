// src/app/profile/page.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [user, setUser] = useState(null);
  console.log("---> data user", user)
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login');
      } else {
        const res = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          router.push('/login');
        }
      }
    };
    fetchUserData();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <span className="text-gray-700">Upload</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div className="text-left w-full space-y-4">
            <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-700"><span className="font-bold">Username:</span> {user.username}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-700"><span className="font-bold">Email:</span> {user.email}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-700"><span className="font-bold">First Name:</span> {user.firstName}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-700"><span className="font-bold">Last Name:</span> {user.lastName}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-700"><span className="font-bold">Role:</span> {user.role}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-700"><span className="font-bold">Created At:</span> {new Date(user.created_at).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-700"><span className="font-bold">Updated At:</span> {new Date(user.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
