export const shipFactory = (len) => {
  // Factory function that makes ship object with the given length.
  let size = len;
  let hits = 0;
  return {
    size,
    hits,
    hit() {
      this.hits += 1;
    },
    isSunk() {
      return this.size === this.hits ? 1 : 0;
    },
  };
};

export const gameBoredFactory = () => {
  // Factory function that makes the game bored.
  const bored = (function createBored(x = 1, y = 97) {
    // Recursive function that makes 10 * 10 game bored.
    return x == 10 && y == 106
      ? [{ coordinates: x + String.fromCharCode(y), ship: 0 }]
      : y == 106
      ? [
          { coordinates: x + String.fromCharCode(y), ship: 0 },
          ...createBored((x += 1), 97),
        ]
      : [
          { coordinates: x + String.fromCharCode(y), ship: 0 },
          ...createBored(x, (y += 1)),
        ];
  })();

  const fleet = [5, 4, 3, 3, 2].map((len) => shipFactory(len));

  const warLog = [];
  const missedShots = [];

  // Function that place a ship on the game board givin a ship, starting point and how it is aligned.
  const placeShip = (ship, coordinates, alignment = 0) => {
    const start = bored.findIndex((tile) => tile.coordinates === coordinates);
    for (let i = 0; i < ship.size; i++) {
      alignment == 0
        ? (bored[start + i].ship = ship)
        : (bored[start + +`${i}0`].ship = ship);
    }
  };

  // Function that receive attacks and verify if it's a hit or a miss and act accordingly.
  // If it is a hit the ship take 1 damage point and if not the attack is recorded.
  const receiveAttack = (coordinates) => {
    if (warLog.includes(coordinates)) return;
    warLog.push(coordinates);
    const tile = bored.findIndex(
      (square) => square.coordinates === coordinates
    );
    bored[tile].ship ? bored[tile].ship.hit() : missedShots.push(coordinates);
  };

  // Function that verify if all ships have been sunk or not.
  const allSunk = () => {
    const result = fleet.filter((ship) => ship.isSunk() == 1);
    return result.length == 5 ? true : false;
  };

  return {
    bored,
    fleet,
    warLog,
    missedShots,
    placeShip,
    receiveAttack,
    allSunk,
  };
};

export const player = () => {
  // This object allow for turn switching and controls how AI player works.
  let aiTurn = 0;
  const aIMoves = [];
  const aI = () => {
    // The Y and X axis are decided by the random math method then checked if it's a duplicate or not.
    // If yes the function calls itself again.
    // If not the vale of Y and X axis are returned.
    let yAxis = Math.floor(Math.random() * 10 + 97);
    let xAxis = Math.floor(Math.random() * 10 + 1);
    if (!aIMoves.includes(xAxis + String.fromCharCode(yAxis))) {
      aIMoves.push(xAxis + String.fromCharCode(yAxis));
      aiTurn = 0;
      return xAxis + String.fromCharCode(yAxis);
    } else return aI()
  };
  return {
    aI
  };
};


