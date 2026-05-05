import { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { trpc } from "@/providers/trpc";
import { Link } from "react-router";

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const { data, isLoading } = trpc.search.global.useQuery(
    { query },
    { enabled: query.length >= 2 }
  );

  return (
    <div className="fixed inset-0 z-[100] bg-[rgba(8,8,8,0.97)] backdrop-blur-md flex flex-col items-center pt-32 px-6">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-[#A1A1AA] hover:text-white transition-colors"
      >
        <FiX size={32} />
      </button>

      <div className="w-full max-w-3xl relative">
        <FiSearch
          size={24}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[#3F3F46]"
        />
        <input
          type="text"
          autoFocus
          placeholder="Search projects, articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-b-2 border-[#3F3F46] focus:border-[#C9A87C] text-white text-3xl font-[var(--font-display)] py-4 pl-10 pr-4 outline-none transition-colors placeholder:text-[#3F3F46]"
        />
      </div>

      {query.length >= 2 && (
        <div className="w-full max-w-3xl mt-12 max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <p className="text-[#A1A1AA] text-center">Searching...</p>
          )}
          {data && (
            <>
              {data.projects.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-4">
                    Projects
                  </h3>
                  {data.projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/portfolio/${project.slug}`}
                      onClick={onClose}
                      className="block py-3 border-b border-[#3F3F46]/50 hover:border-[#C9A87C]/50 transition-colors group"
                    >
                      <p className="text-white font-[var(--font-display)] text-xl group-hover:text-[#C9A87C] transition-colors">
                        {project.name}
                      </p>
                      <p className="text-sm text-[#A1A1AA] mt-1">
                        {project.location} —{" "}
                        <span className="text-[#C9A87C] uppercase text-xs tracking-wider">
                          {project.category}
                        </span>
                      </p>
                    </Link>
                  ))}
                </div>
              )}
              {data.blogPosts.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-4">
                    Blog Posts
                  </h3>
                  {data.blogPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      onClick={onClose}
                      className="block py-3 border-b border-[#3F3F46]/50 hover:border-[#C9A87C]/50 transition-colors group"
                    >
                      <p className="text-white font-[var(--font-display)] text-xl group-hover:text-[#C9A87C] transition-colors">
                        {post.title}
                      </p>
                      <p className="text-sm text-[#A1A1AA] mt-1 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
              {data.projects.length === 0 && data.blogPosts.length === 0 && (
                <p className="text-[#A1A1AA] text-center mt-8">
                  No results found for "{query}"
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
