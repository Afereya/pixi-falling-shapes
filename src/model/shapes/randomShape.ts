import Polygons from "./polygons.ts";
import { ShapeType } from "../../utils/types/shapeType.ts";
import { Vec2, currVec2 } from "../../utils/types/index.ts";

class RandomShape extends Polygons {
  constructor() {
    super();
    this._typeShape = ShapeType.Random;
    this.applyShapeGraphics();
  }

  override applyShapeGraphics(): void {
    const r = this.radius;
    const pts = this._drawNotRegularPolygon(5, r);
    const curvePts = this._addCurve(pts);

    for (let i = 0; i < curvePts.length; i++) {
      let point = curvePts[i];
      if (i === 0) {
        this.moveTo(point.x, point.y);
        continue;
      }
      this.quadraticCurveTo(point.cx, point.cy, point.x, point.y);
    }

    this.finally();
  }

  private _addCurve(points: Vec2[]) {
    let strength = 2;
    let newPts: currVec2[] = [];

    newPts.push({ cx: 0, cy: 0, x: points[0].x, y: points[0].y });
    for (let i = 0; i < points.length; i++) {
      let currP: Vec2 = points[i];
      let nextP: Vec2 = points[(i + 1) % points.length];

      const mx = (currP.x + nextP.x) / 2;
      const my = (currP.y + nextP.y) / 2;

      const vx = nextP.x - currP.x;
      const vy = nextP.y - currP.y;

      const len = Math.hypot(vx, vy) || 1;
      const nx = -vy / len;
      const ny = vx / len;

      const sign = Math.random() < 0.5 ? -1 : -1;
      const offset = len * 0.5 * strength;

      const cx = mx + nx * offset * sign;
      const cy = my + ny * offset * sign;

      newPts.push({ cx: cx, cy: cy, x: nextP.x, y: nextP.y });
    }

    return newPts;
  }
}

export default RandomShape;
