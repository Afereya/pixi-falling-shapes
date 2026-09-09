import Box from "./box";
import { UiElement } from "./UiElement";

export class TopUI extends UiElement {
  private _shapesOnRectangleBox: Box;
  private _shapesAreaBox: Box;

  constructor() {
    super(document.createElement("div"));

    this.el.className = "status-bar";

    //  number of shapes being displayed in the rectangle.
    this._shapesOnRectangleBox = new Box(
      "Shapes: 0",
      "Shapes currently visible inside the field"
    ).mount(this.el);

    //  surface area (in px^2) occupied by the shapes.
    this._shapesAreaBox = new Box(
      "Covered area: 0 px² (0.0%)",
      "Area covered by visible shapes"
    ).mount(this.el);
  }

  public setShapesOnRectangle(v: number) {
    this._shapesOnRectangleBox.set(`Shapes: ${v}`);
  }

  public setShapesAreaLabel(v: string) {
    this._shapesAreaBox.set(`Covered area: ${v}`);
  }
}
