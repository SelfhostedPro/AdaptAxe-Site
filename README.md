# AdaptAxe Website

Interactive 3D website showcasing the modular AdaptAxe guitar system at [adaptaxe.com](https://adaptaxe.com)

## Overview

Built with Next.js and Three.js, this website provides an immersive 3D visualization of the AdaptAxe modular guitar, allowing users to explore its customizable components and unique features. The site features interactive controls for customizing the guitar's appearance, exploring different parts, and understanding the modular design.

## Tech Stack

- Next.js
- OpenNext.js
- R3F/Three.js for 3D rendering
- GSAP for animations
- TypeScript
- Valtio for state management
- Framer Motion for UI animations
- Tailwind CSS for styling
- Cloudflare Workers

## Features

- Interactive 3D model of the AdaptAxe guitar
- Component visualization and customization
- Color picker for primary and secondary guitar colors
- Style selector for different guitar body shapes
- Visibility controls for individual guitar parts
- Responsive design for all devices
- Mobile-optimized drawer interface
- Guided tour through guitar features
- Smooth animations and transitions
- Product information and specifications

## Development

```bash
# Install dependencies
bun i

# Start development server
bun dev ## Webpack
bun fast ## Turbo

# Build for production
bun run build

# Preview production build
bun run preview

# Deploy
bun run deploy
```

## Project Structure

```bash
/
├── apps/
│   ├── home/
│       ├── src/
│           ├── app/           # AppRouter
│           ├── components/     # Shared components including 3D models
│           ├── constants.ts    # Application constants
│           ├── features/       # Main Features of the Website
│               ├── Home/       # Homepage and Majority of the site
│                   ├── animations/  # GSAP animations
│                   ├── content/     # UI components
│                       ├── customizer/  # Guitar customization controls
│                       ├── overlay/     # Information overlays
│                   ├── scene/       # 3D scene components
│                   ├── store/       # Section state management
│           ├── hooks/         # Custom React hooks
│           ├── store/         # Global state stores
│           ├── types/         # TypeScript type definitions for raw files
├── packages/                  # Shared workspace packages (shadcn,eslint,tsconfig,etc)
```

## Contributing

Issues and pull requests welcome.
