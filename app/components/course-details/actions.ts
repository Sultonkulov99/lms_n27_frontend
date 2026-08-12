"use server";

import { revalidatePath } from "next/cache";

export async function createComment(courseId: string, formData: FormData) {
  const content = formData.get("commentContent") as string;

  if (!content || content.trim().length === 0) {
    return { error: "Fikringizni yozing..." };
  }

  try {
    console.log(`Kurs uchun fikr saqlanmoqda ${courseId}: ${content}`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    revalidatePath(`/courses/${courseId}`);

    return { success: true };
  } catch (error) {
    return { error: "Xatolik yuz berdi. Qaytadan urinib ko’ring." };
  }
}
