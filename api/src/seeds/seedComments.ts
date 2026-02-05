import { Comment } from "../models/Comment";
import { commentsData } from "../data/dataComments";

export async function seedComments() {
  console.log("=== Seeding Comments ===");
  await Comment.bulkCreate(commentsData);
  console.log("Comments seeded !");
}

