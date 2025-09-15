import shapes from "../model/shapes/index";
import { randomInt } from "../utils/random";

class RandomShapeFactory {
  public static generateRandomShape() {
    const shape = new shapes[randomInt(0, shapes.length - 1)]();
    return shape;
  }
}

export default RandomShapeFactory;
