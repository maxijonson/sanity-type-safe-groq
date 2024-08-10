import { getCategories } from "@/sanity/queries/category/getCategories";
import { getPosts } from "@/sanity/queries/post/getPosts";
import { categoryDetailsSelection } from "@/sanity/selections/category-details";
import { postDetailsSelection } from "@/sanity/selections/post-details";
import { pick } from "@/sanity/selections/utils/pick";
import Link from "next/link";

const HomePage = async () => {
  const [posts, categories] = await Promise.all([
    getPosts(pick(postDetailsSelection, ["title", "slug"])),
    getCategories(pick(categoryDetailsSelection, ["title", "slug"])),
  ]);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4">
      <ul className="flex justify-center gap-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/category/${category.slug}`}
              className="hover:underline"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
      <hr className="my-4 w-full border-t border-gray-300" />
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug} className="before:content-['>'] before:mr-4">
            <Link href={`/post/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
