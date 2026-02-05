import { Comment } from "../models/Comment";
import { commentsData } from "../data/dataComments";

export async function seedComments() {
     console.log("=== Seeding Comments ===");
  for (const c of commentsData) {
    await Comment.create(c);
  }
}
