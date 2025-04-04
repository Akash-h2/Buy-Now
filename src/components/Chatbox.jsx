import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const answerRef = useRef(null);

    const generateAnswer = async () => {
        if (!question.trim()) return;
        setAnswer("Generating... ⏳");

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                { contents: [{ parts: [{ text: question }] }] }
            );

            setAnswer(response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.");
        } catch (error) {
            setAnswer("⚠️ Error fetching response. Please try again.");
            console.error(error);
        }
    };

    useEffect(() => {
        if (answerRef.current) {
            answerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [answer]);

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                🤖
            </button>

            {/* Chatbox Panel */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-80 bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-gray-700 z-50">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-center">Get Suggestions</h2>
                        <button className="text-red-400 hover:text-red-600" onClick={() => setIsOpen(false)}>
                            ✖
                        </button>
                    </div>

                    <textarea
                        className="w-full p-2 rounded bg-gray-800 text-white text-sm mt-2 outline-none"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask me anything..."
                        rows={3}
                    ></textarea>

                    <button
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                        onClick={generateAnswer}
                    >
                        Get Answer 🚀
                    </button>

                    <div className="mt-2 p-2 bg-gray-800 rounded text-sm max-h-40 overflow-y-auto">
                        <p ref={answerRef}>{answer || "Ask something to get a response."}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbox;
