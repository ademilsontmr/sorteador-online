import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { blogPosts } from "@/data/blog-posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AllWheel Blog",
    "description": "Tips, guides, and insights about random selection, wheel spinners, and decision-making tools.",
    "url": "https://allwheel.click/blog",
    "publisher": {
      "@type": "Organization",
      "name": "AllWheel",
      "url": "https://allwheel.click"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Blog — Random Selection Tips & Guides"
        description="Discover tips, guides, and best practices for using random wheel spinners, number generators, and fair selection tools."
        canonical="https://allwheel.click/blog"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent gradient-primary">
              AllWheel Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and insights about random selection, wheel spinners, and decision-making tools.
            </p>
          </div>

          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="hover:text-primary transition-smooth"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-primary font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
