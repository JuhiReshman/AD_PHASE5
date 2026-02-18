import React, { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import { 
  getAdminStats, 
  getAllUsers, 
  getAllAgents, 
  getAllBookings, 
  getSystemActivity,
  AdminStats,
  User,
  Agent,
  AdminBooking,
  SystemActivity
} from '@/lib/adminApi';

const Card = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <span className="text-2xl font-bold text-[#964734]">{value}</span>
    <span className="text-gray-600 mt-2">{label}</span>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [activity, setActivity] = useState<SystemActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const overviewRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const bookingsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all admin data in parallel
        const [statsData, usersData, agentsData, bookingsData, activityData] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
          getAllAgents(),
          getAllBookings(),
          getSystemActivity()
        ]);

        setStats(statsData);
        setUsers(usersData);
        setAgents(agentsData);
        setBookings(bookingsData);
        setActivity(activityData);
      } catch (err) {
        setError('Failed to load admin data. Using fallback data.');
        console.error('Admin data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#964734] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex max-w-7xl mx-auto pt-8">
        {/* Sidebar */}
        <aside className="w-56 hidden md:block pr-6">
          <nav className="sticky top-24 flex flex-col gap-4 text-lg">
            <button onClick={() => scrollTo(overviewRef)} className="text-[#964734] hover:underline text-left">Overview</button>
            <button onClick={() => scrollTo(usersRef)} className="text-[#964734] hover:underline text-left">User Management</button>
            <button onClick={() => scrollTo(agentsRef)} className="text-[#964734] hover:underline text-left">Agent Management</button>
            <button onClick={() => scrollTo(bookingsRef)} className="text-[#964734] hover:underline text-left">Bookings</button>
            <button onClick={() => scrollTo(activityRef)} className="text-[#964734] hover:underline text-left">Activity</button>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 px-2 md:px-0">
          <h1 className="text-4xl font-bold text-[#964734] mb-8 text-center">Admin Dashboard</h1>
          
          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 max-w-5xl mx-auto">
              {error}
            </div>
          )}

          {/* Overview Cards */}
          <div ref={overviewRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-5xl mx-auto">
            {stats && (
              <>
                <Card label="Total Users" value={stats.totalUsers} />
                <Card label="Travel Agents" value={stats.totalAgents} />
                <Card label="Bookings" value={stats.totalBookings} />
                <Card label="Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} />
              </>
            )}
          </div>

          {/* User Management */}
          <div ref={usersRef} className="bg-white rounded-lg shadow p-6 mb-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#01E8B2] mb-4">User Management</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.status}</td>
                    <td><button className="text-[#964734] hover:underline text-sm">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Agent Management */}
          <div ref={agentsRef} className="bg-white rounded-lg shadow p-6 mb-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#01E8B2] mb-4">Agent Management</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.status}</td>
                    <td><button className="text-[#964734] hover:underline text-sm">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Bookings */}
          <div ref={bookingsRef} className="bg-white rounded-lg shadow p-6 mb-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#01E8B2] mb-4">Recent Bookings</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="py-2">User</th>
                  <th>Package</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{b.user}</td>
                    <td>{b.package}</td>
                    <td>{b.date}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* System Activity */}
          <div ref={activityRef} className="bg-white rounded-lg shadow p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#01E8B2] mb-4">System Activity</h2>
            <ul className="space-y-2">
              {activity.map((a) => (
                <li key={a.id} className="flex justify-between text-gray-700">
                  <span>{a.action}</span>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 