import Shape from "./shape.ts";
import { Vec2 } from "../../utils/types/index.ts";

class Polygons extends Shape {
  constructor() {
    super();
  }

  protected _drawNotRegularPolygon(sides: number, r: number): Vec2[] {
    const pts: Vec2[] = [];
    const phase = -Math.PI / 2;
    for (let i = 0; i < sides; i++) {
      const angle =
        phase + (i * 2 * Math.PI) / sides + (Math.random() - 0.5) * 0.4;
      const offsetR = r * (0.8 + Math.random() * 0.4);
      pts.push({ x: Math.cos(angle) * offsetR, y: Math.sin(angle) * offsetR });
    }

    return pts;
  }

  protected _drawRegularPolygon(sides: number, r: number) {
    const pts: number[] = [];
    const phase = -Math.PI / 2;
    for (let i = 0; i < sides; i++) {
      const angle = phase + (i * 2 * Math.PI) / sides;
      pts.push(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    return pts;
  }

  protected polygonArea(points: Vec2[]): number {
    let area = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
      const { x: x1, y: y1 } = points[i];
      const { x: x2, y: y2 } = points[(i + 1) % n];
      area += x1 * y2 - x2 * y1;
    }

    return Math.abs(area / 2);
  }
}

export default Polygons;
