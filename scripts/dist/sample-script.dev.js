"use strict";

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
var hre = require("hardhat");

function main() {
  var Greeter, greeter;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(hre.ethers.getContractFactory("MemeNFT"));

        case 2:
          Greeter = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Greeter.deploy("Hello, Hardhat!"));

        case 5:
          greeter = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(greeter.deployed());

        case 8:
          console.log("Greeter deployed to:", greeter.address);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
} // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


main().then(function () {
  return process.exit(0);
})["catch"](function (error) {
  console.error(error);
  process.exit(1);
});