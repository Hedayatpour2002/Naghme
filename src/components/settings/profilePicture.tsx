"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfilePictureUploader() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center group rounded-full overflow-hidden shadow-lg border-4 border-light-ligth-purple">
      <div className="relative">
        <Image
          src={profileImage || "/images/default-avatar.svg"}
          alt="Profile"
          className="object-cover aspect-square"
          width={128}
          height={128}
        />
        <label
          htmlFor="profile-picture"
          className="hidden absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center text-white text-sm cursor-pointer"
        >
          Change
        </label>
      </div>
      <input
        id="profile-picture"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}
