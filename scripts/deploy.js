const { ethers, run, network } = require("hardhat");

async function main() {
  const simpleStorageContract = await ethers.getContractFactory(
    "SimpleStorage"
  );

  const deployedContract = await simpleStorageContract.deploy();

  await deployedContract.deployed();

  console.log(`Deployed COntract to: ${deployedContract.address}`);

  console.log(network.config);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await deployedContract.deployTransaction.wait(6);  //wait for block confirmations. REALLY IMPORTANT
    await verify(deployedContract.address, []);
  }

  const currentValue = await deployedContract.retrieve();
  console.log(`Current value is ${currentValue}`);
  const tx = await deployedContract.store(26);
  await tx.wait();

  const updatedValue = await deployedContract.retrieve();
  console.log(`Updated value is : ${updatedValue}`);
}

// 0x8b94eBD0a867A490066B7b4DCC15E0485F8ceca9
async function verify(contractAddress, args) {
  //a better way of writing verification scripts just as you deploy the contracts
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
