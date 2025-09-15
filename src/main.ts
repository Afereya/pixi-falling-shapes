import { Application } from "pixi.js";
import SceneController from "./controller/sceneController.ts";

(async () => {
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });
  document.body.appendChild(app.canvas);

  new SceneController(app);
})();
