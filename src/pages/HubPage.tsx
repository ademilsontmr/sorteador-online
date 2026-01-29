import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, Users, Dices, Trophy, Briefcase, GraduationCap, Share2, Lightbulb } from "lucide-react";

const clusters = [
  {
    id: 'roleta',
    title: 'Roleta Online',
    description: 'Ferramenta principal para sorteios e decisões aleatórias',
    icon: <Grid3X3 className="h-8 w-8" />,
    pilar: '/blog/guia-completo-roleta-2026',
    color: 'bg-blue-500',
    posts: 85,
    examples: [
      'Roleta online grátis',
      'Roleta com animação',
      'Roleta para sorteios',
      'Roleta profissional'
    ]
  },
  {
    id: 'gerador',
    title: 'Gerador de Números',
    description: 'Geração aleatória segura e verificável',
    icon: <Dices className="h-8 w-8" />,
    pilar: '/blog/guia-completo-gerador-numeros-aleatorios',
    color: 'bg-green-500',
    posts: 35,
    examples: [
      'Gerador instantâneo',
      'Múltiplos números',
      'Sem duplicados',
      'Loterias'
    ]
  },
  {
    id: 'selecionador',
    title: 'Selecionador de Nomes',
    description: 'Sorteio justo de listas e participantes',
    icon: <Users className="h-8 w-8" />,
    pilar: '/blog/guia-completo-selecionador-nomes-2026',
    color: 'bg-purple-500',
    posts: 22,
    examples: [
      'Sorteio de nomes',
      'Times aleatórios',
      'Apresentações',
      'Multilíngue'
    ]
  },
  {
    id: 'jogos',
    title: 'Jogos e Loterias',
    description: 'Simuladores e criadores de jogos online',
    icon: <Trophy className="h-8 w-8" />,
    pilar: '/blog/tendencias-sorteios-jogos-online-2026',
    color: 'bg-yellow-500',
    posts: 22,
    examples: [
      'Mega-Sena',
      'Lotofácil',
      'Quina',
      'Bolões'
    ]
  },
  {
    id: 'enterprise',
    title: 'Empresarial',
    description: 'Soluções para times e corporações',
    icon: <Briefcase className="h-8 w-8" />,
    pilar: '/blog/enterprise-randomizer-governance-2026',
    color: 'bg-red-500',
    posts: 6,
    examples: [
      'Governança',
      'Team building',
      'Compliance',
      'Apresentações'
    ]
  },
  {
    id: 'education',
    title: 'Educação',
    description: 'Ferramentas para professores e alunos',
    icon: <GraduationCap className="h-8 w-8" />,
    pilar: '/blog/hybrid-team-randomizer-playbook-2026',
    color: 'bg-indigo-500',
    posts: 10,
    examples: [
      'Dinâmicas',
      'Apresentações',
      'Grupos',
      'Sorteios justos'
    ]
  },
  {
    id: 'social',
    title: 'Redes Sociais',
    description: 'Sorteios para Instagram, YouTube e WhatsApp',
    icon: <Share2 className="h-8 w-8" />,
    pilar: '/blog/como-fazer-sorteio-instagram-gratis-seguro-2026',
    color: 'bg-pink-500',
    posts: 12,
    examples: [
      'Instagram',
      'YouTube',
      'WhatsApp',
      'Comentários'
    ]
  },
  {
    id: 'events',
    title: 'Eventos e Rifas',
    description: 'Organização de sorteios e eventos especiais',
    icon: <Lightbulb className="h-8 w-8" />,
    pilar: '/blog/como-fazer-rifa-online-beneficente-legal',
    color: 'bg-orange-500',
    posts: 11,
    examples: [
      'Amigo secreto',
      'Rifas',
      'Casamento',
      'Natal'
    ]
  }
];

const useCases = [
  'Para sorteios justos e transparentes',
  'Para decisões rápidas e imparciais',
  'Para dinâmicas em sala de aula',
  'Para team building corporativo',
  'Para eventos e celebrações',
  'Para jogos e entretenimento'
];

const HubPage = () => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Central de Ferramentas - Sorteador"
        description="Explore todas as ferramentas de sorteio aleatório: roletas, geradores de números, selecionadores de nomes e mais."
        canonical="https://sorteador.click/ferramentas/"
        keywords="ferramentas de sorteio, roleta, gerador de números, selecionador de nomes, sorteio online"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Central de Ferramentas de Sorteio</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Encontre a ferramenta perfeita para sua necessidade. Desde sorteios simples até soluções corporativas.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {useCases.map((useCase, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Clusters Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Explore por Categoria</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clusters.map((cluster) => (
                <Card 
                  key={cluster.id}
                  className={`p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    selectedCluster === cluster.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCluster(cluster.id === selectedCluster ? null : cluster.id)}
                >
                  <div className="flex items-center mb-4">
                    <div className={`${cluster.color} text-white p-3 rounded-lg mr-3`}>
                      {cluster.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{cluster.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {cluster.posts} posts
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{cluster.description}</p>
                  
                  {selectedCluster === cluster.id && (
                    <div className="space-y-2">
                      <p className="font-medium text-sm mb-2">Recursos populares:</p>
                      {cluster.examples.map((example, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          {example}
                        </div>
                      ))}
                      <Link to={cluster.pilar}>
                        <Button className="w-full mt-4" size="sm">
                          Ver guia completo
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ações Rápidas</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 text-center">
                <Grid3X3 className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold mb-2">Criar Roleta</h3>
                <p className="text-gray-600 mb-4">Comece agora com nossa ferramenta principal</p>
                <Link to="/roleta">
                  <Button className="w-full">Abrir Roleta</Button>
                </Link>
              </Card>
              
              <Card className="p-6 text-center">
                <Dices className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold mb-2">Gerar Números</h3>
                <p className="text-gray-600 mb-4">Sorteie números aleatórios seguros</p>
                <Link to="/gerador-de-numeros">
                  <Button className="w-full">Gerar Números</Button>
                </Link>
              </Card>
              
              <Card className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="font-semibold mb-2">Sortear Nomes</h3>
                <p className="text-gray-600 mb-4">Escolha participantes aleatoriamente</p>
                <Link to="/selecionador-de-nomes">
                  <Button className="w-full">Sortear Nomes</Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default HubPage;
