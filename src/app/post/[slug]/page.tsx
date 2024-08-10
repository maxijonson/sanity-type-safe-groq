import { findPostBySlug } from "@/sanity/queries/post/findPostBySlug";
import { postDetailsSelection } from "@/sanity/selections/post-details";
import { pick } from "@/sanity/selections/utils/pick";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "./components/post-body";
import { GroqdParseError } from "groqd";

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await findPostBySlug(
    slug,
    pick(postDetailsSelection, ["title", "body"])
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4">
      <p className="flex justify-center gap-4">{post.title}</p>
      <hr className="my-4 w-full border-t border-gray-300" />
      <PostBody value={post.body} />
      <hr className="my-4 w-full border-t border-gray-300" />
      <p className="flex justify-center gap-4">
        <Link href="/" className="hover:underline">
          Back to Home
        </Link>
      </p>
    </div>
  );
};

export default PostPage;
