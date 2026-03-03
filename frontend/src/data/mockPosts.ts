export type PostTag = "vent" | "meme" | "win" | "advice";

export interface Post {
  id: string;
  tag: PostTag;
  content: string;
  author: string | null; // null = anonymous
  upvotes: number;
  commentCount: number;
  createdAt: string;
}

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    tag: "vent",
    content:
      "Lost a $50k deal today. Spent 3 months nurturing this prospect — had exec alignment, ran a full POC, got buy-in from their IT team. They ghosted after the final demo. No reason, no reply. Just silence.",
    author: null,
    upvotes: 142,
    commentCount: 38,
    createdAt: "2h ago",
  },
  {
    id: "2",
    tag: "meme",
    content:
      "Prospect opened my email 47 times in one day and still hasn't replied 😭 Sir are you okay.",
    author: "closervibes",
    upvotes: 891,
    commentCount: 112,
    createdAt: "4h ago",
  },
  {
    id: "3",
    tag: "win",
    content:
      "CLOSED MY FIRST ENTERPRISE DEAL!! 🎉 18 month sales cycle, 6 stakeholders, 3 near-death moments. Never giving up is the only strategy that actually works.",
    author: "salesgremlin",
    upvotes: 604,
    commentCount: 89,
    createdAt: "6h ago",
  },
  {
    id: "4",
    tag: "advice",
    content:
      "What's your go-to strategy for re-engaging a ghosted prospect? I've tried the break-up email but it only works ~30% of the time. Looking for something fresh.",
    author: null,
    upvotes: 73,
    commentCount: 47,
    createdAt: "8h ago",
  },
  {
    id: "5",
    tag: "vent",
    content:
      "My manager wants a written update every morning at 8am on every deal in my pipeline. I have 90 accounts. I am not okay.",
    author: null,
    upvotes: 338,
    commentCount: 61,
    createdAt: "12h ago",
  },
  {
    id: "6",
    tag: "meme",
    content:
      "Me on Monday: I'm going to have the best prospecting week ever.\nMe on Friday: I got 2 voicemails, 1 out-of-office, and a 'not interested' from someone I've never emailed.",
    author: "dialfordays",
    upvotes: 1204,
    commentCount: 143,
    createdAt: "1d ago",
  },
  {
    id: "7",
    tag: "advice",
    content:
      "Genuine question — how do you mentally detach from rejection? Getting a 'no' used to roll off me but this quarter has been brutal and I'm starting to take it personally.",
    author: null,
    upvotes: 187,
    commentCount: 92,
    createdAt: "1d ago",
  },
  {
    id: "8",
    tag: "win",
    content:
      "Hit 150% of quota for the third quarter in a row. Two years ago I was about to quit sales entirely. Stay in the game.",
    author: "pipedreampat",
    upvotes: 976,
    commentCount: 74,
    createdAt: "2d ago",
  },
  {
    id: "9",
    tag: "vent",
    content:
      "Got a 'we went with a competitor' email today. Competitor is literally half the product at double the price. Buyer just liked their sales rep more. I need a drink.",
    author: null,
    upvotes: 259,
    commentCount: 55,
    createdAt: "2d ago",
  },
  {
    id: "10",
    tag: "meme",
    content:
      "The LinkedIn influencer: 'Rejection is just redirection! Every no gets you closer to a yes!' \n\nMe after 80 cold calls with zero connects: 😐",
    author: "quotacrusher",
    upvotes: 2341,
    commentCount: 217,
    createdAt: "3d ago",
  },
];
