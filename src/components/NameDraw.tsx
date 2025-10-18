import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Users, Shuffle } from "lucide-react";
import { toast } from "sonner";

export const NameDraw = () => {
  const [inputText, setInputText] = useState("Alice\nBob\nCharlie\nDiana\nEthan\nFiona");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

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
      setIsDrawing(false);
      toast.success(`Selected ${drawn.length} name${drawn.length > 1 ? "s" : ""}!`);
    }, 1000);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 shadow-card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
              <Users className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Random Name/List Draw</h2>
            <p className="text-muted-foreground">
              Pick random names or items from your list
            </p>
          </div>

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
      </div>
    </section>
  );
};
