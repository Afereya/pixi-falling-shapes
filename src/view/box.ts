export default class Box {
  public el: HTMLDivElement;
  constructor(initial: string | number = "", title?: string) {
    this.el = document.createElement("div");
    this.el.className = "value-box";
    if (title) this.el.title = title;
    this.set(initial);
  }
  set(v: string | number) {
    this.el.textContent = String(v);
  }
  mount(parent: HTMLElement) {
    parent.appendChild(this.el);
    return this;
  }
}
