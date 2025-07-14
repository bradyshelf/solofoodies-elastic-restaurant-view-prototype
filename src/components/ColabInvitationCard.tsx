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
      className="relative w-64 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative h-full p-3 flex flex-col justify-between text-white">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-base leading-tight mb-1">{colab.title}</h3>
            <div className="inline-flex items-center bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
              🔹 COLLABORATION VISIT
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{colab.discount}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
              1
            </div>
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
              2
            </div>
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
              3
            </div>
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
              4
            </div>
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
              5
            </div>
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
              6
            </div>
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs">
              7
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <span>👥</span>
            <span>+3</span>
          </div>
        </div>
      </div>
    </div>
  );
};