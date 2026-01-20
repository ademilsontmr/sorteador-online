import { Link, useParams, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { blogPosts } from "@/data/blog-posts";
import { Calendar, Clock, Search, ChevronLeft, ChevronRight, BookOpen, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const { page } = useParams<{ page?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (location.pathname === '/blog' && !page) {
      navigate('/blog/pagina/1', { replace: true });
    }
  }, [location.pathname, page, navigate]);

  const currentPage = page ? parseInt(page, 10) : 1;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sorteador Blog",
    description: "Dicas, guias e insights sobre seleção aleatória, roletas e ferramentas de decisão.",
    url: "https://sorteador.click/blog",
    publisher: { "@type": "Organization", name: "Sorteador", url: "https://sorteador.click" }
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (!searchTerm) return true;
      return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > 1 && totalPages > 0 && currentPage > totalPages) {
      navigate('/blog/pagina/1', { replace: true });
    }
  }, [currentPage, totalPages, navigate]);

  if (currentPage < 1 || (currentPage > 1 && totalPages > 0 && currentPage > totalPages)) {
    return <Navigate to="/blog/pagina/1" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Blog Sorteador | Dicas, Tutoriais e Ideias de Sorteio"
        description="Confira artigos sobre como fazer sorteios justos, ideias para roletas, dicas de engajamento e tutoriais para usar nossas ferramentas."
        canonical="https://sorteador.click/blog"
        keywords="blog sorteador, dicas de sorteio, artigos sorteio, tutoriais roleta"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border/40 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                Blog
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Guias e Dicas sobre Sorteios
              </h1>
              <p className="text-muted-foreground text-lg">
                Aprenda a fazer sorteios justos e engajar sua audiência.
              </p>
              
              <div className="relative max-w-md mx-auto pt-4">
                <Search className="absolute left-4 top-1/2 mt-2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar artigos..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-11 h-12 rounded-xl border-border/60" 
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="max-w-6xl mx-auto">
            {paginatedPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium mb-2">Nenhum artigo encontrado</p>
                <p className="text-muted-foreground mb-6">Tente buscar por outro termo.</p>
                <Button onClick={() => setSearchTerm("")} variant="outline">Limpar busca</Button>
              </div>
            ) : (
              <>
                {/* Grid 3 colunas */}
                <div className="grid md:grid-cols-3 gap-6">
                  {paginatedPosts.map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                      <article className="h-full flex flex-col rounded-2xl border border-border/50 bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:bg-muted/30 transition-all duration-200">
                        <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/40">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readingTime} min
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" asChild disabled={currentPage === 1} className="gap-1">
                        <Link to={currentPage > 1 ? `/blog/pagina/${currentPage - 1}` : `/blog/pagina/1`}>
                          <ChevronLeft className="h-4 w-4" />Anterior
                        </Link>
                      </Button>
                      <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                          const showPage = pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
                          if (!showPage) {
                            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={pageNum} className="px-1 text-muted-foreground">···</span>;
                            }
                            return null;
                          }
                          return (
                            <Button key={pageNum} variant={pageNum === currentPage ? "default" : "ghost"} size="sm" asChild className="w-9 h-9">
                              <Link to={`/blog/pagina/${pageNum}`}>{pageNum}</Link>
                            </Button>
                          );
                        })}
                      </div>
                      <Button variant="ghost" size="sm" asChild disabled={currentPage === totalPages} className="gap-1">
                        <Link to={currentPage < totalPages ? `/blog/pagina/${currentPage + 1}` : `/blog/pagina/${totalPages}`}>
                          Próxima<ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{filteredPosts.length} artigos • Página {currentPage} de {totalPages}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
