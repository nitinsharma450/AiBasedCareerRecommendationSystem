import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Spinner from "../component/Spinner";
import { ApiConfigs } from "../lib/ApiConfigs";
import { AuthenticationService } from "../lib/AuthencationService";
import { useNavigate } from "react-router";
import { CgAttachment } from "react-icons/cg";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  let navigate = useNavigate();

  async function search() {
    try {
      if (!prompt.trim()) return;

      setLoading(true);

      // Add user message
      let newMessages = [...messages, { role: "user", content: prompt }];
      setMessages(newMessages);
      setPrompt("");

      let res = localStorage.getItem(ApiConfigs.userLocalStorage);
      let usableData: any;
      if (res) {
        usableData = JSON.parse(res);
      } else {
        console.log("No data found in localStorage");
      }

      if (await AuthenticationService.isAuthenticated()) {
        let response = await fetch("http://localhost:7777/api/user/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usableData.token}`,
          },
          body: JSON.stringify({ prompt }),
        });

        let jsonresponse = await response.json();
        console.log("✅ AI Response:", jsonresponse);

        // Append AI response
        setMessages([
          ...newMessages,
          { role: "ai", content: jsonresponse.data || "No response" },
        ]);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("❌ Error while fetching:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-blue-900 to-black text-white">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mt-10 text-center">
        {messages.length === 0 ? "How can I help you?" : ""}
      </h1>

      {/* Chat History */}
    {/* Chat History */}
<div className="flex-1 w-full flex flex-col items-center overflow-y-auto px-4 py-4">
  <div className="w-full md:w-1/2 flex flex-col gap-4 pb-40"> 
    {/* 👆 Added pb-40 (padding bottom) so messages stay visible */}
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`flex ${
          msg.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-md leading-relaxed text-sm ${
            msg.role === "user"
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-800 text-gray-100 rounded-bl-none"
          }`}
        >
          {/* Markdown renderer */}
          <div className="prose prose-sm max-w-none prose-invert">
            <ReactMarkdown
              components={{
                code({ inline, children }: any) {
                  return inline ? (
                    <code className="bg-black/50 px-1 py-0.5 rounded text-green-300 text-xs">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-black/80 text-green-300 p-3 rounded-lg overflow-x-auto text-xs">
                      <code>{children}</code>
                    </pre>
                  );
                },
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Input Box */}
      <div className="md:w-1/2 fixed bottom-4 left-1/2 transform -translate-x-1/2">
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

          {/* Hidden file input */}
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                console.log("Selected file:", e.target.files[0]);
              }
            }}
          />

          {/* File Upload Icon */}
          <label
            htmlFor="fileUpload"
            className="absolute bottom-3 right-14 p-3 bg-gray-800 rounded-full shadow-xl cursor-pointer hover:bg-gray-700 transition"
          >
            <CgAttachment />
          </label>

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
  );
}
