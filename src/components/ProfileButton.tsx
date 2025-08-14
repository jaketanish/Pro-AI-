import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ChevronDown } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

interface ProfileButtonProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ currentTheme, onThemeChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-all duration-200 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-proai-blue to-proai-purple rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-black" />
        </div>
        
        {/* Username (hidden on mobile) */}
        <span className="hidden md:block text-sm font-medium text-white">John Doe</span>
        
        {/* Dropdown Arrow */}
        <motion.div
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
        </motion.div>
      </motion.button>

      {/* Profile Dropdown */}
      <ProfileDropdown
        isOpen={isDropdownOpen}
        onClose={closeDropdown}
        currentTheme={currentTheme}
        onThemeChange={onThemeChange}
      />
    </div>
  );
};

export default ProfileButton;
