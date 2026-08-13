import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { CommentForm } from "./comment-form";

const COMMENTS_MOCK = [
  {
    id: "c1",
    author: "Xurshid Istamov",
    avatarLetter: "X",
    text: "Assalomu aleykum. Jonli efir yaxshi bo‘lyapti. Faqat ovoz yaxshi eshitilmayapti!",
    likes: 125,
    time: "Yaqinda",
  },
];

export function CommentsSection({ courseId }: { courseId: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-bold text-gray-900">
        Muhokamalar soni: {COMMENTS_MOCK.length + 24} ta
      </h3>

      <CommentForm courseId={courseId} />

      <div className="space-y-5 pt-2">
        {COMMENTS_MOCK.map((comment) => (
          <div key={comment.id} className="flex gap-3 items-start group">
            <div className="w-9 h-9 bg-amber-500 rounded-full shrink-0 text-white flex items-center justify-center font-semibold text-sm">
              {comment.avatarLetter}
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">
                  {comment.author}
                </span>
                <span className="text-[11px] text-gray-400">
                  {comment.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {comment.text}
              </p>

              <div className="flex items-center gap-4 pt-1 text-xs text-gray-400">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Javob berish</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
