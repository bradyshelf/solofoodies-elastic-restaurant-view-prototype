
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleGoToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <MessageCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Chat</h1>
          <p className="text-gray-600">Click below to start chatting</p>
        </div>
        
        <Button 
          onClick={handleGoToChat}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg"
        >
          Go to Chat
        </Button>
      </div>
    </div>
  );
};

export default Index;
