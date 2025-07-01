"use client";
import { baseUrl } from "@/redux/features/api/apiSlice";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type TProps = {
    setFile: Dispatch<SetStateAction<File | null>>
}

const EditProfilePic = ({ setFile }: TProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState(user?.profile_image === null ? "/images/profile_placeholder.png" : baseUrl+user?.profile_image); // Default image
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  return (
    <>
      <div className="col-span-1">
        <p className="text-md mb-2">Profile Picture</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <div className="relative w-48 h-48">
          <Image
            src={imageSrc}
            alt="Profile"
            onError={() => setImageSrc("/images/profile_placeholder.png")}
            width={600}
            height={600}
            className="w-48 h-48 rounded-md object-cover border-4 border-white shadow-md"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute -top-3 -right-3 bg-gray-800 text-white font-semibold p-3 rounded-full cursor-pointer hover:bg-gray-900 transition duration-200 shadow-md"
          >
            <Camera size={16} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePic;
