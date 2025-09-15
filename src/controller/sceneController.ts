import { Application, Container, Graphics } from "pixi.js";
import GameScene1 from "./scenes/gameScene1";
import { BaseScene } from "./scenes/baseScene";
import { CONTETNT_HIGHT, CONTETNT_WIDTH } from "../utils/consts";

class SceneController {
  private _app!: Application;
  private _container!: Container;
  private _activeScene!: BaseScene;

  constructor(app: Application) {
    this._app = app;

    // @ts-ignore:  Pixi
    globalThis.__PIXI_APP__ = app;

    this._container = this._createBaseContainer();
    this._app.stage.addChild(this._container);

    this._startGame();
    this._autoScale();
  }

  private _createBaseContainer(): Container {
    const container = new Container();
    container.pivot.set(CONTETNT_WIDTH / 2, CONTETNT_HIGHT / 2);
    container.setSize(CONTETNT_WIDTH, CONTETNT_HIGHT);

    const bg = new Graphics()
      .rect(0, 0, CONTETNT_WIDTH, CONTETNT_HIGHT)
      .fill(0xffffff);
    container.addChild(bg);

    const mask = new Graphics()
      .rect(0, 0, CONTETNT_WIDTH, CONTETNT_HIGHT)
      .fill(0xffffff);
    container.mask = mask;
    container.addChild(mask);

    return container;
  }

  private _startGame() {
    this._activeScene = new GameScene1(this._container, this._app);
  }

  private _autoScale() {
    this._app.renderer.resize(window.innerWidth, window.innerHeight);
    this._container.position.set(
      this._app.screen.width / 2,
      this._app.screen.height / 2
    );
    this._activeScene.setScale(this._app.screen.width, this._app.screen.height);
  }
}

export default SceneController;
