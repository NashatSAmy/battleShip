import {shipFactory} from "../src/main.js"

test("testing tests", ()=> {
  const ship1 = shipFactory(1)
  const ship2 =shipFactory(2)
  ship1.hit()
  ship2.hit()
  expect(ship1.isSunk()).toMatch("Ship has sunk")
  expect(ship2.isSunk()).toMatch("Ship has not sunk")
})