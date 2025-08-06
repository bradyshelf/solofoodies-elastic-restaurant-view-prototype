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
    isPaid?: boolean;
    price?: number;
  };
}

export const ColabInvitationCard = ({ colab }: ColabInvitationCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/colab/${colab.id}`);
  };

  return (
    <div className="space-y-2">
      <div 
        onClick={handleCardClick}
        className="cursor-pointer hover:scale-105 transition-transform duration-200"
      >
        <img 
          src="/lovable-uploads/d6aebf6a-5061-45f9-bff1-672043d5a31e.png" 
          alt="Collaboration invitation card"
          className="rounded-lg w-48 h-auto"
        />
      </div>
      {colab.isPaid && colab.price && (
        <div className="bg-green-100 border border-green-300 rounded-lg p-2 text-center">
          <span className="text-green-800 font-semibold">Paid Collaboration: {colab.price}€</span>
        </div>
      )}
    </div>
  );
};