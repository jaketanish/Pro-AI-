import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Settings, 
  Palette, 
  Globe, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  isOpen, 
  onClose, 
  currentTheme, 
  onThemeChange 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'black', name: 'Black', color: '#0f0f0f' },
    { id: 'white', name: 'White', color: '#ffffff' },
    { id: 'dark-blue', name: 'Dark Blue', color: '#0d1b2a' },
    { id: 'deep-purple', name: 'Deep Purple', color: '#2e003e' },
    { id: 'teal', name: 'Teal', color: '#004f4f' },
    { id: 'gray', name: 'Gray', color: '#1f1f1f' },
  ];

  const menuItems = [
    { icon: User, label: 'My Profile', action: () => console.log('Profile clicked') },
    { icon: BookOpen, label: 'My Courses', action: () => console.log('Courses clicked') },
    { icon: Settings, label: 'Account Settings', action: () => console.log('Settings clicked') },
    { icon: Palette, label: 'App Settings', action: () => console.log('App Settings clicked') },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const containerVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          className="absolute top-16 right-0 w-80 bg-proai-gray border border-white/10 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-lg z-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-proai-blue to-proai-purple rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-white">John Doe</h3>
                <p className="text-sm text-gray-400">Pro Member</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                onClick={item.action}
              >
                <item.icon className="w-5 h-5 text-gray-400 group-hover:text-proai-blue transition-colors" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="p-4 border-t border-white/10">
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Theme</span>
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-gray-400" />
                  <Moon className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                      currentTheme === theme.id
                        ? 'border-proai-blue shadow-lg shadow-proai-blue/25'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div 
                      className="w-full h-8 rounded-md"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="text-xs text-gray-400 mt-1 block">{theme.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Language & Help */}
          <div className="p-2 border-t border-white/10">
            <motion.button
              variants={itemVariants}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
            >
              <Globe className="w-5 h-5 text-gray-400 group-hover:text-proai-blue transition-colors" />
              <span className="font-medium">Language Preferences</span>
            </motion.button>
            <motion.button
              variants={itemVariants}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
            >
              <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-proai-blue transition-colors" />
              <span className="font-medium">Help & Support</span>
            </motion.button>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-white/10">
            <motion.button
              variants={itemVariants}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
