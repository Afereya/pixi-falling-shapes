import { DualButton } from "./dualButton";
import Box from "./box";
import BoxInput from "./boxInput";
import { UiElement } from "./UiElement";

const GAP = 8;
const WIDTH_BOX = 70;

export class BotUI extends UiElement {
  public onGravityPlus?: () => void;
  public onGravityMinus?: () => void;
  public setGravityLabel?: (v: number) => void;
  public onInputGravityLabel?: (v: number) => void;

  public shapesPerSecondPlus?: () => void;
  public shapesPerSecondMinus?: () => void;
  public setShapesPerSecondLabel?: (v: number) => void;
  public onInputShapesPerSecondLabel?: (v: number) => void;

  constructor() {
    super(document.createElement("div"));

    this.el.style.display = "flex";
    this.el.style.flexDirection = "row";
    this.el.style.alignItems = "center";
    this.el.style.gap = `${GAP}px`;

    //  -/+ increase or decrease the gravity value
    new DualButton({
      leftText: "−",
      rightText: "+",
      onLeftClick: () => this.onGravityMinus?.(),
      onRightClick: () => this.onGravityPlus?.(),
    }).mount(this.el);

    const gravityBox = new BoxInput(900, "Текущее значение").mount(this.el);
    gravityBox.enableEditing();
    this.setGravityLabel = (v: number) => gravityBox.set(v);
    gravityBox.el.style.width = `${WIDTH_BOX}px`;
    gravityBox.el.style.minWidth = `${WIDTH_BOX}px`;
    gravityBox.onInput((v) => {
      const num = parseFloat(v);
      if (Number.isFinite(num)) {
        this.onInputGravityLabel?.(num);
      }
    });

    //  -/+ increase or decrease the number of shapes generated per second  shapesPerSecond
    new DualButton({
      leftText: "−",
      rightText: "+",
      onLeftClick: () => this.shapesPerSecondMinus?.(),
      onRightClick: () => this.shapesPerSecondPlus?.(),
    }).mount(this.el);

    const shapesPerSecondBox = new BoxInput(1, "Текущее значение").mount(
      this.el
    );
    shapesPerSecondBox.enableEditing();
    this.setShapesPerSecondLabel = (v: number) => shapesPerSecondBox.set(v);
    shapesPerSecondBox.el.style.width = `${WIDTH_BOX}px`;
    shapesPerSecondBox.el.style.minWidth = `${WIDTH_BOX}px`;
    shapesPerSecondBox.onInput((v) => {
      const num = parseFloat(v);
      if (Number.isFinite(num)) {
        this.onInputShapesPerSecondLabel?.(num);
      }
    });
  }
}
