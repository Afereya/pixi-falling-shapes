import { Container } from "pixi.js";
import Shape from "../model/shapes/shape";

const START_X = 250;
const OFFSET_Y = 60;
const START_Y = 0 - OFFSET_Y;

class ShapeController {
  private _container!: Container;
  private readonly _shape: Shape;
  private readonly _gravityProvider: () => number;
  private _vy = 0;
  private _active = false;

  constructor(container: Container, shape: Shape, gravityProvider: () => number) {
    this._container = container;
    this._shape = shape;
    this._gravityProvider = gravityProvider;
  }

  public start(x: number = START_X, y: number = START_Y, fieldHeight?: number) {
    this.shape.setPosition(x, y);
    this._container.addChild(this.shape);
    if (fieldHeight !== undefined) this._updateVisibility(fieldHeight);
  }

  public nextTick(dt: number, fieldHeight: number): boolean {
    if (this.shape.destroyed) return false;
    this.vy += this._gravityProvider() * dt;
    this.shape.y += this.vy * dt;
    this._updateVisibility(fieldHeight);
    return true;
  }

  public isBelowContainer(fieldHeight: number): boolean {
    return this._verticalBounds().top > fieldHeight;
  }

  public destroy(): void {
    this._active = false;

    if (!this.shape.destroyed) {
      this._container.removeChild(this.shape);
      this.shape.destroy();
    }
  }

  private _verticalBounds(): { top: number; bottom: number } {
    const bounds = this.shape.getLocalBounds();
    return {
      top: this.shape.y + bounds.y - this.shape.pivot.y,
      bottom: this.shape.y + bounds.y + bounds.height - this.shape.pivot.y,
    };
  }

  private _updateVisibility(fieldHeight: number): void {
    const { top, bottom } = this._verticalBounds();
    this._active = bottom >= 0 && top <= fieldHeight;
  }

  public set vy(value: number) {
    this._vy = value;
  }
  public get vy(): number {
    return this._vy;
  }

  public get active(): boolean {
    return this._active;
  }

  public get shape(): Shape {
    return this._shape;
  }
}

export default ShapeController;
