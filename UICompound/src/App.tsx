import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ethers } from "ethers";
import abi from "./abi.json";

import "./App.css";
const ReturnPromise = () => {
  type JSONRPC = ethers.JsonRpcProvider;

  const [provider, setProvider] = useState<JSONRPC>();
  const [signer, setSigner] = useState<ethers.Signer>();
  const [contract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    const providerDetails = async () => {
      const provider1 = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      // const signer1 = await provider.listAccounts();
      const signer1 = await provider1.getSigner(2);
      const signer2 = await provider1.getSigner(3);

      const contractPool = new ethers.Contract(
        "0xF837C675e5122D68a2B8bDfc4e50C59118Bd417E",
        abi.abi,
        signer1
      );

      const contractFaucet = new ethers.Contract(
        "0x68793eA49297eB75DFB4610B68e076D2A5c7646C",
        abi.abi2,
        signer1
      );

      const contractCompound = new ethers.Contract(
        "0xA6c8D1c55951e8AC44a0EaA959Be5Fd21cc07531",
        abi.abi3,
        signer1
      );

      // await contractFaucet.drip("0xa6c8d1c55951e8ac44a0eaa959be5fd21cc07531");
      const compBalance: number = await contractCompound.balanceOf(
        signer1.address
      );

      console.log(Number(compBalance));
      // await contractCompound.transfer(
      //   await contractPool.getAddress(),
      //   Number(compBalance) * 0.5
      // );
      // ethers;1
      const balanceValue = await contractPool.BalanceCheck();

      // await contractPool.supplyCollateral({ value: 100000000 });
      // const isBorrowAllowed = await contractPool.isBorrowAllowed();
      // const isLiquidatable = await contractPool.isLiquidatable();
      // console.log(
      //   ethers.toBigInt(balanceValue.data),
      //   signer1,
      //   signer2,
      //   isBorrowAllowed,
      //   isLiquidatable
      // );

      setProvider(provider1);
      setSigner(signer1);
      setContract(contractPool);
    };

    providerDetails();
  }, []);

  return [provider, signer, contract];
};

function App() {
  const [count, setCount] = useState(0);

  const [provider, signer, contract] = ReturnPromise();
  console.log(provider, signer, contract);
  if (contract) {
  }
  // console.log(providerDetails);
  // const;
  // console

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
