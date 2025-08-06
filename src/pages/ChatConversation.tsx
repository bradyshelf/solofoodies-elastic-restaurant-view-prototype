

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Plus, Euro, Check, X, Search, MapPin, Users, Calendar, Percent, Clock, UserPlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColabInvitationCard } from '@/components/ColabInvitationCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'offer' | 'colab-invitation';
  offerAmount?: number;
  showButtons?: boolean;
  offerStatus?: 'pending' | 'accepted' | 'rejected';
  colabData?: {
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

const ChatConversation = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [isCounteroffer, setIsCounteroffer] = useState(false);
  const [maxOfferAmount, setMaxOfferAmount] = useState<number | null>(null);
  const [lastBotOffer, setLastBotOffer] = useState<number | null>(null);
  const [showRejectWarning, setShowRejectWarning] = useState(false);
  const [pendingRejectMessageId, setPendingRejectMessageId] = useState<number | null>(null);
  const [showColabSelector, setShowColabSelector] = useState(false);
  const [showPaidColabDialog, setShowPaidColabDialog] = useState(false);
  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [selectedColabForInvite, setSelectedColabForInvite] = useState<number | null>(null);
  const [colabPrice, setColabPrice] = useState('50');

  // Mock active collaborations - in real app this would come from API
  const activeColabs = [
    { 
      id: 1, 
      title: "Colaboración", 
      description: "Colaboración para promocionar nuestro nuevo menú mediterráneo",
      location: "Valencia, Madrid",
      maxParticipants: "3 acompañantes máx.",
      dateRange: "14/01/24 - 14/02/24",
      discount: "20%",
      schedule: "lunes, martes, miércoles",
      date: "31/12/23"
    },
    { 
      id: 2, 
      title: "Colaboración", 
      description: "Colaboración exclusiva para influencers de cocina catalana",
      location: "Barcelona",
      maxParticipants: "2 acompañantes máx.",
      dateRange: "15/02/24 - 15/03/24",
      discount: "50€",
      schedule: "viernes, sábado, domingo",
      date: "09/01/24"
    },
  ];

  // Mock chat user data - in a real app this would come from an API
  const chatUser = {
    username: '@UserInstagram',
    avatar: '/lovable-uploads/af4f172b-c1c6-4c8b-916f-423ef933eeaa.png'
  };

  const handleBack = () => {
    navigate('/chat');
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // Send first auto-reply after a short delay
      setTimeout(() => {
        const firstAutoReply: Message = {
          id: Date.now() + 1,
          text: "Thanks for your message!",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, firstAutoReply]);

        // Send second auto-reply after another delay
        setTimeout(() => {
          const secondAutoReply: Message = {
            id: Date.now() + 2,
            text: "This is an automated response. We'll get back to you soon!",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, secondAutoReply]);
        }, 1500);
      }, 1000);
    }
  };

  const handleInviteToColab = () => {
    setShowColabSelector(true);
  };

  const handleSelectColab = (colabId: number) => {
    setSelectedColabForInvite(colabId);
    setShowColabSelector(false);
    setShowPaidColabDialog(true);
  };

  const handleCreateFreeColab = () => {
    if (selectedColabForInvite) {
      const selectedColab = activeColabs.find(colab => colab.id === selectedColabForInvite);
      if (selectedColab) {
        createColabInvitation(selectedColab, false);
      }
    }
    setShowPaidColabDialog(false);
    setSelectedColabForInvite(null);
  };

  const handleCreatePaidColab = () => {
    if (selectedColabForInvite) {
      const selectedColab = activeColabs.find(colab => colab.id === selectedColabForInvite);
      if (selectedColab) {
        createColabInvitation(selectedColab, true, parseFloat(colabPrice));
      }
    }
    setShowPriceDialog(false);
    setSelectedColabForInvite(null);
  };

  const createColabInvitation = (selectedColab: any, isPaid: boolean, price?: number) => {
    // Send colab invitation card as a message
    const invitationMessage: Message = {
      id: Date.now(),
      text: `You invited to collaborate`,
      isUser: true,
      timestamp: new Date(),
      type: 'colab-invitation',
      colabData: {
        ...selectedColab,
        isPaid,
        price
      }
    };
    
    setMessages(prev => [...prev, invitationMessage]);

    // Send automated 100 euro offer response after delay
    setTimeout(() => {
      const autoOffer: Message = {
        id: Date.now() + 1,
        text: `Counter offer for 100€`,
        isUser: false,
        timestamp: new Date(),
        type: 'offer',
        offerAmount: 100,
        showButtons: true
      };
      setMessages(prev => [...prev, autoOffer]);
      setLastBotOffer(100);
    }, 2000);
  };

  const handleCounteroffer = (originalAmount: number) => {
    setIsCounteroffer(true);
    setMaxOfferAmount(originalAmount);
    setOfferAmount(originalAmount.toString());
    setShowOfferDialog(true);
  };

  const handleSendOffer = () => {
    if (offerAmount.trim()) {
      // Disable buttons on previous offers
      setMessages(prev => prev.map(msg => 
        msg.type === 'offer' ? { ...msg, showButtons: false } : msg
      ));

      const offerMessage: Message = {
        id: Date.now(),
        text: `Offer for ${offerAmount}€`,
        isUser: true,
        timestamp: new Date(),
        type: 'offer',
        offerAmount: parseFloat(offerAmount),
        showButtons: false // User offers don't show buttons
      };
      
      setMessages(prev => [...prev, offerMessage]);
      setOfferAmount('');
      setShowOfferDialog(false);

      // Send automated counter offer after a delay
      setTimeout(() => {
        const userOfferAmount = parseFloat(offerAmount);
        let counterOfferAmount;
        
        if (lastBotOffer !== null) {
          // Calculate halfway point between last bot offer and current user offer
          counterOfferAmount = (lastBotOffer + userOfferAmount) / 2;
        } else {
          // For first offer, start with 70% of user's offer
          counterOfferAmount = userOfferAmount * 0.7;
        }
        
        // Round to nearest euro
        counterOfferAmount = Math.round(counterOfferAmount);
        
        const counterOffer: Message = {
          id: Date.now() + 1,
          text: `Counter offer for ${counterOfferAmount}€`,
          isUser: false,
          timestamp: new Date(),
          type: 'offer',
          offerAmount: counterOfferAmount,
          showButtons: true // Received offers show buttons
        };
        setMessages(prev => [...prev, counterOffer]);
        setLastBotOffer(counterOfferAmount);
      }, 2000);
    }
  };

  const handleAcceptOffer = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, showButtons: false, offerStatus: 'accepted' } : msg
    ));
  };

  const handleRejectOffer = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, showButtons: false, offerStatus: 'rejected' } : msg
    ));
  };

  const handleShowRejectWarning = (messageId: number) => {
    setPendingRejectMessageId(messageId);
    setShowRejectWarning(true);
  };

  const handleConfirmReject = () => {
    if (pendingRejectMessageId) {
      handleRejectOffer(pendingRejectMessageId);
    }
    setShowRejectWarning(false);
    setPendingRejectMessageId(null);
  };

  const handleRejectWarningCounteroffer = () => {
    setShowRejectWarning(false);
    if (pendingRejectMessageId) {
      const message = messages.find(msg => msg.id === pendingRejectMessageId);
      if (message?.offerAmount) {
        handleCounteroffer(message.offerAmount);
      }
    }
    setPendingRejectMessageId(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit',
        year: '2-digit'
      });
    }
  };

  // Helper function to determine if we should show timestamp
  const shouldShowTimestamp = (currentIndex: number) => {
    if (currentIndex === messages.length - 1) return true; // Always show on last message
    
    const currentMessage = messages[currentIndex];
    const nextMessage = messages[currentIndex + 1];
    
    // Show timestamp if next message is from different sender
    return currentMessage.isUser !== nextMessage.isUser;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <Avatar className="w-8 h-8">
            <AvatarImage src={chatUser.avatar} alt={chatUser.username} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-900">{chatUser.username}</span>
        </div>
        <button>
          <div className="w-6 h-6 text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            Start a conversation!
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id} className="space-y-1">
              <div
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'offer' ? (
                  <div className="max-w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="text-center mb-3">
                      <div className="text-gray-600 text-sm mb-1">Offer for</div>
                      <div className="text-2xl font-bold text-gray-900">{message.offerAmount}€</div>
                    </div>
                    {message.showButtons ? (
                      <div className="flex flex-col space-y-2">
                        <Button 
                          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg px-6 py-3"
                          onClick={() => handleAcceptOffer(message.id)}
                        >
                          Accept
                        </Button>
                        <Button 
                          className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg px-6 py-3"
                          onClick={() => handleShowRejectWarning(message.id)}
                        >
                          Reject
                        </Button>
                        <Button 
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-3"
                          onClick={() => handleCounteroffer(message.offerAmount!)}
                        >
                          Counter
                        </Button>
                      </div>
                    ) : message.offerStatus && (
                      <div className="flex items-center justify-center space-x-2 text-sm font-medium">
                        {message.offerStatus === 'accepted' ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Offer accepted</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-red-600" />
                            <span className="text-red-600">Offer rejected</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : message.type === 'colab-invitation' ? (
                  <div className="max-w-full">
                    <div className="mb-2 text-sm text-gray-600">{message.text}</div>
                    {message.colabData && <ColabInvitationCard colab={message.colabData} />}
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                )}
              </div>
              {shouldShowTimestamp(index) && (
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-400 px-2">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-2 w-10 h-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-48">
              <DropdownMenuItem 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={handleInviteToColab}
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite to Colab</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-full border-gray-300 px-4 py-2"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 w-10 h-10"
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Offer Dialog */}
      <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isCounteroffer ? 'Make a Counteroffer' : 'Make an Offer'}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              step="5"
              min="0"
              placeholder="Enter amount"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              className="flex-1"
            />
            <span className="text-gray-500">€</span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOfferDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendOffer} disabled={!offerAmount.trim()}>
              Send Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Warning Dialog */}
      <Dialog open={showRejectWarning} onOpenChange={setShowRejectWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Offer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              This action cannot be undone. Rejecting this offer will end the collaboration opportunity.
            </p>
            <p className="text-gray-600">
              Are you sure you don't want to make a counter offer instead?
            </p>
          </div>
          <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowRejectWarning(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRejectWarningCounteroffer}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
            >
              Counter Offer
            </Button>
            <Button 
              onClick={handleConfirmReject}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Reject & End Colab
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Colab Selector Dialog */}
      <Dialog open={showColabSelector} onOpenChange={setShowColabSelector}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">COLABORACIONES</DialogTitle>
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4">Colaboraciones Activas ({activeColabs.length})</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activeColabs.map((colab) => (
                <div 
                  key={colab.id}
                  onClick={() => handleSelectColab(colab.id)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors relative"
                >
                  <div className="absolute top-4 right-4 text-xs text-gray-400">
                    {colab.date}
                  </div>
                  
                  <div className="pr-16">
                    <h4 className="font-semibold text-gray-900 mb-2">{colab.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{colab.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{colab.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{colab.maxParticipants}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{colab.dateRange}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Percent className="w-4 h-4 mr-2" />
                        <span>{colab.discount}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{colab.schedule}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter className="border-t border-gray-200 pt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3"
              disabled
            >
              + Crear colaboración
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowColabSelector(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Paid Collaboration Dialog */}
      <Dialog open={showPaidColabDialog} onOpenChange={setShowPaidColabDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Collaboration Type</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Do you want this to be a paid collaboration?
            </p>
          </div>
          <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              onClick={handleCreateFreeColab}
              className="w-full sm:w-auto"
            >
              No, Free Collaboration
            </Button>
            <Button 
              onClick={() => {
                setShowPaidColabDialog(false);
                setShowPriceDialog(true);
              }}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
            >
              Yes, Set Price
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Price Setting Dialog */}
      <Dialog open={showPriceDialog} onOpenChange={setShowPriceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Collaboration Price</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              What price do you want to set for this collaboration?
            </p>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                step="5"
                min="0"
                placeholder="Enter price"
                value={colabPrice}
                onChange={(e) => setColabPrice(e.target.value)}
                className="flex-1"
              />
              <span className="text-gray-500">€</span>
            </div>
          </div>
          <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowPriceDialog(false);
                setSelectedColabForInvite(null);
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreatePaidColab}
              disabled={!colabPrice.trim()}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
            >
              Create Paid Collaboration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatConversation;

