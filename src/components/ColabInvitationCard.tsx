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
      className="cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <img 
        src="/lovable-uploads/d6aebf6a-5061-45f9-bff1-672043d5a31e.png" 
        alt="Collaboration invitation card"
        className="rounded-lg w-48 h-auto"
      />
    </div>
  );
};