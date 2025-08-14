import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Play, Newspaper, Users, Bell } from 'lucide-react';

interface BottomNavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home', hasNotification: false },
    { id: 'courses', label: 'Courses', icon: BookOpen, path: '/courses', hasNotification: false },
    { id: 'reels', label: 'Reels', icon: Play, path: '/reels', hasNotification: true },
    { id: 'news', label: 'AI News', icon: Newspaper, path: '/news', hasNotification: false },
    { id: 'community', label: 'Community', icon: Users, path: '/community', hasNotification: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg border-t border-white/10" />
      
      {/* Navigation items */}
      <div className="relative flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative group touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-proai-blue rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Icon with notification indicator */}
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 mb-1 transition-all duration-300 ${
                    isActive 
                      ? 'text-proai-blue drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]' 
                      : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                />
                
                {/* Notification dot */}
                {item.hasNotification && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                  />
                )}
              </div>
              
              {/* Label */}
              <span 
                className={`text-xs font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-proai-blue' 
                    : 'text-gray-400 group-hover:text-gray-300'
                }`}
              >
                {item.label}
              </span>
              
              {/* Active glow effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-proai-blue/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-black/90" />
    </div>
  );
};

export default BottomNavigationBar;
