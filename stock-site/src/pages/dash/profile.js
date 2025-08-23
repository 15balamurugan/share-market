import React, { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Badge } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.58:8000/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full text-white">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
            <User size={48} />
          </div>
          <h2 className="text-3xl font-bold mt-4">{profile.username}</h2>
          <p className="text-green-400 text-sm">Stock Market Enthusiast 📈</p>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
            <Badge className="text-green-400" size={20} />
            <span className="font-semibold">Name:</span>
            <span>
              {profile.firstname} {profile.lastname}
            </span>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
            <Mail className="text-green-400" size={20} />
            <span className="font-semibold">Email:</span>
            <span>{profile.email}</span>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
            <Phone className="text-green-400" size={20} />
            <span className="font-semibold">Mobile:</span>
            <span>{profile.mobile_no}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-green-400" size={20} />
            <span className="font-semibold">Joined:</span>
            <span>{new Date(profile.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Footer Button */}
        {/* <div className="mt-6 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-medium transition transform hover:scale-[1.02] shadow-lg">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
  );
}
