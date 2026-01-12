import { User } from "../models/User"
import { Chronicle } from "../models/Chronicle";
import { Comment } from "../models/Comment";

export async function testComment() {
  console.log("=== Test Comment ===");

  // 1. Create user
  const user = await User.create({
    username: "katia",
    email: "katia@test.com",
    password: "hash",
    is_active: true
  });

  // 2. Create chronicle
  const chronicle = await Chronicle.create({
    title: "Chronique test",
    content: "Contenu test",
    published_at: new Date(),
    slug: "chronique-test"
  });

  // 3. Create comment linked to both
  const comment = await Comment.create({
    content: "Super chronique",
    id_user: user.id_user,
    id_chronicle: chronicle.id_chronicle
  });

  console.log("Comment created:", comment.toJSON());
}
