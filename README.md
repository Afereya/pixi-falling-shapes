# Pixi Falling Shapes

An interactive falling-shapes simulation built with PixiJS, TypeScript, and Vite.

## Features

- Random circles, ellipses, polygons, and irregular shapes
- Click an empty point to create a shape
- Click a shape to remove it
- Adjustable gravity and spawn rate
- Live count and covered-area measurement
- Responsive canvas and controls

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run build
```

## Tech stack

- PixiJS 8
- TypeScript
- Vite

The application uses a small scene/controller structure: PixiJS renders the simulation, controllers own spawning and movement, and DOM components provide accessible controls and live statistics.
