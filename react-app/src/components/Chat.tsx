import { useState, useEffect } from "react";

type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  adId: string;
};

type ChatProps = {
  adId: string;
  sellerId: string;
  currentUserId: string;
  onClose: () => void;
};

const Chat = ({ adId, sellerId, currentUserId, onClose }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, [adId]);

  const fetchMessages = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch(`http://13.200.179.78/messages/${adId}`);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: currentUserId,
      receiverId: sellerId,
      message: newMessage,
      adId: adId,
      timestamp: new Date()
    };

    try {
      const response = await fetch('http://13.200.179.78/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });

      if (response.ok) {
        setMessages([...messages, { ...messageData, id: Date.now().toString() }]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading chat...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md h-96 flex flex-col rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Chat with Seller</h3>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-xs ${
                msg.senderId === currentUserId
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;