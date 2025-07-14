import { MapPin, Users, Calendar, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ColabInvitationCardProps {
  colab: {
    id: number;
    title: string;
    description: string;
    location: string;
    maxParticipants: string;
    dateRange: string;
    discount: string;
    schedule: string;
  };
}

export const ColabInvitationCard = ({ colab }: ColabInvitationCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/colab/${colab.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="relative w-64 h-48 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-orange-400 to-red-500"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative h-full p-4 flex flex-col justify-between text-white">
        {/* Header */}
        <div>
          <div className="inline-flex items-center bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium mb-2">
            <Users className="w-3 h-3 mr-1" />
            COLLABORATION
          </div>
          <h3 className="font-bold text-lg leading-tight">{colab.title}</h3>
        </div>

        {/* Details */}
        <div className="space-y-1">
          <div className="flex items-center text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{colab.location}</span>
          </div>
          <div className="flex items-center text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{colab.dateRange}</span>
          </div>
          <div className="flex items-center text-xs">
            <Percent className="w-3 h-3 mr-1" />
            <span>{colab.discount}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">📸</span>
            </div>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">🍽️</span>
            </div>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{colab.discount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};