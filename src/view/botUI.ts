import { DualButton } from "./dualButton";
import BoxInput from "./boxInput";
import { UiElement } from "./UiElement";

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

    this.el.className = "controls-bar";

    const gravityLabel = document.createElement("span");
    gravityLabel.className = "control-label";
    gravityLabel.textContent = "Gravity";
    this.el.appendChild(gravityLabel);

    //  -/+ increase or decrease the gravity value
    new DualButton({
      leftText: "−",
      rightText: "+",
      onLeftClick: () => this.onGravityMinus?.(),
      onRightClick: () => this.onGravityPlus?.(),
    }).mount(this.el);

    const gravityBox = new BoxInput(900, "Gravity").mount(this.el);
    gravityBox.el.min = "0";
    gravityBox.el.max = "5000";
    gravityBox.el.step = "10";
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

    const rateLabel = document.createElement("span");
    rateLabel.className = "control-label";
    rateLabel.textContent = "Shapes / sec";
    this.el.appendChild(rateLabel);

    //  -/+ increase or decrease the number of shapes generated per second  shapesPerSecond
    new DualButton({
      leftText: "−",
      rightText: "+",
      onLeftClick: () => this.shapesPerSecondMinus?.(),
      onRightClick: () => this.shapesPerSecondPlus?.(),
    }).mount(this.el);

    const shapesPerSecondBox = new BoxInput(1, "Shapes per second").mount(
      this.el
    );
    shapesPerSecondBox.el.min = "0";
    shapesPerSecondBox.el.max = "60";
    shapesPerSecondBox.el.step = "1";
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
