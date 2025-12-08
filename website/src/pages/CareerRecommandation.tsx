import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaBars } from "react-icons/fa";

import { ApiConfigs } from "../lib/ApiConfigs";

import { useNavigate } from "react-router";
import { CgAttachment } from "react-icons/cg";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
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

     
      
        let response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}user/search`, {
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
      
    } catch (error) {
      console.error("❌ Error while fetching:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-blue-950 to-black text-white relative">

    {/* NAVBAR */}
    <nav className="w-full fixed top-0 left-0 z-50 flex justify-between items-center p-4 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <h1 className="text-xl font-bold">AI Assistant</h1>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
        >
          Signup
        </button>
      </div>

      {/* Hamburger for mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
      >
        <FaBars size={20} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 right-4 bg-black/70 backdrop-blur-xl p-4 rounded-xl flex flex-col gap-3 border border-white/10 w-40 md:hidden"
        >
          <button
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Signup
          </button>
        </motion.div>
      )}
    </nav>

    {/* TOP HEADING */}
    {messages.length === 0 && (
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold mt-24 text-center tracking-wide"
      >
        How can I help you?
      </motion.h1>
    )}

    {/* CHAT HISTORY */}
    <div className="flex-1 w-full flex flex-col items-center overflow-y-auto px-3 py-4 scrollbar-thin mt-4">
      <div className="w-full md:w-1/2 flex flex-col gap-4 pb-44">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === "user" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-xl backdrop-blur-xl border border-white/10 text-sm leading-relaxed 
                ${msg.role === "user" ? "bg-blue-600/60 rounded-br-none" : "bg-gray-900/60 rounded-bl-none"}`}
            >
              <div className="prose prose-sm max-w-none prose-invert">
                <ReactMarkdown
                  components={{
                    code: ({ inline, children }: any) => {
                      return inline ? (
                        <code className="bg-black/40 px-1 py-0.5 rounded text-green-300 text-xs">
                          {children}
                        </code>
                      ) : (
                        <pre className="bg-black/60 text-green-300 p-3 rounded-lg overflow-x-auto text-xs">
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
          </motion.div>
        ))}
      </div>
    </div>

    {/* INPUT BAR */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full md:w-1/2 fixed bottom-4 left-1/2 -translate-x-1/2 px-3"
    >
      <div className="relative">

        {/* TEXTAREA */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              search();
            }
          }}
          className="w-full h-32 md:h-40 p-4 rounded-2xl bg-gray-900/80 border border-gray-700 
                     placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 resize-none shadow-2xl backdrop-blur"
          placeholder="Type your message..."
        />

        {/* FILE INPUT */}
        <input type="file" id="fileUpload" className="hidden" />

        {/* ATTACHMENT BUTTON */}
        <label
          htmlFor="fileUpload"
          className="absolute bottom-3 right-16 p-3 bg-gray-800/80 border border-gray-700 
                     rounded-full shadow-xl cursor-pointer hover:bg-gray-700 transition backdrop-blur-xl"
        >
          <CgAttachment size={20} />
        </label>

        {/* IMPROVED SEND BUTTON */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-3 right-3 p-4 bg-gradient-to-br from-blue-600 to-blue-400 
                     rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)]
                     transition active:scale-95"
          onClick={search}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <FaArrowUp size={20} color="white" />
          )}
        </motion.button>
      </div>
    </motion.div>
  </div>
);
}
