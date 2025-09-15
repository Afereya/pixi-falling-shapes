import Shape from "./shape.ts";
import { ShapeType } from "../../utils/types/shapeType.ts";
import { randomFloat } from "../../utils/random.ts";

class Ellipse extends Shape {
  constructor() {
    super();
    this._typeShape = ShapeType.Ellipse;
    this.applyShapeGraphics();
  }

  override applyShapeGraphics(): void {
    const radiusX = this.radius * randomFloat(0.5, 1.5);
    const radiusY = this.radius * randomFloat(0.5, 1.5);
    this.ellipse(0, 0, radiusX, radiusY);
    this.finally();
  }

  private circellipseArealeArea(rx: number, ry: number): number {
    return Math.PI * rx * ry;
  }
}

export default Ellipse;
