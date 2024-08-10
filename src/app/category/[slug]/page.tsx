import { findCategoryBySlug } from "@/sanity/queries/category/findCategoryBySlug";
import { getPostsByCategoryId } from "@/sanity/queries/post/getPostsByCategoryId";
import { categoryDetailsSelection } from "@/sanity/selections/category-details";
import { postDetailsSelection } from "@/sanity/selections/post-details";
import { pick } from "@/sanity/selections/utils/pick";
import Link from "next/link";
import { notFound } from "next/navigation";

const CategoryPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const category = await findCategoryBySlug(
    slug,
    pick(categoryDetailsSelection, ["id", "title"])
  );
  if (!category) {
    notFound();
  }
  const posts = await getPostsByCategoryId(
    category.id,
    pick(postDetailsSelection, ["title", "slug"])
  );

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4">
      <p className="flex justify-center gap-4">{category.title}</p>
      <hr className="my-4 w-full border-t border-gray-300" />
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="before:content-['>'] before:mr-4"
          >
            <Link href={`/post/${post.slug}`} className="hover:underline">{post.title}</Link>
          </li>
        ))}
      </ul>
      <hr className="my-4 w-full border-t border-gray-300" />
      <p className="flex justify-center gap-4">
        <Link href="/" className="hover:underline">Back to Home</Link>
      </p>
    </div>
  );
};

export default CategoryPage;
