type Handler<T> = (payload: T) => void;

class PubSub<T = void> {
  private handlers = new Set<Handler<T>>();

  subscribe(handler: Handler<T>): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  once(handler: Handler<T>): () => void {
    const off = this.subscribe((p) => {
      off();
      handler(p);
    });
    return off;
  }

  emit(payload: T extends void ? undefined : T = undefined as any): void {
    [...this.handlers].forEach((h) => h(payload as T));
  }

  clear(): void {
    this.handlers.clear();
  }
}

export default PubSub;
