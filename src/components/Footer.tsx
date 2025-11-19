import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="rounded-lg gradient-primary p-2">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Sorteador</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              A melhor suíte para seleções aleatórias. Gire a roleta, sorteie números ou escolha nomes
              com nossa plataforma rápida, justa e fácil de usar.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ferramentas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/roleta" className="hover:text-foreground transition-smooth">Roleta Aleatória</Link></li>
              <li><Link to="/gerador-de-numeros" className="hover:text-foreground transition-smooth">Sorteio de Números</Link></li>
              <li><Link to="/selecionador-de-nomes" className="hover:text-foreground transition-smooth">Selecionador de Nomes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacidade" className="hover:text-foreground transition-smooth">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-foreground transition-smooth">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sorteador. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
