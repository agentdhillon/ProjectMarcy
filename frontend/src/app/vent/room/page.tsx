"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";

interface Message {
  id: string;
  text: string;
  mine: boolean;
  ts: string;
}

const ROOM_ID = "vent-room";

export default function VentRoomPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineCount, setOnlineCount] = useState(1);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    connectSocket();
    const socket = getSocket();

    socket.emit("join_room", { room_id: ROOM_ID });

    socket.on("new_message", (data: { content: string }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: data.content, mine: false, ts: "just now" },
      ]);
    });

    socket.on("room_user_count", (data: { room_id: string; count: number }) => {
      if (data.room_id === ROOM_ID) setOnlineCount(data.count);
    });

    return () => {
      socket.emit("leave_room", { room_id: ROOM_ID });
      socket.off("new_message");
      socket.off("room_user_count");
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    getSocket().emit("send_message", { room_id: ROOM_ID, content: text });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, mine: true, ts: "just now" },
    ]);
    setInput("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/vent")}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <Link href="/" className="font-bold text-base tracking-tight">
            Project<span className="text-marcy-500">Marcy</span>
          </Link>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {onlineCount} venting now
          </span>
        </div>
      </header>

      {/* Subtitle */}
      <div className="max-w-2xl mx-auto w-full px-4 pt-5 pb-2">
        <p className="text-gray-600 text-sm">
          You&apos;re not alone. Vent freely — everyone here is anonymous.
        </p>
      </div>

      {/* Messages */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-2 flex flex-col gap-2 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-center text-gray-700 text-sm py-16">
            Be the first to say something.
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-0.5 ${msg.mine ? "items-end" : "items-start"}`}
          >
            <span className="text-[11px] text-gray-600 px-1">
              {msg.mine ? "You" : "Anonymous"} · {msg.ts}
            </span>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.mine
                  ? "bg-marcy-500/20 text-marcy-100 rounded-br-sm"
                  : "bg-gray-800 text-gray-200 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-gray-950 border-t border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something... (Enter to send)"
            rows={1}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-marcy-500 transition-colors max-h-28"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-marcy-500 hover:bg-marcy-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            aria-label="Send"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
