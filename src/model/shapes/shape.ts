import { Graphics } from "pixi.js";
import { ShapeType } from "../../utils/types/shapeType.ts";
import { randomColor } from "../../utils/random";
import { PolygonSides } from "@/src/utils/types/index.ts";
import {
  SHAPE_RADIUS,
  SHAPE_STROKE_WIDTH,
  SHAPE_STROKE_COLOR,
  SHAPE_WIDTH,
  SHAPE_HEIGHT,
} from "../../utils/consts.ts";

class Shape extends Graphics {
  protected _active!: boolean;
  protected _typeShape!: ShapeType;
  protected _sides!: PolygonSides;
  protected _color!: number;
  protected _radius!: number;
  protected _shapeWidth!: number;
  protected _shapeHeight!: number;
  protected _shapeRotation!: number;
  protected _gravityValue!: number;
  protected _area!: number;

  constructor() {
    super();
    this._color = randomColor();
    this._radius = SHAPE_RADIUS;
    this._shapeWidth = SHAPE_WIDTH;
    this._shapeHeight = SHAPE_HEIGHT;
  }

  protected applyShapeGraphics(): void {}

  protected finally(callback?: () => void) {
    this.fill(this.color);
    this.stroke({
      width: SHAPE_STROKE_WIDTH,
      color: SHAPE_STROKE_COLOR,
    });

    const bounds = this.getLocalBounds();
    this.pivot.set(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    if (callback) callback();
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public set area(value: number) {
    this._area = value;
  }
  public get area(): number {
    return this._area;
  }

  public set sides(value: PolygonSides) {
    this._sides = value;
  }
  public get sides(): PolygonSides {
    return this._sides;
  }

  public set shapeHeight(value: number) {
    this._shapeHeight = value;
  }
  public get shapeHeight(): number {
    return this._shapeHeight;
  }

  public set shapeWidth(value: number) {
    this._shapeWidth = value;
  }
  public get shapeWidth(): number {
    return this._shapeWidth;
  }

  public set radius(value: number) {
    this._radius = value;
  }
  public get radius(): number {
    return this._radius;
  }

  public set color(value: number) {
    this.fill(value);
    this._color = value;
  }

  public get color(): number {
    return this._color;
  }

  public set typeShape(value: ShapeType) {
    this._typeShape = value;
  }
  public get typeShape(): ShapeType {
    return this._typeShape;
  }
}

export default Shape;
