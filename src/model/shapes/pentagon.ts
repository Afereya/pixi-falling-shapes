import { ShapeType } from "../../utils/types/shapeType.ts";
import Polygons from "./polygons.ts";

class Pentagon extends Polygons {
  constructor() {
    super();
    this.sides = 4;
    this.typeShape = ShapeType.Pentagon;
    this.applyShapeGraphics();
  }

  override applyShapeGraphics(): void {
    const r = this.radius;
    const pts = this._drawNotRegularPolygon(this.sides, r);
    this.poly(pts);
    this.finally();
  }
}

export default Pentagon;
