import React, { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import { 
  getAgentStats, 
  getAgentPackages, 
  getAgentBookings, 
  getCustomerInquiries,
  createAgentPackage,
  deleteAgentPackage,
  AgentStats,
  AgentPackage,
  AgentBooking,
  CustomerInquiry
} from '@/lib/agentApi';

const Card = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <span className="text-2xl font-bold text-[#964734]">{value}</span>
    <span className="text-gray-600 mt-2">{label}</span>
  </div>
);

const AgentDashboard: React.FC = () => {
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [myPackages, setMyPackages] = useState<AgentPackage[]>([]);
  const [myBookings, setMyBookings] = useState<AgentBooking[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [newPackage, setNewPackage] = useState({ name: '', description: '', price: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addMsg, setAddMsg] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const overviewRef = useRef<HTMLDivElement>(null);
  const addPkgRef = useRef<HTMLDivElement>(null);
  const myPkgsRef = useRef<HTMLDivElement>(null);
  const bookingsRef = useRef<HTMLDivElement>(null);
  const inquiriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all agent data in parallel
        const [statsData, packagesData, bookingsData, inquiriesData] = await Promise.all([
          getAgentStats(),
          getAgentPackages(),
          getAgentBookings(),
          getCustomerInquiries()
        ]);

        setStats(statsData);
        setMyPackages(packagesData);
        setMyBookings(bookingsData);
        setInquiries(inquiriesData);
      } catch (err) {
        setError('Failed to load agent data. Using fallback data.');
        console.error('Agent data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentData();
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackage.name.trim()) {
      setAddMsg('Package name is required');
      return;
    }

    try {
      const createdPackage = await createAgentPackage({
        name: newPackage.name,
        description: newPackage.description,
        price: newPackage.price
      });
      
      setMyPackages([createdPackage, ...myPackages]);
      setNewPackage({ name: '', description: '', price: 0 });
      setAddMsg('Package added successfully!');
      setTimeout(() => setAddMsg(null), 1500);
    } catch (error) {
      setAddMsg('Failed to add package. Please try again.');
      console.error('Add package error:', error);
    }
  };

  const handleDeletePackage = async (id: number) => {
    try {
      await deleteAgentPackage(id);
      setMyPackages(myPackages.filter((p) => p.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('Delete package error:', error);
      setAddMsg('Failed to delete package. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#964734] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading agent dashboard...</p>
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
            <button onClick={() => scrollTo(addPkgRef)} className="text-[#964734] hover:underline text-left">Add Package</button>
            <button onClick={() => scrollTo(myPkgsRef)} className="text-[#964734] hover:underline text-left">My Packages</button>
            <button onClick={() => scrollTo(bookingsRef)} className="text-[#964734] hover:underline text-left">My Bookings</button>
            <button onClick={() => scrollTo(inquiriesRef)} className="text-[#964734] hover:underline text-left">Inquiries</button>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 px-2 md:px-0">
          <h1 className="text-4xl font-bold text-[#964734] mb-8 text-center">Travel Agent Dashboard</h1>
          
          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 max-w-4xl mx-auto">
              {error}
            </div>
          )}

          {/* Overview Cards */}
          <div ref={overviewRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
            {stats && (
              <>
                <Card label="Packages Managed" value={stats.packagesManaged} />
                <Card label="Bookings" value={stats.bookings} />
                <Card label="Earnings" value={`₹${stats.earnings.toLocaleString()}`} />
              </>
            )}
          </div>

          {/* Add Package Form */}
          <div ref={addPkgRef} className="bg-white rounded-lg shadow p-6 mb-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[#01E8B2] mb-4">Add Package</h2>
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Package Name"
                  className="border rounded px-3 py-2 flex-1"
                  value={newPackage.name}
                  onChange={e => setNewPackage({ ...newPackage, name: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border rounded px-3 py-2 w-32"
                  value={newPackage.price}
                  onChange={e => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
                />
              </div>
              <textarea
                placeholder="Package Description (optional)"
                className="border rounded px-3 py-2 w-full"
                rows={3}
                value={newPackage.description}
                onChange={e => setNewPackage({ ...newPackage, description: e.target.value })}
              />
              <button type="submit" className="bg-[#01E8B2] text-white px-6 py-2 rounded hover:bg-[#00d4a1]">
                Add Package
              </button>
            </form>
            {addMsg && (
              <div className={`mt-2 text-sm ${addMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {addMsg}
              </div>
            )}
          </div>

          {/* My Packages */}
          <div ref={myPkgsRef} className="bg-white rounded-lg shadow p-6 mb-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#01E8B2] mb-4">My Packages</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="py-2">Package Name</th>
                  <th>Status</th>
                  <th>Bookings</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myPackages.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{p.name}</td>
                    <td>{p.status}</td>
                    <td>{p.bookings}</td>
                    <td>
                      <button className="text-[#964734] hover:underline text-sm mr-2">Edit</button>
                      <button
                        className="text-red-600 hover:underline text-sm"
                        onClick={() => setDeleteId(p.id)}
                      >Delete</button>
                      {deleteId === p.id && (
                        <span className="ml-2">
                          Confirm?{' '}
                          <button
                            className="text-red-700 font-bold mr-1"
                            onClick={() => handleDeletePackage(p.id)}
                          >Yes</button>
                          <button
                            className="text-gray-500 underline"
                            onClick={() => setDeleteId(null)}
                          >No</button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* My Bookings */}
          <div ref={bookingsRef} className="bg-white rounded-lg shadow p-6 mb-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#01E8B2] mb-4">My Bookings</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="py-2">Customer</th>
                  <th>Package</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myBookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{b.customer}</td>
                    <td>{b.package}</td>
                    <td>{b.date}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer Inquiries */}
          <div ref={inquiriesRef} className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#01E8B2] mb-4">Customer Inquiries</h2>
            <ul className="space-y-2">
              {inquiries.map((i) => (
                <li key={i.id} className="flex justify-between text-gray-700">
                  <span><span className="font-semibold">{i.customer}:</span> {i.message}</span>
                  <span className="text-xs text-gray-400">{i.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard; 