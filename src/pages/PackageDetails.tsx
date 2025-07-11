import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPackageById, TravelPackageDto } from '@/lib/packagesApi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ArrowLeft, Star } from 'lucide-react';
import { useBookingAuth } from '@/hooks/useBookingAuth';
import LoginDialog from '@/components/auth/LoginDialog';

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pkg, setPkg] = useState<TravelPackageDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleBookNow, showLoginDialog, setShowLoginDialog, onAuthSuccess } = useBookingAuth();
  const isBookingIntent = searchParams.get('booking') === 'true';

  useEffect(() => {
    if (!id) return;
    fetchPackageById(Number(id))
      .then((data) => {
        setPkg(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Package not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading package details...</div>;
  }
  if (error || !pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Package Not Found</h2>
        <Button onClick={() => navigate(-1)} className="bg-[#01E8B2] text-white">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="flex items-center text-[#01E8B2] mb-6 hover:underline">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Packages
        </Link>
        <Card className="overflow-hidden shadow-xl">
          {pkg.image && (
            <div className="relative">
              <img src={pkg.image} alt={pkg.title} className="w-full h-96 object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">Featured</span>
                </div>
              </div>
            </div>
          )}
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{pkg.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{pkg.includeService}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-5 h-5" />
                <span className="text-lg">{pkg.duration} days</span>
              </div>
            </div>
            <p className="text-lg text-gray-700 mb-6">{pkg.description}</p>
            
            {pkg.highlights && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h3>
                <div className="bg-gradient-to-r from-[#01E8B2]/10 to-[#964734]/10 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{pkg.highlights}</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              <div>
                <span className="text-3xl font-bold text-[#964734]">₹{pkg.price}</span>
                <span className="text-gray-500 text-sm ml-2">per person</span>
              </div>
              <Button 
                className="bg-[#01E8B2] hover:bg-[#00d4a1] text-white px-8 py-3 text-lg font-semibold rounded-lg shadow"
                onClick={() => handleBookNow(pkg.packageId)}
              >
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Login Dialog for Booking Authentication */}
      {showLoginDialog && (
        <LoginDialog onAuthSuccess={onAuthSuccess}>
          <div style={{ display: 'none' }} />
        </LoginDialog>
      )}
    </div>
  );
};

export default PackageDetails; 