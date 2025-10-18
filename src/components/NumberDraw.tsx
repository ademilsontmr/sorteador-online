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
      const available = Array.from({
        length: max - min + 1
      }, (_, i) => min + i);
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
  return <section className="py-12">
      <div className="container mx-auto px-4">
        
      </div>
    </section>;
};