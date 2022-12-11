import { ethers } from 'hardhat'

async function main() {
  const Horses = await ethers.getContractFactory("Horses")
  const horses = await Horses.deploy()

  await horses.deployed()

  console.log(`Horses deployed to ${horses.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
