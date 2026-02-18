import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TravelPackageDto } from '@/lib/packagesApi';

interface PackageCardProps {
  pkg: TravelPackageDto;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        {pkg.image && (
          <img src={pkg.image} alt={pkg.title} className="w-full h-64 object-cover" />
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-800">Featured</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
        
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{pkg.includeService}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{pkg.duration} days</span>
          </div>
        </div>
        
        <div className="mb-4 text-gray-700 text-sm">
          {pkg.description}
        </div>
        
        {pkg.highlights && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
            <p className="text-sm text-gray-600">{pkg.highlights}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-6 pb-6 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-[#964734]">₹{pkg.price}</span>
          <span className="text-gray-500 text-sm ml-1">per person</span>
        </div>
        <Link to={`/packages/${pkg.packageId}`}>
          <Button className="bg-[#01E8B2] hover:bg-[#00d4a1] text-white">
            View Package
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PackageCard; 