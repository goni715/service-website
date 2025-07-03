"use client";

import { logout } from "@/helper/SessionHelper";
import useUserInfo from "@/hooks/useUserInfo";
import { Bell, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import MobileDashboardButton from "./MobileDashboardButton";

type TProps = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu = ({ setIsMenuOpen }: TProps) => {
  const userInfo = useUserInfo();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="md:hidden bg-primary">
        <div className="space-y-1 px-4 pb-3 pt-2">
          <div
            onClick={() => handleNavigate("/")}
            className={`block rounded-md px-3 py-2 hover:bg-white/10 cursor-pointer ${
              pathname === "/" ? "text-secondary" : "text-white"
            }`}
          >
            Home
          </div>
          <div
            onClick={() => handleNavigate("/find-work")}
            className={`block rounded-md px-3 py-2 hover:bg-white/10 cursor-pointer ${
              pathname === "/find-work" ? "text-secondary" : "text-white"
            }`}
          >
            Find Work
          </div>

          {userInfo?.authId && <MobileDashboardButton handleNavigate={handleNavigate}/>}
        
          <div
            onClick={() => handleNavigate("/blog-list")}
            className={`block rounded-md px-3 py-2 hover:bg-white/10 cursor-pointer ${
              pathname === "/blog-list" ? "text-secondary" : "text-white"
            }`}
          >
            Blogs
          </div>
          <div
            onClick={() => handleNavigate("/contact")}
            className={`block rounded-md px-3 py-2 hover:bg-white/10 cursor-pointer ${
              pathname === "/contact" ? "text-secondary" : "text-white"
            }`}
          >
            Contact
          </div>
          <div className="my-3 border-t border-white/20 pt-3">
            {userInfo?.authId ? (
              <>

              <div
                  onClick={() => logout()}
                  className="mt-2 w-full block rounded-md cursor-pointer border border-white px-3 py-2 text-center text-white"
                >
                  Logout
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 px-3">
              <div
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-full">
                  <Image
                    src="/images/avatar.png"
                    alt="user"
                    width={500}
                    height={600}
                  />
                </div>
                <span className="text-sm">Andrew Ainsley</span>
              </div>
              <div className="flex gap-3">
                <div
                  className="relative ml-auto cursor-pointer"
                  onClick={() =>
                    handleNavigate(`/dashboard/${userInfo?.role==="USER" ? "candidate" : "employer"}/messages`)
                  }
                >
                  <MessageCircleMore size={20} />
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[4px] text-[10px] leading-tight flex items-center justify-center rounded-full bg-red-500 text-white">
                    2
                  </span>
                </div>
                <div
                  className="relative ml-auto cursor-pointer"
                  onClick={() => handleNavigate("/notifications")}
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[4px] text-[10px] leading-tight flex items-center justify-center rounded-full bg-red-500 text-white">
                    2
                  </span>
                </div>
              </div>
            </div>
             
              </>
            ) : (
              <>
                   <div className="flex gap-2">
                  <div
                    onClick={() => handleNavigate("/login")}
                    className="mt-2 w-full block rounded-md border cursor-pointer border-white px-3 py-2 text-center text-white"
                  >
                    Sign In
                  </div>
                  <div
                    onClick={() =>
                      handleNavigate("/dashboard/employer/post-job")
                    }
                    className="mt-2 cursor-pointer block w-full rounded-md bg-white px-3 py-2 text-center text-[#1a2c4e]"
                  >
                    Sign Up
                  </div>
                </div>
              </>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
