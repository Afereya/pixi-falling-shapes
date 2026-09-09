import { Application, Container, Graphics } from "pixi.js";
import GameController from "../gameController.ts";
import { BaseScene } from "./baseScene.ts";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../../utils/consts.ts";
import { BotUI } from "../../view/botUI.ts";
import { TopUI } from "../../view/topUI.ts";
import { CoverageMeter, CoverageResult } from "../../utils/coverageMeter";

class GameScene1 extends BaseScene {
  private _app!: Application;
  private _container!: Container;
  private _shapesRoot!: Container;
  private _topUI!: TopUI;
  private _botUI!: BotUI;
  private _coverage!: CoverageMeter;

  constructor(container: Container, app: Application) {
    super();
    this._app = app;
    this._container = container;
    this._init();
  }

  private _init() {
    this._shapesRoot = this._createShapesRootContainer();
    this._container.addChild(this._shapesRoot);
    this._container.addChild(this._createFrame());

    // const debugContainer = new Container;
    // this._app.stage.addChild(debugContainer);

    this._coverage = new CoverageMeter(this._app.renderer, {
      resolution: 0.75,
      framesInterval: 2,
      alphaThreshold: 0,
      // debugContainer
    });

    let elapsed = 0;
    this._app.ticker.add((ticker) => {
      elapsed += ticker.deltaMS;
      if (elapsed >= 250) {
        elapsed = 0;
        const res: CoverageResult | null = this._coverage.measure(
          this._container,
          this._shapesRoot
        );
        if (res) {
          this._topUI.setShapesAreaLabel(
            `(${res.pixelsCovered}/${res.pixelsTotal}) ${(
              res.ratio * 100
            ).toFixed(1)}%`
          );
        }
      }
    });

    const gameController = new GameController(
      this._shapesRoot,
      this._container
    );
    gameController.start();

    this._topUI = this._createTopUI();
    gameController.onRefreshUi = (shapeCount) => {
      this._topUI.setShapesOnRectangle(shapeCount);
    };

    const STEP_G = 10;
    this._botUI = this._createBotUI();
    this._botUI.setGravityLabel?.(gameController.gravity);
    this._botUI.onInputGravityLabel = (v: number) => {
      this._botUI.setGravityLabel?.(gameController.setGravity(v));
    };
    this._botUI.onGravityPlus = () => {
      gameController.setGravity(gameController.gravity + STEP_G);
      this._botUI.setGravityLabel?.(gameController.gravity);
    };
    this._botUI.onGravityMinus = () => {
      gameController.setGravity(Math.max(0, gameController.gravity - STEP_G));
      this._botUI.setGravityLabel?.(gameController.gravity);
    };

    const STEP_S = 1;
    this._botUI.setShapesPerSecondLabel?.(gameController.shapesPerSecond);
    this._botUI.onInputShapesPerSecondLabel = (v: number) => {
      this._botUI.setShapesPerSecondLabel?.(
        gameController.setShapesPerSecond(v)
      );
    };
    this._botUI.shapesPerSecondPlus = () => {
      gameController.setShapesPerSecond(
        gameController.shapesPerSecond + STEP_S
      );
      this._botUI.setShapesPerSecondLabel?.(gameController.shapesPerSecond);
    };
    this._botUI.shapesPerSecondMinus = () => {
      gameController.setShapesPerSecond(
        Math.max(1, gameController.shapesPerSecond - STEP_S)
      );
      this._botUI.setShapesPerSecondLabel?.(gameController.shapesPerSecond);
    };
  }

  private _createShapesRootContainer(): Container {
    return new Container();
  }

  private _createFrame(): Graphics {
    return new Graphics()
      .rect(0, 0, CONTENT_WIDTH, CONTENT_HEIGHT)
      .stroke({ width: 2, color: 0x000000 });
  }

  private _createBotUI() {
    const uiBot = document.getElementById("ui-bot")!;
    const botUI = new BotUI();
    botUI.mount(uiBot);
    uiBot.style.top = `${100}px`;

    return botUI;
  }

  private _createTopUI() {
    const uiTop = document.getElementById("ui-top")!;
    const topUI = new TopUI();
    topUI.mount(uiTop);
    uiTop.style.top = `${300}px`;
    return topUI;
  }

  override setScale(
    screenWidth: number,
    screenHeight: number,
    scale: number
  ): void {
    const fieldLeft = screenWidth / 2 - (CONTENT_WIDTH * scale) / 2;
    const fieldTop = screenHeight / 2 - (CONTENT_HEIGHT * scale) / 2;

    if (this._topUI.container) {
      this._topUI.container.style.left = `${fieldLeft}px`;
      this._topUI.container.style.top = `${fieldTop - 52 * scale}px`;
      this._topUI.container.style.transform = `scale(${scale})`;
    }

    if (this._botUI.container) {
      this._botUI.container.style.left = `${fieldLeft}px`;
      this._botUI.container.style.top = `${
        fieldTop + CONTENT_HEIGHT * scale + 5 * scale
      }px`;
      this._botUI.container.style.transform = `scale(${scale})`;
    }
  }
}

export default GameScene1;
