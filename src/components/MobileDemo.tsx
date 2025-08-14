import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import BottomNavigationBar from './BottomNavigationBar';
import ProfileButton from './ProfileButton';

const MobileDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { currentTheme, setTheme } = useTheme();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  const demoContent = {
    home: {
      title: '🏠 Home',
      content: 'Welcome to ProAI! This is your personalized AI learning dashboard.',
      icon: '🏠'
    },
    courses: {
      title: '📚 Courses',
      content: 'Browse and manage your AI learning courses. Track your progress and discover new tools.',
      icon: '📚'
    },
    reels: {
      title: '🎬 Reels',
      content: 'Watch short AI tutorials and quick tips in our video reels format.',
      icon: '🎬'
    },
    news: {
      title: '📰 AI News',
      content: 'Stay updated with the latest AI developments, tool releases, and industry insights.',
      icon: '📰'
    },
    community: {
      title: '👥 Community',
      content: 'Connect with other AI learners, share experiences, and get help from the community.',
      icon: '👥'
    }
  };

  const currentContent = demoContent[activeTab as keyof typeof demoContent];

  return (
    <div className="min-h-screen bg-proai-dark text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-proai-dark/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-proai-blue">ProAI Mobile</h1>
          <ProfileButton 
            currentTheme={currentTheme} 
            onThemeChange={setTheme} 
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20 px-4">
        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-8"
        >
          <div className="text-6xl mb-4">{currentContent.icon}</div>
          <h2 className="text-2xl font-bold mb-4 text-proai-blue">
            {currentContent.title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
            {currentContent.content}
          </p>
        </motion.div>

        {/* Theme Preview */}
        <div className="mt-8 p-4 bg-proai-gray rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-center">Current Theme</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-lg border-2 border-proai-blue shadow-lg shadow-proai-blue/25"
                style={{ backgroundColor: currentTheme === 'black' ? '#0f0f0f' : 
                         currentTheme === 'white' ? '#ffffff' :
                         currentTheme === 'dark-blue' ? '#0d1b2a' :
                         currentTheme === 'deep-purple' ? '#2e003e' :
                         currentTheme === 'teal' ? '#004f4f' :
                         currentTheme === 'gray' ? '#1f1f1f' : '#0f0f0f' }}
              />
              <span className="text-sm text-gray-400 mt-2 block capitalize">
                {currentTheme.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-proai-gray rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-center">Try It Out!</h3>
          <ul className="text-sm text-gray-300 space-y-2 text-left max-w-md mx-auto">
            <li>• Tap the bottom navigation tabs to switch content</li>
            <li>• Click the profile button to open the dropdown menu</li>
            <li>• Try changing themes in the profile dropdown</li>
            <li>• Notice the smooth animations and hover effects</li>
          </ul>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigationBar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default MobileDemo;
