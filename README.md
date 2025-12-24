# Clay & Resign Art Studio

A futuristic, animated website for Clay & Resign Art Studio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Futuristic Design**: Modern, eye-catching design with neon effects and glass morphism
- ✨ **Advanced Animations**: Smooth animations powered by Framer Motion
- 🌈 **Gradient Effects**: Beautiful gradient text and backgrounds
- 🎭 **Interactive Elements**: Hover effects, particle animations, and 3D transforms
- 📱 **Responsive Design**: Fully responsive across all devices
- ⚡ **Performance Optimized**: Built with Next.js for optimal performance

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles with animations
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer component
│   ├── Hero.tsx         # Hero section with particles
│   ├── Gallery.tsx      # Gallery showcase
│   ├── Services.tsx     # Services section
│   └── Contact.tsx      # Contact form
└── public/              # Static assets
```

## Customization

- Update colors in `tailwind.config.js`
- Modify animations in `app/globals.css`
- Add your own content in component files
- Replace placeholder images with your artwork

## License

MIT License

