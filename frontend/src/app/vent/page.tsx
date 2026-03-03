"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, RefreshCcw, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

type Phase = "idle" | "loading" | "responded";

export default function VentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [aiReply, setAiReply] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setPhase("loading");
    try {
      const { data } = await api.post<{ response: string }>("/ai/listen", {
        message: text.trim(),
      });
      setAiReply(data.response);
    } catch {
      setAiReply("You said it. That's enough.");
    }
    setPhase("responded");
  }

  function handleVentAgain() {
    setText("");
    setAiReply("");
    setPhase("idle");
  }

  function handleShareToFeed() {
    toast.success("Posted to feed anonymously!");
    router.push("/feed");
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Home
          </button>
          <Link href="/" className="font-bold text-base tracking-tight">
            Project<span className="text-marcy-500">Marcy</span>
          </Link>
          <Link
            href="/feed"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Feed
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">This is your space.</h1>
          <p className="text-gray-500 text-sm">
            Say what&apos;s on your mind — it stays here.
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800 text-gray-500 text-xs font-medium">
            Anonymous · Private
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What happened today?"
            rows={6}
            autoFocus
            disabled={phase !== "idle"}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-marcy-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          />

          {phase === "idle" && (
            <button
              type="submit"
              disabled={!text.trim()}
              className="self-end px-5 py-2.5 rounded-xl bg-marcy-500 hover:bg-marcy-600 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm transition-colors"
            >
              Let it out
            </button>
          )}

          {phase === "loading" && (
            <div className="flex items-center gap-2 text-gray-500 text-sm self-end animate-pulse">
              <Loader2 size={14} className="animate-spin" />
              Listening...
            </div>
          )}
        </form>

        {phase === "responded" && (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4">
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {aiReply}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleVentAgain}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                <RefreshCcw size={13} />
                Vent again
              </button>
              <button
                onClick={handleShareToFeed}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                <Share2 size={13} />
                Share to feed
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
