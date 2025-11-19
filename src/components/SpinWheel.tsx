import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play, Volume2, VolumeX, Trash2, Sparkles, Upload } from "lucide-react";
import { getWheelColor } from "@/lib/wheel-colors";
import { soundManager } from "@/lib/sound";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import mammoth from "mammoth";
import readXlsxFile from "read-excel-file";

interface WheelItem {
  text: string;
  color: string;
}

export const SpinWheel = () => {
  const [inputText, setInputText] = useState("Ana\nBruno\nCarla\nDiana\nEduardo\nFernanda");
  const [items, setItems] = useState<WheelItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [removeWinner, setRemoveWinner] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    parseItems(inputText);
  }, []);

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    drawWheel();
  }, [items, rotation]);

  const parseItems = (text: string) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const uniqueLines = Array.from(new Set(lines));

    const wheelItems = uniqueLines.map((line, index) => ({
      text: line,
      color: getWheelColor(index),
    }));

    setItems(wheelItems);
  };

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
        const newText = inputText ? `${inputText}\n${cleanContent}` : cleanContent;
        setInputText(newText);
        parseItems(newText);
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

  const heroStats = [
    { label: "Itens carregados", value: items.length },
    { label: "Sons", value: soundEnabled ? "Ativos" : "Silenciados" },
    { label: "Remover vencedores", value: removeWinner ? "Ativado" : "Desligado" },
  ];

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    const sliceAngle = (2 * Math.PI) / items.length;

    items.forEach((item, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      const textAngle = startAngle + sliceAngle / 2;
      ctx.rotate(textAngle);
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(item.text, radius * 0.65, 0);
      ctx.restore();
    });

    ctx.restore();

    // Draw pointer (right side, pointing inward like in the reference)
    ctx.beginPath();
    ctx.moveTo(centerX + radius + 20, centerY);
    ctx.lineTo(centerX + radius - 5, centerY - 15);
    ctx.lineTo(centerX + radius - 5, centerY + 15);
    ctx.closePath();
    ctx.fillStyle = "#3B82F6";
    ctx.fill();
    ctx.strokeStyle = "#1E40AF";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const spinWheel = () => {
    if (items.length < 2) {
      toast.error("Adicione pelo menos 2 itens para girar!");
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const entriesSnapshot = [...items];
    const randomSpin = 1800 + Math.random() * 1800; // 5-10 full rotations
    const sliceAngle = 360 / entriesSnapshot.length;
    const randomOffset = Math.random() * 360;
    const targetRotation = randomSpin + randomOffset;

    const duration = 4000;
    const startTime = Date.now();
    const startRotation = rotation;
    const finalRotationValue = startRotation + targetRotation;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + targetRotation * eased;

      setRotation(currentRotation % 360);

      // Play tick sound periodically
      if (Math.floor(currentRotation / 30) > Math.floor((currentRotation - 10) / 30)) {
        soundManager.playTick();
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const normalizedRotation = ((finalRotationValue % 360) + 360) % 360;
        const winningIndex =
          Math.floor(((360 - normalizedRotation) % 360) / sliceAngle) % entriesSnapshot.length;
        const winnerItem = entriesSnapshot[winningIndex];
        setWinner(winnerItem.text);
        setHistory((prev) => [winnerItem.text, ...prev].slice(0, 10));
        soundManager.playWin();
        soundManager.playApplause();

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setShowWinnerDialog(true);

        if (removeWinner) {
          const newText = inputText
            .split("\n")
            .filter((line) => line.trim() !== winnerItem.text)
            .join("\n");
          setInputText(newText);
          parseItems(newText);
        }
      }
    };

    animate();
  };

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <Badge className="px-4 py-1.5" variant="secondary">
            <Sparkles className="h-4 w-4 mr-1 inline" />
            Seleção aleatória justa e visual
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Gire a Roleta
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cadastre itens, gire e apresente vencedores verificáveis para sorteios, aulas, dinâmicas e transmissões.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-full border border-border/70 px-4 py-2 bg-background/80"
              >
                <span className="font-semibold text-foreground mr-2">{stat.value}</span>
                <span className="uppercase tracking-widest text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Wheel Canvas */}
          <Card className="p-6 shadow-card">
            <div className="flex flex-col items-center gap-6">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="max-w-full"
              />

              <div className="flex gap-3 w-full">
                <Button
                  onClick={spinWheel}
                  disabled={isSpinning || items.length < 2}
                  size="lg"
                  className="flex-1 gradient-primary shadow-glow hover:opacity-90"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {isSpinning ? "Girando..." : "Girar!"}
                </Button>

                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  size="lg"
                  variant="outline"
                >
                  {soundEnabled ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </Button>
              </div>

            </div>
          </Card>

          {/* Input Panel */}
          <Card className="p-6 shadow-card">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="items-input" className="text-lg font-semibold">
                    Digite os itens (um por linha)
                  </Label>
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
                      Importar
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="items-input"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    parseItems(e.target.value);
                  }}
                  placeholder="Ana&#10;Bruno&#10;Carla&#10;Diana"
                  className="mt-2 min-h-[300px] font-mono"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Para arquivos .pages (Apple), exporte como Word ou Texto antes de importar.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <Label htmlFor="remove-winner" className="cursor-pointer">
                  Remover vencedor após girar
                </Label>
                <Switch
                  id="remove-winner"
                  checked={removeWinner}
                  onCheckedChange={setRemoveWinner}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setInputText("");
                    setItems([]);
                    setWinner(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Limpar tudo
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>{items.length}</strong> itens carregados
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto mt-10 p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold">Histórico (últimos 10)</h2>
              <p className="text-xs text-muted-foreground">Guardado localmente neste navegador</p>
            </div>
            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => setHistory([])}
              disabled={history.length === 0}
            >
              Limpar
            </Button>
          </div>
          {history.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              Gire a roleta para registrar os vencedores.
            </div>
          ) : (
            <ul className="space-y-2 text-sm text-muted-foreground max-h-56 overflow-auto pr-2">
              {history.map((entry, index) => (
                <li
                  key={`${entry}-${index}`}
                  className="flex items-center justify-between border border-border/60 rounded-2xl px-4 py-2 bg-background/70"
                >
                  <span className="font-semibold text-foreground">Giro nº {history.length - index}</span>
                  <span className="text-foreground">{entry}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Winner Dialog */}
        <Dialog open={showWinnerDialog} onOpenChange={setShowWinnerDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-3xl text-center">🎉 Parabéns! 🎉</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="text-6xl animate-bounce">🏆</div>
              <p className="text-2xl font-bold text-center">{winner}</p>
              <p className="text-lg text-muted-foreground text-center">é o vencedor!</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
