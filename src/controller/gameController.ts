import { Container } from "pixi.js";
import { TimedEvent } from "../utils/ticker";
import { randomInt } from "../utils/random";
import ShapeController from "./shapeController";
import RandomShapeFactory from "../model/randomShapeFactory";
import Shape from "../model/shapes/shape";
import {
  CONTENT_HEIGHT,
  CONTENT_WIDTH,
  SHAPE_GRAVITY,
  SHAPE_PER_SECOND,
} from "../utils/consts";

const MAX_SHAPES_PER_SECOND = 60;
const MAX_GRAVITY = 5000;
class GameController {
  private _container!: Container;
  private _rootContainer!: Container;
  private _tickerFallingAnimation!: TimedEvent;
  private _fallingShpes: ShapeController[] = [];
  private _gravity = SHAPE_GRAVITY;
  private _shapesPerSecond = SHAPE_PER_SECOND;

  public onRefreshUi?: (shapeCount: number) => void;

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
      if (target instanceof Shape) {
        this._destroyShape(target);
        return;
      }
      const { x, y } = e.getLocalPosition(this._rootContainer);
      this._createEntityShape(x, y);
    });
  }

  private _shapeSpawnTimedEvent(): void {
    let elapsed = 0;
    let spawnElapsed = 0;

    const elementsToDestroy = new Set<ShapeController>();

    this._tickerFallingAnimation = new TimedEvent();
    this._tickerFallingAnimation.on("update", (deltaMS) => {
      elapsed += deltaMS;
      spawnElapsed += deltaMS;

      const dt = deltaMS * 0.001;
      for (let i = 0; i < this._fallingShpes.length; i++) {
        const element = this._fallingShpes[i];
        const tickSuccessful = element.nextTick(dt, CONTENT_HEIGHT);
        if (!tickSuccessful) {
          elementsToDestroy.add(element);
          continue;
        }
        if (element.isBelowContainer(CONTENT_HEIGHT)) {
          element.destroy();
          elementsToDestroy.add(element);
        }
      }
      this._removeShapes(elementsToDestroy);

      if (this.shapesPerSecond > 0) {
        const spawnInterval = 1000 / this.shapesPerSecond;
        let spawnedThisTick = 0;
        while (spawnElapsed >= spawnInterval && spawnedThisTick < 100) {
          spawnElapsed -= spawnInterval;
          this._createEntityShape();
          spawnedThisTick++;
        }
        if (spawnedThisTick === 100) spawnElapsed = 0;
      } else {
        spawnElapsed = 0;
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

  private _getCountShapes(): number {
    return this._fallingShpes.reduce(
      (count, entity) => count + (entity.active ? 1 : 0),
      0
    );
  }

  private _refreshUI() {
    this.onRefreshUi?.(this._getCountShapes());
  }

  private _createEntityShape(x?: number, y?: number) {
    const shape = this._createShape();
    const spawnX = x ?? this._randomSpawnX(shape);
    const fallingShape = new ShapeController(
      this._container,
      shape,
      () => this._gravity
    );
    fallingShape.start(spawnX, y, CONTENT_HEIGHT);
    this._fallingShpes.push(fallingShape);
    this._refreshUI();
  }

  private _randomSpawnX(shape: Shape): number {
    const bounds = shape.getLocalBounds();
    const minX = Math.ceil(shape.pivot.x - bounds.x);
    const maxX = Math.floor(
      CONTENT_WIDTH - (bounds.x + bounds.width - shape.pivot.x)
    );
    return randomInt(minX, Math.max(minX, maxX));
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

  public setShapesPerSecond(value: number): number {
    const normalized = Number.isFinite(value) ? value : SHAPE_PER_SECOND;
    this._shapesPerSecond = Math.min(
      MAX_SHAPES_PER_SECOND,
      Math.max(0, normalized)
    );
    return this._shapesPerSecond;
  }

  public get shapesPerSecond(): number {
    return this._shapesPerSecond;
  }

  public setGravity(value: number): number {
    const normalized = Number.isFinite(value) ? value : SHAPE_GRAVITY;
    this._gravity = Math.min(MAX_GRAVITY, Math.max(0, normalized));
    return this._gravity;
  }

  public get gravity(): number {
    return this._gravity;
  }
}

export default GameController;
