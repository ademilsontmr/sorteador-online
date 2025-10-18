import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dices } from "lucide-react";
import { toast } from "sonner";

export const NumberDraw = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [allowRepetition, setAllowRepetition] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

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
    setResults([]);

    // Animate the drawing
    setTimeout(() => {
      const drawn: number[] = [];
      const available = Array.from(
        { length: max - min + 1 },
        (_, i) => min + i
      );

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
      setIsDrawing(false);
      toast.success(`Drew ${drawn.length} number${drawn.length > 1 ? "s" : ""}!`);
    }, 1000);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 shadow-card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-accent mb-4">
              <Dices className="h-8 w-8 text-accent-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Random Number Draw</h2>
            <p className="text-muted-foreground">
              Generate random numbers within a specified range
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min">Minimum</Label>
                <Input
                  id="min"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="max">Maximum</Label>
                <Input
                  id="max"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quantity">How many numbers?</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <Label htmlFor="repetition" className="cursor-pointer">
                Allow repetition
              </Label>
              <Switch
                id="repetition"
                checked={allowRepetition}
                onCheckedChange={setAllowRepetition}
              />
            </div>

            <Button
              onClick={drawNumbers}
              disabled={isDrawing}
              className="w-full gradient-accent shadow-glow hover:opacity-90"
              size="lg"
            >
              <Dices className="mr-2 h-5 w-5" />
              {isDrawing ? "Drawing..." : "Draw Numbers"}
            </Button>

            {results.length > 0 && (
              <div className="mt-6 p-6 rounded-lg bg-primary/10 border-2 border-primary animate-bounce-in">
                <h3 className="text-lg font-semibold mb-3 text-center">Results</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {results.map((num, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-glow"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};
