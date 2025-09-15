export class UiElement {
  public el: HTMLDivElement;
  public container?: HTMLElement;

  constructor(el: HTMLDivElement) {
    this.el = el;
  }

  public append(...nodes: HTMLElement[]) {
    nodes.forEach((n) => this.el.appendChild(n));
    return this;
  }

  public mount(parent: HTMLElement) {
    parent.appendChild(this.el);
    this.container = parent;
    return this;
  }
}
