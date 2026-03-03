"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronUp, MessageCircle, ArrowLeft, Send } from "lucide-react";
import { MOCK_POSTS, MOCK_COMMENTS, type Comment, type PostTag } from "@/data/mockPosts";

const TAG_STYLES: Record<PostTag, string> = {
  vent: "bg-orange-900/40 text-orange-300 border-orange-800/60",
  meme: "bg-purple-900/40 text-purple-300 border-purple-800/60",
  win: "bg-emerald-900/40 text-emerald-300 border-emerald-800/60",
  advice: "bg-blue-900/40 text-blue-300 border-blue-800/60",
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const post = MOCK_POSTS.find((p) => p.id === id);

  const [upvotes, setUpvotes] = useState(post?.upvotes ?? 0);
  const [voted, setVoted] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    MOCK_COMMENTS.filter((c) => c.postId === id)
  );
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [username, setUsername] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4 text-gray-500">
        <p className="text-sm">Post not found.</p>
        <Link href="/feed" className="text-marcy-500 hover:underline text-sm">
          Back to feed
        </Link>
      </div>
    );
  }

  function handleUpvote() {
    setUpvotes((u) => (voted ? u - 1 : u + 1));
    setVoted((v) => !v);
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      postId: id,
      content: commentText.trim(),
      author: isAnonymous ? null : (username.trim() || null),
      createdAt: "just now",
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-gray-700">·</span>
          <Link href="/" className="font-bold text-base tracking-tight">
            Project<span className="text-marcy-500">Marcy</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Full post */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 flex gap-4">
          <div className="flex flex-col items-center gap-1 pt-0.5 min-w-[2.5rem]">
            <button
              onClick={handleUpvote}
              className={`p-1 rounded-md transition-colors ${
                voted
                  ? "text-marcy-500 bg-marcy-500/10"
                  : "text-gray-500 hover:text-marcy-400 hover:bg-gray-800"
              }`}
              aria-label="Upvote"
            >
              <ChevronUp size={18} strokeWidth={2.5} />
            </button>
            <span className={`text-sm font-semibold tabular-nums ${voted ? "text-marcy-500" : "text-gray-400"}`}>
              {upvotes >= 1000 ? `${(upvotes / 1000).toFixed(1)}k` : upvotes}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLES[post.tag]}`}>
                {post.tag}
              </span>
              <span>{post.author ? `@${post.author}` : "Anonymous"}</span>
              <span className="text-gray-700">·</span>
              <span className="text-gray-600">{post.createdAt}</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
            <div className="flex items-center gap-1 mt-3 text-gray-600 text-xs">
              <MessageCircle size={12} />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Comments
          </h2>

          {/* Add comment form */}
          <form onSubmit={handleAddComment} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-marcy-500 transition-colors"
            />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={isAnonymous}
                  onClick={() => setIsAnonymous((v) => !v)}
                  className={`relative w-8 h-4 rounded-full transition-colors flex-shrink-0 ${isAnonymous ? "bg-marcy-500" : "bg-gray-700"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isAnonymous ? "" : "translate-x-4"}`}
                  />
                </button>
                {isAnonymous ? (
                  <span className="text-xs text-gray-500">Anonymous</span>
                ) : (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-marcy-500 transition-colors w-32"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={!commentText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-marcy-500 hover:bg-marcy-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-colors"
              >
                <Send size={12} />
                Post
              </button>
            </div>
          </form>

          {/* Comment list */}
          {comments.length > 0 ? (
            <div className="flex flex-col gap-2">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
                    <span className="text-gray-500">
                      {comment.author ? `@${comment.author}` : "Anonymous"}
                    </span>
                    <span className="text-gray-700">·</span>
                    <span>{comment.createdAt}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8 text-sm">
              No comments yet. Start the conversation.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
