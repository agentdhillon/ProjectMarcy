"use client";

import { useState } from "react";
import Link from "next/link";
import { PenLine } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { CreatePostModal } from "@/components/CreatePostModal";
import { MOCK_POSTS, type Post, type PostTag } from "@/data/mockPosts";

type Filter = PostTag | "all";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Vent", value: "vent" },
  { label: "Meme", value: "meme" },
  { label: "Win", value: "win" },
  { label: "Advice", value: "advice" },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false);

  const filtered =
    activeFilter === "all" ? posts : posts.filter((p) => p.tag === activeFilter);

  function handleNewPost(data: Omit<Post, "id" | "upvotes" | "commentCount" | "createdAt">) {
    setPosts((prev) => [
      { id: Date.now().toString(), ...data, upvotes: 0, commentCount: 0, createdAt: "just now" },
      ...prev,
    ]);
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Sticky nav */}
      <header className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight">
            Project<span className="text-marcy-500">Marcy</span>
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-marcy-500 hover:bg-marcy-600 text-sm font-medium transition-colors"
          >
            <PenLine size={14} />
            Post
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Filter pills */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.value
                  ? "bg-marcy-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-16 text-sm">
            No posts yet. Be the first to share.
          </p>
        )}
      </main>

      {showModal && (
        <CreatePostModal onClose={() => setShowModal(false)} onSubmit={handleNewPost} />
      )}
    </div>
  );
}
