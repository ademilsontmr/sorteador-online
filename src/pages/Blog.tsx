import { Link, useParams, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { blogPosts } from "@/data/blog-posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Filter, Search, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
const POSTS_PER_PAGE = 10;

const Blog = () => {
  const { page } = useParams<{ page?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Redirect /blog to /blog/page/1 if no page param
  useEffect(() => {
    if (location.pathname === '/blog' && !page) {
      navigate('/blog/page/1', { replace: true });
    }
  }, [location.pathname, page, navigate]);
  
  const currentPage = page ? parseInt(page, 10) : 1;

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

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      const matchesSearch = searchTerm
        ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const prevFiltersRef = useRef({ category: selectedCategory, search: searchTerm });
  
  // Reset to page 1 when filters change
  useEffect(() => {
    const filtersChanged = 
      prevFiltersRef.current.category !== selectedCategory || 
      prevFiltersRef.current.search !== searchTerm;
    
    if (filtersChanged && currentPage > 1) {
      navigate('/blog/page/1', { replace: false });
    }
    
    prevFiltersRef.current = { category: selectedCategory, search: searchTerm };
  }, [selectedCategory, searchTerm, currentPage, navigate]);
  
  // Redirect to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > 1 && totalPages > 0 && currentPage > totalPages) {
      navigate('/blog/page/1', { replace: true });
    }
  }, [currentPage, totalPages, navigate]);

  // Redirect to page 1 if invalid page number
  if (currentPage < 1 || (currentPage > 1 && totalPages > 0 && currentPage > totalPages)) {
    return <Navigate to="/blog/page/1" replace />;
  }

  const resetFilters = () => {
    setSelectedCategory(null);
    setSearchTerm("");
    navigate('/blog/page/1', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={currentPage > 1 ? `Blog — Page ${currentPage} | Random Selection Tips & Guides` : "Blog — Random Selection Tips & Guides"}
        description="Discover tips, guides, and best practices for using random wheel spinners, number generators, and fair selection tools."
        canonical={currentPage > 1 ? `https://allwheel.click/blog/page/${currentPage}` : "https://allwheel.click/blog"}
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <section className="mb-10">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary/70 px-6 py-12 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
              <div className="relative z-10 text-center max-w-4xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Fairness, randomness & decision science
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Random Selection Tips & Insights
                </h1>
                <p className="text-lg text-white/90">
                  Deep dives, use cases, and trend reports about wheel spinners, number generators, and decision-making workflows—curated by the AllWheel team.
                </p>
                <div className="pt-4 text-sm uppercase tracking-[0.3em] text-white/70">
                  Curated insights for teachers, ops teams, and creators
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10 rounded-3xl border border-border/60 bg-card shadow-sm p-6 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-1/2 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
                <Input
                  placeholder="Search articles by keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-12 rounded-2xl border-border/70 transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <button
                  className="text-primary font-semibold hover:underline text-sm"
                  onClick={resetFilters}
                >
                  Clear filters
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Topics</p>
                <span className="text-xs text-muted-foreground">
                  Tap a chip to filter — tap again to clear
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(isActive ? null : category)}
                      className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-[0_10px_25px_rgba(99,102,241,0.25)]"
                          : "border-border hover:border-primary/60"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {paginatedPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No articles found</p>
              <Button onClick={resetFilters} variant="outline">
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-8">
                {paginatedPosts.map((post) => (
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

              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      disabled={currentPage === 1}
                    >
                      <Link to={currentPage > 1 ? `/blog/page/${currentPage - 1}` : `/blog/page/1`}>
                        <ChevronLeft className="h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                        if (!showPage) {
                          // Show ellipsis
                          if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                            return (
                              <span key={pageNum} className="px-2 text-muted-foreground">
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? "default" : "outline"}
                            size="sm"
                            asChild
                          >
                            <Link to={`/blog/page/${pageNum}`}>
                              {pageNum}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      disabled={currentPage === totalPages}
                    >
                      <Link
                        to={
                          currentPage < totalPages
                            ? `/blog/page/${currentPage + 1}`
                            : `/blog/page/${totalPages}`
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} • Showing {startIndex + 1}–{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
