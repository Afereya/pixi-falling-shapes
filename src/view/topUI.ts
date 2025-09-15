import Box from "./box";
import { UiElement } from "./UiElement";

const GAP = 0;
const WIDTH_BOX = 250;
export class TopUI extends UiElement {
  private _shapesOnRectangleBox: Box;
  private _shapesAreaBox: Box;

  constructor() {
    super(document.createElement("div"));

    this.el.style.display = "flex";
    this.el.style.flexDirection = "row";
    this.el.style.alignItems = "center";
    this.el.style.gap = `${GAP}px`;

    //  number of shapes being displayed in the rectangle.
    this._shapesOnRectangleBox = new Box(0, "Текущее значение").mount(this.el);
    this._shapesOnRectangleBox.el.style.width = `${WIDTH_BOX}px`;
    this._shapesOnRectangleBox.el.style.minWidth = `${WIDTH_BOX}px`;

    //  surface area (in px^2) occupied by the shapes.
    this._shapesAreaBox = new Box(0, "Текущее значение").mount(this.el);
    this._shapesAreaBox.el.style.width = `${WIDTH_BOX}px`;
    this._shapesAreaBox.el.style.minWidth = `${WIDTH_BOX}px`;
  }

  public setShapesOnRectangle(v: number) {
    this._shapesOnRectangleBox.set(v);
  }

  public setShapesAreaLabel(v: string) {
    this._shapesAreaBox.set(v);
  }
}
