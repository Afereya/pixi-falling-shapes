# Pixi Falling Shapes 🎨⬇️

In a rectangular area, random shapes of random colors are generated.  
They fall under the effect of "gravity".  
Clicking on an empty spot creates a new shape at the click position, clicking on a shape removes it.  
The interface displays the number of active shapes and the total surface area they occupy (in **px²**).

## ✨ Features
- Random shapes: triangle (3), quadrilateral (4), pentagon (5), hexagon (6), circle, ellipse, and "random".
- Random color for each shape.
- Falling from top to bottom (spawned outside the top boundary, disappear outside the bottom).
- Click on empty space → spawn a shape at that position.
- Click on a shape → remove it.
- UI controls:
  - `+ / − / input` field — spawn rate (shapes per second);
  - `+ / − / input` field — gravity value;
  - fields displaying: number of active shapes and the covered area in **px²**.
- Surface area is calculated using pixel-based coverage via `RenderTexture` (optional preview/debug mode).

## 🧱 Technologies
- **PixiJS**.
- **TypeScript**.
- **OOP** + **MVC**.
- **HTML/CSS** for UI.
- (Optional) **Vite** for build/dev server.

## 🚀 Run locally
```bash
# install dependencies
npm install

# development mode (Vite)
npm run dev

# production build
npm run build

# preview production build
npm run preview
