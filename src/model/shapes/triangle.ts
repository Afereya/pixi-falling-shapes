import Polygons from "./polygons.ts";
import { ShapeType } from "../../utils/types/shapeType.ts";

class Triangle extends Polygons {
  constructor() {
    super();
    this.sides = 3;
    this.typeShape = ShapeType.Triangle;
    this.applyShapeGraphics();
  }

  override applyShapeGraphics(): void {
    const r = this.radius;
    const pts = this._drawNotRegularPolygon(this.sides, r);
    this.poly(pts);
    this.finally();
  }
}

export default Triangle;
