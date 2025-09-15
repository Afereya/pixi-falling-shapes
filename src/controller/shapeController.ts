import { Container } from "pixi.js";
import { TimedEvent } from "../utils/ticker";
import Shape from "../model/shapes/shape";

const START_X = 250;
const OFFSET_Y = 60;
const START_Y = 0 - OFFSET_Y;

class ShapeController {
  private _container!: Container;
  private _ticker!: TimedEvent;
  private _shape!: Shape;
  private _gravityProvider!: () => number;
  private _vy!: number; // velocity y
  private _active!: boolean;

  constructor(container: Container, shape: Shape, gravityProvider: () => number) {
    this._container = container;
    this._shape = shape;
    this._active = false;
    this._vy = 0;
    this._gravityProvider = gravityProvider;
  }

  public start(x?: number, y?: number) {
    this.shape.setPosition(x ?? START_X, y ?? START_Y);
    this._container.addChild(this.shape);
  }

  public nextTick(dt: number) {
    if (!this.shape || this.shape.destroyed) return;
    this.vy += this._gravityProvider() * dt;
    this.shape.y += this.vy * dt;
    if (this.shape.y >= 0) this.active = true;

    return true;
  }

  public isOnContainer(container: number) {
    return this.shape.y < container;
  }

  public destroy(): void {
    this._active = false;

    if (this.shape) {
      this._container.removeChild(this.shape);
      this.shape.destroy();
      this.shape = null;
    }
    if (this.ticker) {
      this.ticker.destroy();
      this.shape = null;
    }
  }

  public set vy(value: any) {
    this._vy = value;
  }
  public get vy(): any {
    return this._vy;
  }

  public set active(value: any) {
    this._active = value;
  }
  public get active(): any {
    return this._active;
  }

  public set shape(value: any) {
    this._shape = value;
  }
  public get shape(): any {
    return this._shape;
  }

  public set ticker(value: any) {
    this._ticker = value;
  }
  public get ticker(): any {
    return this._ticker;
  }
}

export default ShapeController;
