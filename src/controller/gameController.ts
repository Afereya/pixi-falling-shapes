import { Container } from "pixi.js";
import { TimedEvent } from "../utils/ticker";
import { randomInt } from "../utils/random";
import ShapeController from "./shapeController";
import RandomShapeFactory from "../model/randomShapeFactory";
import Shape from "../model/shapes/shape";
import {
  SHAPE_OFFSET_FROM_BORDERS,
  SHAPE_OFFSET_DIE,
  SHAPE_GRAVITY,
  SHAPE_PER_SECOND,
} from "../utils/consts";

const OFFSET_X = SHAPE_OFFSET_FROM_BORDERS;
class GameController {
  private _container!: Container;
  private _rootContainer!: Container;
  private _tickerFallingAnimation!: TimedEvent;
  private _fallingShpes: ShapeController[] = [];
  private _gravity = SHAPE_GRAVITY;
  private _shapesPerSecond = SHAPE_PER_SECOND;

  public OnRefreshUi?: (shapeCount: number, shapesArea: number) => void;

  constructor(container: Container, rootContainer: Container) {
    this._container = container;
    this._rootContainer = rootContainer;
    this._fallingShpes = [];
  }

  public start() {
    this._applyContainerEvents();
    this._shapeSpawnTimedEvent();
  }

  private _applyContainerEvents() {
    this._rootContainer.eventMode = "static";
    this._rootContainer.on("pointerdown", (e) => {
      const target = e.target;
      if (target && target !== this._rootContainer) {
        this._destroyShape(target as any);
        return;
      }
      const { x, y } = e.getLocalPosition(this._rootContainer);
      this._createEntityShape(x, y);
    });
  }

  private _shapeSpawnTimedEvent(): void {
    let elapsed = 0;
    let spawnElapsed = 0;

    const offsetY = SHAPE_OFFSET_DIE;
    const heightContainer = this._container.height;
    const widthContainer = this._container.width;
    const elementsToDestroy = new Set<ShapeController>();

    this._tickerFallingAnimation = new TimedEvent();
    this._tickerFallingAnimation.on("update", (deltaMS) => {
      elapsed += deltaMS;
      spawnElapsed += deltaMS;

      const dt = deltaMS * 0.001;
      for (let i = 0; i < this._fallingShpes.length; i++) {
        const element = this._fallingShpes[i];
        const tickSuccessful = element.nextTick(dt);
        if (!tickSuccessful) continue;
        if (!element.isOnContainer(heightContainer + offsetY)) {
          element.destroy();
          elementsToDestroy.add(element);
        }
      }
      this._removeShapes(elementsToDestroy);

      const spawnInterval = 1000 / this.shapesPerSecond;
      while (spawnElapsed >= spawnInterval) {
        spawnElapsed -= spawnInterval;
        this._createEntityShape(randomInt(OFFSET_X, widthContainer - OFFSET_X));
      }
      if (elapsed >= 1000) {
        elapsed = 0;
        this._refreshUI();
      }
    });
    this._tickerFallingAnimation.start(0);
  }

  private _removeShapes(elementsToRemove: Set<ShapeController>) {
    if (elementsToRemove.size === 0 || this._fallingShpes.length === 0) return;

    let writeIndex = 0;
    const lengthFS = this._fallingShpes.length;
    for (let i = 0; i < lengthFS; i++) {
      const element = this._fallingShpes[i];
      if (!elementsToRemove.has(element)) {
        this._fallingShpes[writeIndex++] = element;
      }
    }
    this._fallingShpes.length = writeIndex;
  }

  private _getTotalShapesArea(): number {
    return this._fallingShpes.reduce((sum, entity) => {
      return sum + (entity.shape.area ?? 0);
    }, 0);
  }

  private _getCountShapes(): number {
    return this._fallingShpes.reduce(
      (count, entity) => count + (entity.active ? 1 : 0),
      0
    );
  }

  private _refreshUI() {
    this.OnRefreshUi?.(this._getCountShapes(), this._getTotalShapesArea());
  }

  private _createEntityShape(x?: number, y?: number) {
    const shape = this._createShape();
    const fallingShape = new ShapeController(
      this._container,
      shape,
      () => this._gravity
    );
    fallingShape.start(x, y);
    this._fallingShpes.push(fallingShape);
    this._refreshUI();
  }

  private _destroyShape(targetShape: Shape) {
    const element = this._fallingShpes.find((s) => s.shape === targetShape);
    if (!element) return;
    element.destroy();
    this._removeShapes(new Set([element]));
    this._refreshUI();
  }

  private _createShape(): Shape {
    const shape = RandomShapeFactory.generateRandomShape();
    shape.eventMode = "static";
    return shape;
  }

  public setShapesPerSecond(value: number) {
    this._shapesPerSecond = value;
  }

  public get shapesPerSecond(): number {
    return this._shapesPerSecond;
  }

  public setGravity(value: number) {
    this._gravity = Math.max(0, value | 0);
  }

  public get gravity(): number {
    return this._gravity;
  }
}

export default GameController;
