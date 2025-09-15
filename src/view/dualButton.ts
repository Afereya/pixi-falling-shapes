export type DualButtonOptions = {
  leftText?: string;
  rightText?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
};

export class DualButton {
  root: HTMLDivElement;
  leftBtn: HTMLButtonElement;
  rightBtn: HTMLButtonElement;

  constructor(opts: DualButtonOptions = {}) {
    this.root = document.createElement("div");
    this.root.className = "dual-button";

    this.leftBtn = document.createElement("button");
    this.leftBtn.className = "dual-button__btn dual-button__btn--left";
    this.leftBtn.textContent = opts.leftText ?? "Левая";
    if (opts.onLeftClick)
      this.leftBtn.addEventListener("click", opts.onLeftClick);

    this.rightBtn = document.createElement("button");
    this.rightBtn.className = "dual-button__btn dual-button__btn--right";
    this.rightBtn.textContent = opts.rightText ?? "Правая";
    if (opts.onRightClick)
      this.rightBtn.addEventListener("click", opts.onRightClick);

    this.root.appendChild(this.leftBtn);
    this.root.appendChild(this.rightBtn);
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.root);
  }

  unmount() {
    this.root.remove();
  }
}
