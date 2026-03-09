type QueueItem = {
  fn: () => Promise<unknown>;
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
};

const MAX_CONCURRENT = 8;
let running = 0;
const queue: QueueItem[] = [];

function next() {
  while (running < MAX_CONCURRENT && queue.length > 0) {
    const item = queue.shift()!;
    running++;
    item
      .fn()
      .then(item.resolve)
      .catch(item.reject)
      .finally(() => {
        running--;
        next();
      });
  }
}

export function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    queue.push({ fn, resolve: resolve as (v: unknown) => void, reject });
    next();
  });
}
