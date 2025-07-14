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
      className="relative w-64 h-48 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative h-full p-4 flex flex-col justify-between text-white">
        {/* Header */}
        <div>
          <h3 className="font-bold text-lg leading-tight mb-2">{colab.title}</h3>
          <div className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            COLLABORATION VISIT
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
              📸
            </div>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
              🍽️
            </div>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
              📱
            </div>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-medium">
              +3
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{colab.discount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};