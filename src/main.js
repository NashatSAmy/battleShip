export const shipFactory = (len) => {
  let size = len
  let hits = 0
  return {
    size,
    hits,
    hit() {this.hits += 1},
    isSunk() {return this.size === this.hits ? "Ship has sunk" : "Ship has not sunk"}
  }
};

