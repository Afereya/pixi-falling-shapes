import Shape from "./shape.ts";
import { ShapeType } from "../../utils/types/shapeType.ts";

class Circle extends Shape {
  constructor() {
    super();
    this._typeShape = ShapeType.Circle;
    this.applyShapeGraphics();
  }

  override applyShapeGraphics(): void {
    this.circle(0, 0, this.radius);
    this.finally();
  }

  private circleArea(r: number): number {
    return Math.PI * r * r;
  }
}

export default Circle;
