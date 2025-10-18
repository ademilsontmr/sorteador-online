# AllWheel - Random Wheel & Number/Name Picker

A production-ready web application for random selections: spin the wheel, draw numbers, or pick names. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### 1. **Animated Wheel Spinner**
- Canvas-based smooth 60fps animation
- Textarea input (one item per line)
- Auto-assigned distinct colors per slice
- Realistic spin with easing and deceleration (3-6s duration)
- Clear winner highlight with confetti celebration
- Optional sound effects (spin ticks + winning chime)
- Remove winner from list after spin (optional)

### 2. **Number Draw**
- Specify range [min, max]
- Choose quantity of numbers to draw
- With/without repetition toggle
- Animated result display

### 3. **Name/List Draw**
- Clean input normalization (trim, dedupe, remove empty lines)
- Pick k items without repetition
- Clear results list display

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **UI Components**: Shadcn/ui
- **Animations**: Canvas API, CSS animations, canvas-confetti
- **SEO**: react-helmet-async for metadata management
- **RNG**: Web Crypto API (crypto.getRandomValues)

## 🎨 Design System

All styles are defined in `src/index.css` and `tailwind.config.ts`:

- **Primary Colors**: Purple-to-blue gradient (`--primary`)
- **Accent Colors**: Orange gradient (`--accent`)
- **Success Colors**: Green (`--success`)
- **Gradients**: `--gradient-primary`, `--gradient-accent`
- **Shadows**: `--shadow-glow`, `--shadow-card`
- **Animations**: Smooth transitions, bounce-in, fade-in-up, confetti

All components use semantic tokens from the design system - no hardcoded colors!

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── Header.tsx       # App header with logo & nav
│   ├── Footer.tsx       # App footer
│   ├── SEO.tsx          # SEO metadata component
│   ├── SpinWheel.tsx    # Animated wheel component
│   ├── NumberDraw.tsx   # Number draw tool
│   └── NameDraw.tsx     # Name/list picker tool
├── lib/
│   ├── wheel-colors.ts  # Vibrant color palette for wheel
│   ├── sound.ts         # Sound effects manager
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Index.tsx        # Home page
│   └── NotFound.tsx     # 404 page
├── App.tsx              # App root with providers
├── main.tsx             # Entry point
└── index.css            # Global styles & design system

public/
├── sitemap.xml          # SEO sitemap
└── robots.txt           # Robots configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Cloudflare Pages:
   - Connect your Git repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy!

### Other Static Hosts

The build output (`dist/`) can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🔍 SEO Features

### Implemented:
- ✅ Semantic HTML5 structure
- ✅ Meta tags (title, description, canonical)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Structured data (Schema.org WebApplication)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Mobile-responsive design
- ✅ Fast performance (optimized bundle)

### Performance Targets:
- Lighthouse Performance: ≥90
- Lighthouse SEO: ≥90
- Lighthouse Accessibility: ≥90
- Lighthouse Best Practices: ≥90

## 🎵 Sound Effects

Sound effects are generated using the Web Audio API:
- **Tick sound**: Short beep during wheel spin
- **Win sound**: Celebration chime on winner selection
- Toggle sound on/off with the speaker button

## 🎲 Random Number Generation

The app uses `crypto.getRandomValues()` for cryptographically secure random number generation, ensuring fair and unpredictable results.

## 🎨 Customization

### Colors

Edit `src/index.css` to change the color scheme:

```css
:root {
  --primary: 262 83% 58%;        /* Purple */
  --accent: 32 100% 58%;         /* Orange */
  --success: 142 76% 36%;        /* Green */
  /* ... more colors */
}
```

### Wheel Colors

Edit `src/lib/wheel-colors.ts` to customize slice colors:

```typescript
export const WHEEL_COLORS = [
  "#8B5CF6", // Purple
  "#F59E0B", // Amber
  // Add more colors...
];
```

## 📝 Future Enhancements

Potential features for v2:
- [ ] Blog system with MDX posts
- [ ] Verifiable results with crypto signatures
- [ ] Export results as PNG/CSV
- [ ] LocalStorage history of recent draws
- [ ] Result permalink sharing `/r/[token]`
- [ ] Multiple language support
- [ ] Custom wheel themes

## 📄 License

This project is built with Lovable. See repository for license details.

## 🤝 Contributing

This project is managed through Lovable. To make changes:
1. Visit the [Lovable Project](https://lovable.dev/projects/eb3e3eda-a336-48a6-898b-181c121c636e)
2. Use prompts to request changes
3. Changes are automatically committed to the repository

## 📞 Support

For questions or issues, please refer to the [Lovable documentation](https://docs.lovable.dev/).
