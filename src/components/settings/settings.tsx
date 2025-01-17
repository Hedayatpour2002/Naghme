"use client";

import ProfilePictureUploader from "@/components/settings/profilePicture";
import PasswordChangeFrom from "@/components/settings/PasswordChangeFrom";

export default function Settings() {
  return (
    <>
      <h2 className="font-semibold text-3xl py-8">تنظیمات</h2>
      <div className="flex flex-col mb-20 items-center gap-4">
        <ProfilePictureUploader />
        <PasswordChangeFrom />
      </div>
    </>
  );
}
