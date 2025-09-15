export default class BoxInput {
  public el: HTMLInputElement;
  private _value: string | number = "";

  constructor(initial: string | number = "", title?: string) {
    this.el = document.createElement("input");
    this.el.type = "text";
    this.el.className = "value-box";

    if (title) {
      this.el.title = title;
      this.el.setAttribute("aria-label", title);
    }

    this.el.readOnly = true;
    this.el.addEventListener("blur", () => {
      this._value = this.el.value;
    });

    this.set(initial);
  }

  set(v: string | number): this {
    this._value = String(v);
    this.el.value = this._value;
    return this;
  }

  get(): string | number {
    return this._value;
  }

  enableEditing(): this {
    this.el.readOnly = false;
    this.el.style.cursor = "text";
    return this;
  }

  disableEditing(): this {
    this.el.readOnly = true;
    this.el.style.cursor = "default";
    return this;
  }

  mount(parent: HTMLElement): this {
    parent.appendChild(this.el);
    return this;
  }

  onInput(callback: (value: string) => void): this {
    this.el.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      callback(target.value);
    });
    return this;
  }
}
