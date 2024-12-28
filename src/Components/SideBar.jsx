import React, { useState } from 'react';
import {
  Home,
  ThumbsUp,
  History,
  Play,
  FolderOpen,
  Users,
  Settings,
  HelpCircle,
  Video,
  Menu
} from 'lucide-react';

const mainMenuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Video, label: 'My Content', path: '/content' },
  { icon: History, label: 'History', path: '/history' },
  { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
  { icon: FolderOpen, label: 'Collections', path: '/collections' },
  { icon: Users, label: 'Subscriptions', path: '/subscriptions' },
];

const bottomMenuItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Support', path: '/support' },
];

const MenuItemComponent = ({ icon: Icon, label, isCollapsed, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 px-4 py-3 
      ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300'} 
      hover:bg-gray-800 hover:text-white
      transition-colors duration-200 rounded-lg
    `}
  >
    <Icon size={20} />
    {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
  </button>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`
        relative h-screen bg-black transition-all duration-300 
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 bg-gray-800 p-1 rounded-full"
      >
        <Menu size={16} className="text-gray-300" />
      </button>

      {/* Main Navigation */}
      <div className="flex flex-col h-full">
        {/* Logo/Brand Area */}
        <div className="p-4 mb-4">
          <div className="flex items-center justify-center">
            <span className={`text-white font-bold ${isCollapsed ? 'hidden' : 'block'}`}>
              LOGO
            </span>
          </div>
        </div>

        {/* Main Menu Items */}
        <nav className="flex-1 px-2">
          <div className="space-y-1">
            {mainMenuItems.map((item) => (
              <MenuItemComponent
                key={item.label}
                {...item}
                isCollapsed={isCollapsed}
                isActive={activeItem === item.label}
                onClick={() => setActiveItem(item.label)}
              />
            ))}
          </div>
        </nav>

        {/* Bottom Menu Items */}
        <div className="border-t border-gray-800 p-2 mt-auto">
          <div className="space-y-1">
            {bottomMenuItems.map((item) => (
              <MenuItemComponent
                key={item.label}
                {...item}
                isCollapsed={isCollapsed}
                isActive={activeItem === item.label}
                onClick={() => setActiveItem(item.label)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;