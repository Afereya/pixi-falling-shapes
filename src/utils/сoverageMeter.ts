import { Renderer, Container, Matrix, RenderTexture, Sprite } from "pixi.js";

export type CoverageTarget = Container | Container[];

export interface CoverageOptions {
  resolution?: number;
  alphaThreshold?: number;
  framesInterval?: number;
  debugContainer?: Container;
}

export interface CoverageResult {
  pixelsCovered: number;
  pixelsTotal: number;
  ratio: number;
  bounds: { x: number; y: number; width: number; height: number };
}

type RectLike = { x: number; y: number; width: number; height: number };

export class CoverageMeter {
  private renderer: Renderer;
  private rt: RenderTexture | null = null;
  private transform: Matrix = new Matrix();
  private lastW = 0;
  private lastH = 0;
  private frameCounter = 0;

  private resolution: number;
  private alphaThreshold: number;
  private framesInterval: number;
  private debugContainer: Container | undefined;

  constructor(renderer: Renderer, opts: CoverageOptions = {}) {
    this.renderer = renderer;
    this.resolution = opts.resolution ?? 0.75;
    this.alphaThreshold = opts.alphaThreshold ?? 0;
    this.framesInterval = Math.max(1, Math.floor(opts.framesInterval ?? 1));
    this.debugContainer = opts.debugContainer;
  }

  measure(container: Container, target: CoverageTarget): CoverageResult | null {
    this.frameCounter++;
    if (this.frameCounter % this.framesInterval !== 0) return null;

    const bounds = container.mask as Container;
    const w = Math.max(1, Math.ceil(bounds.width * this.resolution));
    const h = Math.max(1, Math.ceil(bounds.height * this.resolution));

    if (!this.rt) {
      this.rt = RenderTexture.create({ width: w, height: h, resolution: 1 });
      this.lastW = w;
      this.lastH = h;
    } else if (w !== this.lastW || h !== this.lastH) {
      this.rt.resize(w, h);
      this.lastW = w;
      this.lastH = h;
    }

    this.transform.set(
      this.resolution,
      0,
      0,
      this.resolution,
      -bounds.x * this.resolution,
      -bounds.y * this.resolution
    );

    const rt = this.rt;

    this.renderer.render({
      container: new Container(),
      target: rt!,
      clear: true,
      transform: this.transform,
    });

    const renderOne = (node: Container) => {
      const nb = node.getBounds() as RectLike;
      if (!rectsIntersect(bounds, nb)) return;

      this.renderer.render({
        container: node,
        target: rt!,
        clear: false,
        transform: this.transform,
      });
    };

    if (this.debugContainer) {
      let debugSprite: Sprite | null = null;
      if (!debugSprite) {
        debugSprite = new Sprite(this.rt!);
        debugSprite.anchor.set(0);
        debugSprite.position.set(16, 16);
        debugSprite.scale.set(0.5);
        this.debugContainer.addChild(debugSprite as any);
      } else {
        // @ts-ignore
        debugSprite.texture = this.rt;
      }
    }

    if (Array.isArray(target)) {
      for (let i = 0; i < target.length; i++) {
        const o = target[i];
        // @ts-ignore
        if (!(o as any).renderable || !(o as any).worldVisible) continue;
        renderOne(o);
      }
    } else {
      this.renderer.render({
        container: target,
        target: rt!,
        clear: false,
        transform: this.transform,
      });
    }

    const { pixels: clamped } = this.renderer.extract.pixels(this.rt);
    const pixels = new Uint8Array(
      clamped.buffer,
      clamped.byteOffset,
      clamped.byteLength
    );
    const total = w * h;
    const thr = this.alphaThreshold;

    let covered = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] > thr) covered++;
    }

    return {
      pixelsCovered: covered,
      pixelsTotal: total,
      ratio: total > 0 ? covered / total : 0,
      bounds: { x: 0, y: 0, width: bounds.width, height: bounds.height },
    };
  }

  destroy() {
    if (this.rt) {
      this.rt.destroy(true);
      this.rt = null;
    }
  }
}

function rectsIntersect(a: RectLike, b: RectLike): boolean {
  return !(
    b.x > a.x + a.width ||
    b.x + b.width < a.x ||
    b.y > a.y + a.height ||
    b.y + b.height < a.y
  );
}
