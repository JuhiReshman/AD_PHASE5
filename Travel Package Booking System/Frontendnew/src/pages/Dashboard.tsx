import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import UserProfile from '@/components/dashboard/UserProfile';
import BookingHistory from '@/components/dashboard/BookingHistory';
import TravelPreferences from '@/components/dashboard/TravelPreferences';
import Notifications from '@/components/dashboard/Notifications';

type DashboardSection = 'overview' | 'profile' | 'bookings' | 'preferences' | 'notifications';

interface UserData {
  fullName: string;
  email: string;
  isAuthenticated: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication on component mount
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.isAuthenticated) {
        setCurrentUser(userData);
      } else {
        // User exists but not authenticated
        navigate('/');
      }
    } else {
      // No user found, redirect to home
      navigate('/');
    }
    setIsLoading(false);
  }, [navigate]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview user={currentUser} />;
      case 'profile':
        return <UserProfile user={currentUser} />;
      case 'bookings':
        return <BookingHistory user={currentUser} />;
      default:
        return <DashboardOverview user={currentUser} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-palette-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-palette-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect to home page
  }

  return (
    <div className="min-h-screen bg-palette-cream">
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        user={currentUser}
      />
      
      <div className="flex">
        <DashboardSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          user={currentUser}
        />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 