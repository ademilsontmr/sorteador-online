import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Users, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export const NameDraw = () => {
  const [inputText, setInputText] = useState("Alice\nBob\nCharlie\nDiana\nEthan\nFiona");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[][]>([]);
  const [expandedHistoryIndex, setExpandedHistoryIndex] = useState<number | null>(null);
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

  const drawNames = () => {
    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const uniqueLines = Array.from(new Set(lines));

    if (uniqueLines.length === 0) {
      toast.error("Please enter at least one name!");
      return;
    }

    if (quantity > uniqueLines.length) {
      toast.error("Quantity exceeds available names!");
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
      toast.success(`Selected ${drawn.length} name${drawn.length > 1 ? "s" : ""}!`);
    }, 1000);
  };

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-4 py-1.5 text-success">
            <Users className="h-4 w-4 mr-1 inline" />
            Classroom & team friendly
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Random Name Picker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Shuffle classroom rosters, volunteer lists, or giveaway entries with verifiable fairness.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="rounded-full border border-border/70 px-4 py-2 bg-background/80">
              <span className="font-semibold text-foreground mr-2">{uniqueNames.length}</span>
              <span className="uppercase tracking-widest text-xs">Names loaded</span>
            </div>
            <div className="rounded-full border border-border/70 px-4 py-2 bg-background/80">
              <span className="font-semibold text-foreground mr-2">{quantity}</span>
              <span className="uppercase tracking-widest text-xs">Pick per draw</span>
            </div>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto p-8 shadow-card">

          <div className="space-y-6">
            <div>
              <Label htmlFor="names-input">Enter names or items (one per line)</Label>
              <Textarea
                id="names-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana"
                className="mt-1 min-h-[200px] font-mono"
              />
            </div>

            <div>
              <Label htmlFor="pick-quantity">How many to pick?</Label>
              <Input
                id="pick-quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>

            <Button
              onClick={drawNames}
              disabled={isDrawing}
              className="w-full bg-success hover:bg-success/90 text-success-foreground"
              size="lg"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              {isDrawing ? "Selecting..." : "Pick Random"}
            </Button>

            {results.length > 0 && (
              <div className="mt-6 p-6 rounded-lg bg-success/10 border-2 border-success animate-bounce-in">
                <h3 className="text-lg font-semibold mb-3 text-center text-success">
                  Selected Names
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
              <h2 className="text-lg font-semibold">History (last 10)</h2>
              <p className="text-xs text-muted-foreground">Only stored on this device</p>
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
              Clear
            </Button>
          </div>
          {history.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              Run a draw to start logging results.
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
                        Draw #{drawNumber}
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {draw.length} selected
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
