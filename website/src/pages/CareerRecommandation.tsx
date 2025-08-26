import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Spinner from "../component/Spinner";

export default function App() {
  const [prompt, setPrompt] = useState<string>("");   // <-- fixed naming convention
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  async function search() {
    try {
      setLoading(true); // ✅ Move inside search so it's consistent
      let response = await fetch("https://vision-path-as7x.onrender.com/api/user/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      let jsonresponse = await response.json();
      console.log(jsonresponse);

      // Make sure your backend actually returns `data`
      setSuggestion(jsonresponse.data || "No suggestion found.");
    } catch (error) {
      console.error("❌ Error while fetching:", error);
    } finally {
      setLoading(false); // ✅ Ensure loading stops even on error
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-blue-900 to-black text-white">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        What should we build today?
      </h1>

      {/* Subheading */}
      <p className="text-gray-300 text-center mb-10">
        Create stunning apps & websites by chatting with AI.
      </p>

      {/* Input Box */}
      <div className="w-11/12 md:w-1/2 relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { // ✅ prevent accidental newline
              e.preventDefault();
              search();
              setPrompt("");
            }
          }}
          className="w-full h-32 md:h-40 p-4 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Type your idea and we'll build it together."
        />

        {/* Arrow button */}
        <button
          className="absolute bottom-3 right-3 p-3 bg-white rounded-full shadow-xl"
          onClick={() => {
            search();
            setPrompt("");
          }}
          disabled={loading || !prompt.trim()} // ✅ prevent empty requests
        >
          {loading ? <Spinner /> : <FaArrowUp color="black" size={18} />}
        </button>
      </div>

      {/* Suggestion Box */}
      {suggestion && (
        <div className="w-11/12 md:w-1/2 mt-6 p-4 bg-gray-800 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">AI Suggestion</h2>
          <p className="text-gray-200 whitespace-pre-line">{suggestion}</p>
        </div>
      )}

      {/* Import buttons */}
      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          Figma
        </button>
        <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          Github
        </button>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-blue-500 to-transparent rounded-t-full"></div>
    </div>
  );
}
