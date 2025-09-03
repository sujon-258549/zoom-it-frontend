import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logOut } from "@/redux/fetures/auth/authSlice";
import { useAppDispatch } from "@/redux/fetures/hooks";
import { useGetMeQuery } from "@/redux/fetures/auth/authApi";
import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const dispatch = useAppDispatch();
  const { data: meData } = useGetMeQuery("");

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer group">
          <Avatar className="h-10 w-10 border-2 border-white/80 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-400 group-hover:shadow-indigo-500/25">
            <AvatarImage
              src={meData?.profileImage || "https://github.com/shadcn.png"}
              className="group-hover:brightness-110 transition-all duration-300"
            />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium">
              {meData?.name ? meData.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 group-hover:bg-emerald-400 transition-colors"></div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-gradient-to-b from-cyan-900 to-cyan-800 text-white rounded-xl shadow-2xl border border-gray-700 overflow-hidden mt-2"
        align="end"
        sideOffset={5}
      >
        {/* Header with user info */}
        <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-cyan-900/30 border-b border-gray-700">
          <DropdownMenuLabel className="text-white font-normal p-0">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src={meData?.profileImage || "https://github.com/shadcn.png"} />
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-cyan-600">
                  {meData?.name ? meData.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{meData?.name || "User"}</span>
                <span className="text-xs text-gray-400">{meData?.email || "user@example.com"}</span>
              </div>
            </div>
          </DropdownMenuLabel>
        </div>

        <div className="p-2">
          <Link to={'/dashboard'}>
            <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer text-gray-300 hover:bg-indigo-900/50 hover:text-white transition-all focus:bg-indigo-900/50 focus:text-white">
              <div className="h-7 w-7 rounded-full bg-cyan-400 flex items-center justify-center">
                <i className="fa-regular fa-credit-card text-indigo-400"></i>
              </div>
              <span>Dashboard</span>
            </DropdownMenuItem>

          </Link>
          <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer text-gray-300 hover:bg-indigo-900/50 hover:text-white transition-all focus:bg-indigo-900/50 focus:text-white">
            <div className="h-7 w-7 rounded-full bg-cyan-400 flex items-center justify-center">
              <i className="fa-regular fa-user text-red-400"></i>
            </div>
            <span>Profile</span>
          </DropdownMenuItem>



          <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer text-gray-300 hover:bg-indigo-900/50 hover:text-white transition-all focus:bg-indigo-900/50 focus:text-white">
            <div className="h-7 w-7 rounded-full bg-cyan-400 flex items-center justify-center">
              <i className="fa-regular fa-users text-indigo-400"></i>
            </div>
            <span>Team</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer text-gray-300 hover:bg-indigo-900/50 hover:text-white transition-all focus:bg-indigo-900/50 focus:text-white">
            <div className="h-7 w-7 rounded-full bg-cyan-400 flex items-center justify-center">
              <i className="fa-regular fa-gem text-indigo-400"></i>
            </div>
            <span>Subscription</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-gray-700" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 py-1 rounded-lg cursor-pointer text-red-400 bg-red-900 hover:text-red-300 transition-all focus:bg-red-900/30 focus:text-red-300"
          >
            <div className="h-7 w-7 rounded-full bg-yellow-700 flex items-center justify-center">
              <i className="fa-regular fa-arrow-right-from-bracket"></i>
            </div>
            <span className="text-white flex gap-5">Logout <LogInIcon /></span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;