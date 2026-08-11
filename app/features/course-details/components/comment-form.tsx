"use client";

import { useRef, useActionState } from "react";
import { Send } from "lucide-react";
import { createComment } from "../actions";

export function CommentForm({ courseId }: { courseId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await createComment(courseId, formData);
      if (result.success) {
        formRef.current?.reset();
      }
      return result;
    },
    null,
  );

  return (
    <form ref={formRef} action={formAction} className="space-y-2">
      <div className="relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 transition-all">
        <div className="w-7 h-7 bg-blue-600 rounded-full shrink-0 text-white flex items-center justify-center text-xs font-bold mr-3">
          U
        </div>

        <input
          type="text"
          name="commentContent"
          placeholder="Fikringizni yozib qoldiring..."
          disabled={isPending}
          className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none pr-10 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={isPending}
          className="absolute right-4 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
        >
          <Send
            className={`w-4 h-4 ${isPending ? "animate-pulse text-blue-400" : ""}`}
          />
        </button>
      </div>

      {state?.error && (
        <p className="text-xs text-red-500 px-1">{state.error}</p>
      )}
    </form>
  );
}
