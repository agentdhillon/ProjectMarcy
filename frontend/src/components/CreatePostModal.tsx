"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { type Post, type PostTag } from "@/data/mockPosts";

const TAGS: { value: PostTag; label: string; activeClass: string }[] = [
  { value: "vent", label: "Vent", activeClass: "bg-orange-900/40 text-orange-300 border-orange-800/60" },
  { value: "meme", label: "Meme", activeClass: "bg-purple-900/40 text-purple-300 border-purple-800/60" },
  { value: "win", label: "Win", activeClass: "bg-emerald-900/40 text-emerald-300 border-emerald-800/60" },
  { value: "advice", label: "Advice", activeClass: "bg-blue-900/40 text-blue-300 border-blue-800/60" },
];

interface Props {
  onClose: () => void;
  onSubmit: (data: Omit<Post, "id" | "upvotes" | "commentCount" | "createdAt">) => void;
}

export function CreatePostModal({ onClose, onSubmit }: Props) {
  const [tag, setTag] = useState<PostTag>("vent");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [username, setUsername] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ tag, content: content.trim(), author: isAnonymous ? null : (username.trim() || null) });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h2 className="font-semibold text-white">Create a post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {TAGS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTag(t.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border transition-colors ${
                  tag === t.value
                    ? t.activeClass
                    : "bg-gray-800 text-gray-500 border-gray-700 hover:text-gray-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            autoFocus
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-marcy-500 transition-colors"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={isAnonymous}
              onClick={() => setIsAnonymous((v) => !v)}
              className={`relative w-9 h-5 rounded-full transition-colors ${isAnonymous ? "bg-marcy-500" : "bg-gray-700"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isAnonymous ? "" : "translate-x-4"}`}
              />
            </button>
            <span className="text-sm text-gray-400">Post anonymously</span>
          </div>

          {!isAnonymous && (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username (optional)"
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-marcy-500 transition-colors"
            />
          )}

          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full py-2.5 rounded-xl bg-marcy-500 hover:bg-marcy-600 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm transition-colors"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
