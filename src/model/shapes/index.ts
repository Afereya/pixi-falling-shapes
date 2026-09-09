import Circle from "./circle";
import Ellipse from "./ellipse";
import Triangle from "./triangle";
import Quadrilateral from "./quadrilateral";
import Pentagon from "./pentagon";
import Hexagon from "./hexagon";
import RandomShape from "./randomShape";
import Shape from "./shape";

type ShapeConstructor = new () => Shape;

const shapes: ShapeConstructor[] = [
  Circle,
  Ellipse,
  Triangle,
  Quadrilateral,
  Pentagon,
  Hexagon,
  RandomShape,
];

export default shapes;
