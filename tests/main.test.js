import { shipFactory } from "../src/gameLogicModule.js";
import { gameBoredFactory } from "../src/gameLogicModule.js";
import { player } from "../src/gameLogicModule.js";

test("ShipTest: is sunk", () => {
  const ship = shipFactory(1);
  ship.hit();
  expect(ship.isSunk()).toBe(1);
});

test("ShipTest: is not sunk", () => {
  const ship = shipFactory(2);
  ship.hit();
  expect(ship.isSunk()).toBe(0);
});

test("GameBoredTest: ship got hit", () => {
  const gB1 = gameBoredFactory();
  gB1.placeShip(gB1.fleet[0], "1a", 1);
  gB1.receiveAttack("1a");
  expect(gB1.fleet[0].hits).toBe(1);
});

test("GameBoredTest: ship is not hit", () => {
  const gB1 = gameBoredFactory();
  gB1.placeShip(gB1.fleet[0], "1a", 1);
  gB1.receiveAttack("1b");
  expect(gB1.fleet[0].hits).toBe(0);
});

test("GameBoredTest: all ships are sunk", () => {
  const gB1 = gameBoredFactory();
  gB1.placeShip(gB1.fleet[0], "1a", 1);
  gB1.receiveAttack("1a");
  gB1.receiveAttack("2a");
  gB1.receiveAttack("3a");
  gB1.receiveAttack("4a");
  gB1.receiveAttack("5a");

  gB1.placeShip(gB1.fleet[1], "1c", 0);
  gB1.receiveAttack("1c");
  gB1.receiveAttack("1d");
  gB1.receiveAttack("1e");
  gB1.receiveAttack("1f");

  gB1.placeShip(gB1.fleet[2], "3c", 0);
  gB1.receiveAttack("3c");
  gB1.receiveAttack("3d");
  gB1.receiveAttack("3e");

  gB1.placeShip(gB1.fleet[3], "5c", 0);
  gB1.receiveAttack("5c");
  gB1.receiveAttack("5d");
  gB1.receiveAttack("5e");

  gB1.placeShip(gB1.fleet[4], "7c", 0);
  gB1.receiveAttack("7c");
  gB1.receiveAttack("7d");
  expect(gB1.allSunk()).toBeTruthy();
});

test("AI: can make a move", () => {
  const p1 = player();
  const gB1 = gameBoredFactory()
  gB1.receiveAttack(p1.aI())
  expect(gB1.warLog.length).toEqual(1)
})

test("AI: will not shoot the same spot twice", () => {
  const p1 = player();
  const gB1 = gameBoredFactory()
  for (let i = 0; i < 100; i++){
    gB1.receiveAttack(p1.aI())
  }
  expect(gB1.warLog.length).toEqual(100 )
})