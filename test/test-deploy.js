const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async () => {
    //write this function to execute before any tests are done. You can say "before each test"
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favourite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue);  another way you can do this
  });

  //use the "only" method to run that test only
  //   it.only("Should update whenever we call the store function", async () => {
  //     const expectedValue = "7";
  //     const tx = await simpleStorage.store(expectedValue);

  //     await tx.wait(1);

  //     const currentValue = await simpleStorage.retrieve();

  //     assert.equal(currentValue.toString(), expectedValue);
  //   });
  it("Should update whenever we call the store function", async () => {
    const expectedValue = "7";
    const tx = await simpleStorage.store(expectedValue);

    await tx.wait(1);

    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should be able to retrieve each person's favorite number from the mapping", async () => {
    const expectedValue = "14";

    const tx = await simpleStorage.addPerson("Jane", "14");

    await tx.wait(1);

    const personsNumber = await simpleStorage.nameToFavoriteNumber("Jane");

    assert.equal(personsNumber.toString(), expectedValue);
  });
});
