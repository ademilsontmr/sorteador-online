import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getPostBySlug, blogPosts } from "@/data/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.updated || post.date,
    "author": {
      "@type": "Organization",
      "name": "AllWheel"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AllWheel",
      "url": "https://allwheel.click"
    }
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3);

  const fallbackPosts =
    relatedPosts.length < 3
      ? blogPosts.filter((p) => p.slug !== post.slug && !relatedPosts.includes(p)).slice(0, 3 - relatedPosts.length)
      : [];

  const recommendedPosts = [...relatedPosts, ...fallbackPosts];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={post.title}
        description={post.description}
        canonical={`https://allwheel.click/blog/${post.slug}`}
        ogImage={post.image}
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {post.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
                p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                a: ({ href, children }) => (
                  <a href={href} className="text-primary hover:underline font-medium">
                    {children}
                  </a>
                ),
                img: ({ src, alt, ...props }) => (
                  <img
                    src={src}
                    alt={alt || ""}
                    loading="lazy"
                    decoding="async"
                    className="rounded-lg my-4 w-full h-auto"
                    {...props}
                  />
                ),
                strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {recommendedPosts.length > 0 && (
            <section className="mt-12 pt-10 border-t">
              <h2 className="text-2xl font-bold mb-4">Keep Reading</h2>
              <p className="text-muted-foreground mb-6">More hand-picked guides to level up your random selection workflow.</p>
              <div className="grid gap-6 md:grid-cols-3">
                {recommendedPosts.map((related) => (
                  <Link key={related.slug} to={`/blog/${related.slug}`} className="block rounded-2xl border border-border/70 p-5 shadow-sm hover:shadow-md transition-shadow h-full">
                    <p className="text-sm uppercase tracking-wide text-primary mb-2">{related.category}</p>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{related.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{related.description}</p>
                    <span className="text-primary font-semibold">Read article →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 pt-8 border-t">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
