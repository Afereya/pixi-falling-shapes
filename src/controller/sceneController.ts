import { Application, Container, Graphics } from "pixi.js";
import GameScene1 from "./scenes/gameScene1";
import { BaseScene } from "./scenes/baseScene";
import { CONTENT_HEIGHT, CONTENT_WIDTH } from "../utils/consts";

class SceneController {
  private _app!: Application;
  private _container!: Container;
  private _activeScene!: BaseScene;

  private readonly _autoScale = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const horizontalMargin = 16;
    const controlsHeight = 112;
    const scale = Math.max(
      0.1,
      Math.min(
        1,
        (screenWidth - horizontalMargin * 2) / CONTENT_WIDTH,
        (screenHeight - controlsHeight) / CONTENT_HEIGHT
      )
    );

    this._container.scale.set(scale);
    this._container.position.set(screenWidth / 2, screenHeight / 2);
    this._activeScene.setScale(screenWidth, screenHeight, scale);
  };

  constructor(app: Application) {
    this._app = app;

    this._container = this._createBaseContainer();
    this._app.stage.addChild(this._container);

    this._startGame();
    this._autoScale();
    window.addEventListener("resize", this._autoScale);
  }

  private _createBaseContainer(): Container {
    const container = new Container();
    container.pivot.set(CONTENT_WIDTH / 2, CONTENT_HEIGHT / 2);
    container.setSize(CONTENT_WIDTH, CONTENT_HEIGHT);

    const bg = new Graphics()
      .rect(0, 0, CONTENT_WIDTH, CONTENT_HEIGHT)
      .fill(0xffffff);
    container.addChild(bg);

    const mask = new Graphics()
      .rect(0, 0, CONTENT_WIDTH, CONTENT_HEIGHT)
      .fill(0xffffff);
    container.mask = mask;
    container.addChild(mask);

    return container;
  }

  private _startGame() {
    this._activeScene = new GameScene1(this._container, this._app);
  }

}

export default SceneController;
