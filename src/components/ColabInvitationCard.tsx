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
      className="relative w-72 h-24 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=150&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative h-full p-3 flex flex-col justify-between text-white">
        {/* Top section with title and price */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-sm leading-tight text-white mb-1">{colab.title}</h3>
          </div>
          <div className="text-right ml-2">
            <div className="text-lg font-bold text-white">{colab.discount}</div>
          </div>
        </div>

        {/* Blue badge */}
        <div className="mb-2">
          <div className="inline-flex items-center bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
            <span className="mr-1">🔹</span>
            COLLABORATION VISIT
          </div>
        </div>

        {/* Bottom section with circles and +3 */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">1</div>
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">2</div>
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">3</div>
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">4</div>
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">5</div>
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">6</div>
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">7</div>
          </div>
          <div className="flex items-center text-xs text-white">
            <span className="mr-1">👤</span>
            <span>+3</span>
          </div>
        </div>
      </div>
    </div>
  );
};