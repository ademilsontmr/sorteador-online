import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { AdSense } from "@/components/AdSense";
import { getPostBySlug, blogPosts } from "@/data/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

const CTA_VARIANTS = {
  wheel: {
    eyebrow: "Spin the wheel",
    title: "Need a fair wheel for your next decision?",
    description:
      "Launch the AllWheel spinner to run giveaways, pick winners, or make quick team choices with transparent randomness.",
    href: "/spin-wheel",
    ctaLabel: "Open Wheel Spinner",
  },
  numbers: {
    eyebrow: "Generate secure numbers",
    title: "Want verifiable random numbers in seconds?",
    description:
      "Use the Random Number Generator to create cryptographically secure results for lotteries, raffles, or research.",
    href: "/number-generator",
    ctaLabel: "Use Number Generator",
  },
  names: {
    eyebrow: "Pick names & teams",
    title: "Ready to select names or form balanced teams?",
    description:
      "Try the Name Picker to draw students, assign duties, and organize teams with audit-ready fairness.",
    href: "/name-picker",
    ctaLabel: "Launch Name Picker",
  },
};

const getCtaForPost = (post: { slug: string; category: string; tags: string[] }) => {
  const haystack = `${post.slug} ${post.category} ${post.tags.join(" ")}`.toLowerCase();

  if (haystack.includes("number") || haystack.includes("rng") || haystack.includes("lottery")) {
    return CTA_VARIANTS.numbers;
  }

  if (
    haystack.includes("name") ||
    haystack.includes("team") ||
    haystack.includes("classroom") ||
    haystack.includes("picker")
  ) {
    return CTA_VARIANTS.names;
  }

  return CTA_VARIANTS.wheel;
};

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
  const cta = getCtaForPost(post);

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

          <section className="mt-10 rounded-3xl border border-border/70 bg-card shadow-card p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{cta.eyebrow}</p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{cta.title}</h2>
                <p className="text-muted-foreground">{cta.description}</p>
              </div>
              <Button size="lg" className="w-full md:w-auto font-semibold" asChild>
                <Link to={cta.href}>{cta.ctaLabel}</Link>
              </Button>
            </div>
          </section>

          {/* AdSense - After article content */}
          <div className="my-8 flex justify-center">
            <AdSense
              adSlot="YOUR_AD_SLOT_ID"
              adFormat="auto"
              fullWidthResponsive={true}
              className="min-h-[250px]"
            />
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
