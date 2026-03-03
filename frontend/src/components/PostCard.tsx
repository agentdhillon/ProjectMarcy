"use client";

import { useState } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";
import { type Post, type PostTag } from "@/data/mockPosts";

const TAG_STYLES: Record<PostTag, string> = {
  vent: "bg-orange-900/40 text-orange-300 border-orange-800/60",
  meme: "bg-purple-900/40 text-purple-300 border-purple-800/60",
  win: "bg-emerald-900/40 text-emerald-300 border-emerald-800/60",
  advice: "bg-blue-900/40 text-blue-300 border-blue-800/60",
};

export function PostCard({ post }: { post: Post }) {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [voted, setVoted] = useState(false);

  function handleUpvote() {
    setUpvotes((u) => (voted ? u - 1 : u + 1));
    setVoted((v) => !v);
  }

  return (
    <article className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex gap-4 hover:border-gray-700 transition-colors cursor-pointer">
      {/* Vote column */}
      <div className="flex flex-col items-center gap-1 pt-0.5 min-w-[2.5rem]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUpvote();
          }}
          className={`p-1 rounded-md transition-colors ${
            voted
              ? "text-marcy-500 bg-marcy-500/10"
              : "text-gray-500 hover:text-marcy-400 hover:bg-gray-800"
          }`}
          aria-label="Upvote"
        >
          <ChevronUp size={18} strokeWidth={2.5} />
        </button>
        <span
          className={`text-sm font-semibold tabular-nums ${
            voted ? "text-marcy-500" : "text-gray-400"
          }`}
        >
          {upvotes >= 1000 ? `${(upvotes / 1000).toFixed(1)}k` : upvotes}
        </span>
      </div>

      {/* Content column */}
      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLES[post.tag]}`}
          >
            {post.tag}
          </span>
          <span className="text-gray-500">
            {post.author ? `@${post.author}` : "Anonymous"}
          </span>
          <span className="text-gray-700">·</span>
          <span className="text-gray-600">{post.createdAt}</span>
        </div>

        {/* Post content */}
        <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 whitespace-pre-line">
          {post.content}
        </p>

        {/* Footer row */}
        <div className="flex items-center gap-1 mt-2 text-gray-600 text-xs hover:text-gray-400 transition-colors w-fit">
          <MessageCircle size={12} />
          <span>{post.commentCount} comments</span>
        </div>
      </div>
    </article>
  );
}
