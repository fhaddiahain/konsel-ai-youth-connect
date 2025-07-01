
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  currentUser?: {
    name: string;
    email: string;
  };
}

const Header = ({ currentUser }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sidebar Trigger and Logo */}
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="h-8 w-8" />
            <div className="bg-green-500 rounded-lg p-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">KA</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">KonselAI</h1>
              <p className="text-sm text-gray-500">Sistem Konseling Emosi Modern</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Cari konten, artikel, atau fitur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Right Side - Notifications, Settings, Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>

            {/* Settings */}
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>

            {/* User Profile */}
            {currentUser && (
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <div className="bg-green-100 rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="text-green-700 font-semibold text-sm">
                    {getUserInitials(currentUser.name)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-32">
                    {currentUser.email}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
