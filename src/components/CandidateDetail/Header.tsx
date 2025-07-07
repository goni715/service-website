"use client";
import React, { useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks/hooks";
import { baseUrl } from "@/redux/features/api/apiSlice";

const Header = () => {
  const { details } = useAppSelector((state) => state.candidate);

  const [imageSrc, setImageSrc] = useState(details?.profile_image ? baseUrl+details?.profile_image : "/images/profile_placeholder.png");

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="pt-20 pb-6 px-8">
          <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
            <Image
              src={imageSrc}
              onError={() => setImageSrc("/images/profile_placeholder.png")}
              alt="Profile"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {details?.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-gray-600">
                <Briefcase size={18} className="flex-shrink-0" />
                <span className="font-medium">
                  {/* Production Supervisor, Product Manager, Quality Assurance Engineer */}
                  {details?.job_title?.join(", ")}
                </span>
              </div>
              <div className="mt-1 flex items-center text-gray-600">
                <MapPin size={18} className="flex-shrink-0" />
                {/* <span className="ml-1">San Francisco (15 mile radius)</span> */}
                <span className="ml-1">{details?.address}</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-sm">
                Availability: 26 July, 2025
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span>Job Seeking: </span>
            {details?.job_seeking?.map((t, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
