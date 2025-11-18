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
              <span className="text-xl font-bold">AllWheel</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              The ultimate random selection tool. Spin the wheel, draw numbers, or pick names 
              with our fast, fair, and easy-to-use platform.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/spin-wheel" className="hover:text-foreground transition-smooth">Wheel Spinner</Link></li>
              <li><Link to="/number-generator" className="hover:text-foreground transition-smooth">Number Draw</Link></li>
              <li><Link to="/name-picker" className="hover:text-foreground transition-smooth">Name Picker</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-smooth">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-smooth">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AllWheel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
