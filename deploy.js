const main = async () => {
  const Immutable = await hre.ethers.getContractFactory("Immutable");
  const immutable = await Immutable.deploy();

  await immutable.deployed();

  console.log("Immutable deployed to:", immutable.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();