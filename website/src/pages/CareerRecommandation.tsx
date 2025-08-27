import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Spinner from "../component/Spinner";

export default function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  async function search() {
    try {
      if (!prompt.trim()) return;

      setLoading(true);

      // Add user message
      let newMessages = [...messages, { role: "user", content: prompt }];
      setMessages(newMessages);
      setPrompt(""); // clear input immediately

      // Send to backend
      let response = await fetch("https://vision-path-as7x.onrender.com/api/user/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      let jsonresponse = await response.json();
      console.log("✅ AI Response:", jsonresponse);

      // Append AI response
      setMessages([
        ...newMessages,
        { role: "ai", content: jsonresponse.data || "No response" },
      ]);
    } catch (error) {
      console.error("❌ Error while fetching:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-blue-900 to-black text-white">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mt-10 text-center">
          {messages.length === 0 ? "How can I help you?" : ""}
        </h1>

        {/* Chat History */}
        <div className="flex-1 w-full mb-100 flex flex-col items-center overflow-y-auto px-4 py-2">
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            {messages.map((msg, i) => {
              // Detect code block in AI response
              const codeMatch = msg.content.match(/```([\s\S]*?)```/);

              return (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[75%] break-words whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {/* Render code block prettily */}
                    {codeMatch ? (
                      <pre className="bg-black text-green-400 p-3 rounded-lg overflow-x-auto text-sm">
                        <code>{codeMatch[1]}</code>
                      </pre>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input Box */}
        <div className=" md:w-1/2 fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  search();
                }
              }}
              className="w-full h-32 md:h-40 p-4 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type your idea and we'll build it together."
            />

            {/* Arrow button */}
            <button
              className="absolute bottom-3 right-3 p-3 bg-white rounded-full shadow-xl"
              onClick={search}
              disabled={loading || !prompt.trim()}
            >
              {loading ? <Spinner /> : <FaArrowUp color="black" size={18} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
