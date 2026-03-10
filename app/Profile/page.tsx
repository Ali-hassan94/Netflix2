"use client";

import { useAuthStore } from "@/store/authStore";

export default function Profiles() {
  const { user, selectProfile } = useAuthStore();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Login first
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl mb-10">Who’s watching?</h1>

      <div className="flex gap-10">
        {user.profiles?.map(profile => (
          <div
            key={profile.id}
            onClick={() => selectProfile(profile.id)}
            className="cursor-pointer text-center"
          >
            <div className="w-32 h-32 bg-gray-700 rounded-lg mb-4"></div>
            <p>{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
