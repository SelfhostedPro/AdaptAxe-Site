# AdaptAxe Website

Interactive 3D website showcasing the modular AdaptAxe guitar system at [adaptaxe.com](https://adaptaxe.com)

## Overview

Built with Next.js and Three.js, this website provides an immersive 3D visualization of the AdaptAxe modular guitar, allowing users to explore its customizable components and unique features.

## Tech Stack

- Next.js
- OpenNext.js
- R3F/Three.js for 3D rendering
- GSAP for animations
- TypeScript
- Cloudflare Workers

## Features

- Interactive 3D model of the AdaptAxe guitar
- Component visualization and customization
- Responsive design for all devices
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
```

## Project Structure

```bash
/
├── src/
│   ├── app/           # AppRouter
│   ├── features/      # Main Features of the Website. Currently Home is the only one in use.
│   ├── store/         # Stores to be reused in the future
│   ├── hooks/         # Hooks to be reused in the future
│   └── types/         # Types (mainly for raw loader)
└── public/            # Static assets
```

## Contributing

Issues and pull requests welcome.
