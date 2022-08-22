declare global {
  interface Array<T> {
    random(): Array<T>;
  }
}

Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
}

export {};
