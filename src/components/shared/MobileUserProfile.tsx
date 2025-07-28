"use client";

import { baseUrl } from "@/redux/features/api/apiSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";

const MobileUserProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useGetMeQuery(undefined);
  const imgSrc = user?.profile_image ? baseUrl + user?.profile_image : "/images/profile_placeholder.png";
  //const imgSrc = "/images/profile_placeholder.png";



  if (isLoading) {
    return (
      <div className="h-full w-full bg-white/20 rounded-full"></div>
    );
  }

    if (!isLoading && user?.authId) {
        return (
            <>
                <div className="h-8 w-8 rounded-full">
                    <Image
                        src={imgSrc}
                        alt="user"
                        width={500}
                        height={600}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/profile_placeholder.png";
                        }}
                    />
                </div>
                <span className="text-sm">{user?.name}</span>
            </>
        );
    }
};

export default MobileUserProfile;
