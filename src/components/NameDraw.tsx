import { useMemo, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Users, Shuffle, Volume2, VolumeX, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { soundManager } from "@/lib/sound";
import confetti from "canvas-confetti";
import mammoth from "mammoth";
import readXlsxFile from "read-excel-file";

export const NameDraw = () => {
  const [inputText, setInputText] = useState("Ana\nBruno\nCarla\nDiana\nEduardo\nFernanda");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[][]>([]);
  const [expandedHistoryIndex, setExpandedHistoryIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uniqueNames = useMemo(
    () =>
      Array.from(
        new Set(
          inputText
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        ),
      ),
    [inputText],
  );

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.name.split(".").pop()?.toLowerCase();

    try {
      let content = "";

      if (fileType === "txt" || fileType === "csv") {
        content = await file.text();
      } else if (fileType === "docx") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        content = result.value;
      } else if (fileType === "xlsx" || fileType === "xls") {
        const rows = await readXlsxFile(file);
        content = rows.flat().filter(Boolean).join("\n");
      } else if (fileType === "pages") {
        toast.error("O formato .pages (Apple) é fechado e não funciona em navegadores.", {
          description: "Por favor, abra o arquivo no Pages e vá em Arquivo > Exportar Para > Word ou Texto.",
          duration: 6000,
        });
        return;
      } else {
        toast.error("Formato não suportado.", {
          description: "Use .txt, .csv, .docx ou .xlsx.",
        });
        return;
      }

      // Clean up content: ensure one item per line
      const cleanContent = content
        .replace(/,/g, "\n") // Replace commas with newlines (for CSV)
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n");

      if (cleanContent) {
        setInputText((prev) => (prev ? `${prev}\n${cleanContent}` : cleanContent));
        toast.success("Lista importada com sucesso!");
      } else {
        toast.warning("Não foi possível encontrar texto no arquivo.");
      }
    } catch (error) {
      console.error("Erro ao ler arquivo:", error);
      toast.error("Erro ao processar o arquivo.", {
        description: "Verifique se o arquivo não está corrompido ou protegido por senha."
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input
      }
    }
  };

  const drawNames = () => {
    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const uniqueLines = Array.from(new Set(lines));

    if (uniqueLines.length === 0) {
      toast.error("Digite pelo menos um nome!");
      return;
    }

    if (quantity > uniqueLines.length) {
      toast.error("A quantidade ultrapassa os nomes disponíveis!");
      return;
    }

    setIsDrawing(true);
    setResults([]);

    setTimeout(() => {
      const available = [...uniqueLines];
      const drawn: string[] = [];

      for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        drawn.push(available[randomIndex]);
        available.splice(randomIndex, 1);
      }

      setResults(drawn);
      setHistory((prev) => [drawn, ...prev].slice(0, 10));
      setIsDrawing(false);

      // Play sound effects
      soundManager.playWin();
      soundManager.playApplause();

      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      toast.success(`${drawn.length} nome${drawn.length > 1 ? "s" : ""} selecionado${drawn.length > 1 ? "s" : ""}!`);
    }, 1000);
  };

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-4 py-1.5 text-success">
            <Users className="h-4 w-4 mr-1 inline" />
            Perfeito para salas e equipes
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Selecionador Aleatório de Nomes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Embaralhe listas de alunos, voluntários ou participantes de sorteios com transparência comprovada.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="rounded-full border border-border/70 px-4 py-2 bg-background/80">
              <span className="font-semibold text-foreground mr-2">{uniqueNames.length}</span>
              <span className="uppercase tracking-widest text-xs">Nomes carregados</span>
            </div>
            <div className="rounded-full border border-border/70 px-4 py-2 bg-background/80">
              <span className="font-semibold text-foreground mr-2">{quantity}</span>
              <span className="uppercase tracking-widest text-xs">Por sorteio</span>
            </div>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto p-8 shadow-card">

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="names-input">Digite nomes ou itens (um por linha)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground hidden sm:inline-block">
                    (.txt, .csv, .docx, .xlsx)
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.csv,.docx,.xlsx,.xls"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-3 w-3" />
                    Importar Lista
                  </Button>
                </div>
              </div>
              <Textarea
                id="names-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ana&#10;Bruno&#10;Carla&#10;Diana"
                className="mt-1 min-h-[200px] font-mono"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Para arquivos .pages (Apple), exporte como Word ou Texto antes de importar.
              </p>
            </div>

            <div>
              <Label htmlFor="pick-quantity">Quantos nomes sortear?</Label>
              <Input
                id="pick-quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <div className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-primary" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <p className="font-semibold text-sm">Efeitos sonoros</p>
                  <p className="text-xs text-muted-foreground">
                    Toque sons quando os nomes forem selecionados.
                  </p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            <Button
              onClick={drawNames}
              disabled={isDrawing}
              className="w-full bg-success hover:bg-success/90 text-success-foreground"
              size="lg"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              {isDrawing ? "Selecionando..." : "Sortear nomes"}
            </Button>

            {results.length > 0 && (
              <div className="mt-6 p-6 rounded-lg bg-success/10 border-2 border-success animate-bounce-in">
                <h3 className="text-lg font-semibold mb-3 text-center text-success">
                  Nomes selecionados
                </h3>
                <ul className="space-y-2">
                  {results.map((name, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-lg bg-background border border-success/20 text-center font-medium"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        <Card className="max-w-4xl mx-auto mt-10 p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold">Histórico (últimos 10)</h2>
              <p className="text-xs text-muted-foreground">Somente armazenado neste dispositivo</p>
            </div>
            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => {
                setHistory([]);
                setExpandedHistoryIndex(null);
              }}
              disabled={history.length === 0}
            >
              Limpar
            </Button>
          </div>
          {history.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              Execute um sorteio para começar a registrar os resultados.
            </div>
          ) : (
            <div className="space-y-2 text-sm text-muted-foreground max-h-56 overflow-auto pr-2">
              {history.map((draw, index) => {
                const drawNumber = history.length - index;
                const isExpanded = expandedHistoryIndex === drawNumber;
                return (
                  <div
                    key={`${drawNumber}-${draw.join("-")}`}
                    className="border border-border/60 rounded-2xl bg-background/70 px-4 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        className="font-semibold text-foreground text-left flex-1"
                        onClick={() =>
                          setExpandedHistoryIndex(isExpanded ? null : drawNumber)
                        }
                      >
                        Sorteio nº {drawNumber}
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {draw.length} selecionado{draw.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    {isExpanded && (
                      <p className="mt-2 text-foreground">{draw.join(", ")}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
