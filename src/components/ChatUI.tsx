export type Message = {
  sender: 'user' | 'bot'; // or whatever your actual senders are
  text: string;
};

type ChatUIProps = {
  messages: Message[];
  loading: boolean;
};

export default function ChatUI({ messages, loading }: ChatUIProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-xs ${
              msg.sender === "user"
                ? "bg-gray-100 text-gray-900"
                : "bg-blue-100 text-gray-900"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="rounded-lg px-4 py-2 max-w-xs bg-blue-100 text-gray-900 opacity-50">
            Typing...
          </div>
        </div>
      )}
    </div>
  );
}
