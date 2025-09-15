import { Ticker as PixiTicker } from "pixi.js";

type TickerEvent = "start" | "update" | "end";
type Handler = (...args: any[]) => void;

export class TimedEvent {
  private static shared = PixiTicker.shared;
  private handlers: Record<TickerEvent, Handler[]> = {
    start: [],
    update: [],
    end: [],
  };

  private running = false;
  private started = false;
  private delayMs = 0;
  private elapsedMs = 0;
  private endTIme = 0;

  constructor() {
    this.update = this.update.bind(this);
    TimedEvent.shared.add(this.update);
  }

  on(event: TickerEvent, handler: Handler): this {
    this.handlers[event].push(handler);
    return this;
  }

  start(delayMs = 0, endTIme = 0): this {
    if (this.running) return this;
    this.running = true;
    this.started = false;
    this.delayMs = Math.max(0, delayMs);
    this.elapsedMs = 0;
    this.endTIme = endTIme;
    TimedEvent.shared.add(this.update);
    return this;
  }

  end(): this {
    if (!this.running) return this;
    this.running = false;
    this.started = false;
    TimedEvent.shared.remove(this.update);
    this.emit("end");
    return this;
  }

  private update(t: PixiTicker) {
    if (!this.running) return;
    const dt = t.deltaMS;
    this.elapsedMs += dt;

    if (this.elapsedMs < this.delayMs) return;
    if (this.started === false) {
      this.started = true;
      this.emit("start");
    }

    if (
      this.endTIme > 0 &&
      Math.abs(this.elapsedMs - this.delayMs) >= this.endTIme
    ) {
      this.end();
      return;
    }

    this.emit("update", dt);
  }

  private emit(event: TickerEvent, ...args: any[]) {
    for (const h of this.handlers[event]) h(...args);
  }

  destroy(): void {
    TimedEvent.shared.remove(this.update);
    this.handlers = { start: [], update: [], end: [] };
  }
}
