import { ChangeEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dices } from "lucide-react";
import { toast } from "sonner";

export const NumberDraw = () => {
  const [minInput, setMinInput] = useState("1");
  const [maxInput, setMaxInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("1");
  const [allowRepetition, setAllowRepetition] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<{ numbers: number[]; timestamp: string }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const min = minInput === "" ? 1 : Number(minInput);
  const max = maxInput === "" ? 100 : Number(maxInput);
  const quantity = quantityInput === "" ? 1 : Number(quantityInput);

  const drawNumbers = () => {
    if (min >= max) {
      toast.error("Minimum must be less than maximum!");
      return;
    }
    if (!allowRepetition && quantity > max - min + 1) {
      toast.error("Quantity exceeds available unique numbers!");
      return;
    }

    setIsDrawing(true);

    setTimeout(() => {
      const drawn: number[] = [];
      const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);

      for (let i = 0; i < quantity; i++) {
        if (allowRepetition) {
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          drawn.push(randomNum);
        } else {
          const randomIndex = Math.floor(Math.random() * available.length);
          drawn.push(available[randomIndex]);
          available.splice(randomIndex, 1);
        }
      }

      setResults(drawn);
      setHistory((prev) => [
        { numbers: drawn, timestamp: new Date().toISOString() },
        ...prev,
      ].slice(0, 10));
      setIsDrawing(false);
      toast.success(`Drew ${drawn.length} number${drawn.length > 1 ? "s" : ""}!`);
    }, 700);
  };

  const heroStats = useMemo(
    () => [
      { label: "Quantity", value: quantity },
      { label: "Duplicates", value: allowRepetition ? "Allowed" : "Unique" },
    ],
    [quantity, allowRepetition],
  );

  const handleNumericChange = (
    setter: (value: string) => void,
  ) => (event: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = event.target.value.replace(/[^\d]/g, "");
    setter(digitsOnly);
  };

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-3 py-1 text-primary">
            <Dices className="h-4 w-4 mr-1 inline" />
            Cryptographically secure random numbers
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Random Number Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate verifiable numbers for raffles, lottery simulators, queue ordering, or classroom exercises.
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

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-16 max-w-5xl mx-auto">
          <Card className="p-6 shadow-card space-y-6">
            <div>
              <Label className="text-sm font-semibold">Minimum value</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={minInput}
                onChange={handleNumericChange(setMinInput)}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">Maximum value</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={maxInput}
                onChange={handleNumericChange(setMaxInput)}
                placeholder="e.g. 99999"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">How many numbers?</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={quantityInput}
                onChange={handleNumericChange(setQuantityInput)}
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <div>
                <p className="font-semibold text-sm">Allow duplicates</p>
                <p className="text-xs text-muted-foreground">
                  Enable if you need numbers to repeat between draws.
                </p>
              </div>
              <Switch
                checked={allowRepetition}
                onCheckedChange={setAllowRepetition}
              />
            </div>

            <Button
              size="lg"
              className="w-full gradient-primary shadow-glow text-lg"
              onClick={drawNumbers}
              disabled={isDrawing}
            >
              <Dices className="h-5 w-5 mr-2" />
              {isDrawing ? "Drawing..." : "Draw Numbers"}
            </Button>
          </Card>

          <Card className="p-6 shadow-card h-full">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            {results.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Configure your range and quantity, then tap “Draw Numbers”.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {results.map((number, idx) => (
                  <span
                    key={`${number}-${idx}`}
                    className="text-2xl font-bold rounded-2xl bg-primary/10 text-primary px-4 py-2"
                  >
                    {number}
                  </span>
                ))}
              </div>
            )}
          </Card>

        </div>

        <Card className="p-6 shadow-card max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold">History (last 10)</h2>
                <p className="text-xs text-muted-foreground">Stored locally on this device</p>
              </div>
                <Button
                  variant="ghost"
                  className="text-xs"
                  onClick={() => setHistory([])}
                  disabled={history.length === 0}
                >
                  Clear
                </Button>
            </div>
            {history.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                Run your first draw to start the log.
              </div>
            ) : (
              <div className="space-y-2 text-sm text-muted-foreground max-h-56 overflow-auto pr-2">
                {history.map((draw, index) => {
                  const drawNumber = history.length - index;
                  const timestampLabel = new Date(draw.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <div
                      key={`${drawNumber}-${draw.numbers.join("-")}`}
                      className="border border-border/60 rounded-2xl bg-background/70 px-4 py-3"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground mb-1">
                        <span className="text-foreground text-sm font-semibold">Draw #{drawNumber}</span>
                        <span>{timestampLabel}</span>
                      </div>
                      <p className="text-foreground">
                        {draw.numbers.join(", ")}
                      </p>
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