import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Home,
  ThumbsUp,
  History,
  FolderOpen,
  Users,
  Settings,
  HelpCircle,
  Video,
  Menu,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mainMenuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Video, label: 'My Content', path: '/content' },
  { icon: History, label: 'History', path: '/history' },
  { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
  { icon: FolderOpen, label: 'Collections', path: '/collections' },
  { icon: Users, label: 'Subscriptions', path: '/home/feed/subscriptions' },
];

const bottomMenuItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Support', path: '/support' },
];

const MenuItemComponent = ({ icon: Icon, path, label, isCollapsed, isActive, onClick }) => (
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

const Sidebar = ({ myprop = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const loginStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate(); // Ensure it's used inside the component.

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleNavigation = (path, label) => {
    setActiveItem(label); // Set the active menu item
    navigate(path); // Navigate to the desired path
    if (isMobileOpen) setIsMobileOpen(false); // Close mobile sidebar (if open)
  };
  

  if (!loginStatus) {
    return <div className="bg-white">Login</div>;
  }

  return (
    <>
      {/* Sidebar for larger screens */}
      <div
        className={`
          hidden ${myprop ? '' : 'md:flex flex-col h-screen bg-black transition-all duration-300'}
          ${isCollapsed ? 'w-16' : 'w-64'} 
        `}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="relative z-1000 -right-3 w-7 -top-10 bg-gray-800 p-1 rounded-full"
        >
          <Menu size={20} className="text-gray-300" />
        </button>

        {/* Main Navigation */}
        <div className="flex flex-col h-full">
          {/* Main Menu Items */}
          <nav className="flex-1 px-2">
            <div className="space-y-1">
              {mainMenuItems.map((item) => (
                <MenuItemComponent
                  key={item.label}
                  {...item}
                  isCollapsed={isCollapsed}
                  isActive={activeItem === item.label}
                  onClick={() => handleNavigation(item.path, item.label)}
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
                  onClick={() => handleNavigation(item.path, item.label)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for smaller screens */}
      <div className={`${myprop ? '' : 'md:hidden'} `}>
        <button
          onClick={toggleMobileSidebar}
          className="bg-gray-800 p-2 text-white fixed top-3 left-4 rounded-full z-50"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isMobileOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col w-64">
            <div className="flex-1 px-4">
              {mainMenuItems.map((item) => (
                <MenuItemComponent
                  key={item.label}
                  {...item}
                  isCollapsed={false}
                  isActive={activeItem === item.label}
                  onClick={() => handleNavigation(item.path, item.label)}
                />
              ))}
            </div>
            <div className="border-t border-gray-800 p-4">
              {bottomMenuItems.map((item) => (
                <MenuItemComponent
                  key={item.label}
                  {...item}
                  isCollapsed={false}
                  isActive={activeItem === item.label}
                  onClick={() => handleNavigation(item.path, item.label)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
