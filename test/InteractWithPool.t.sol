// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {LendingPoolSetup} from '../src/CompoundMain.sol';
import {InteractFromPool} from "../src/InteractWithPool.sol";
import "openzeppelin-contracts/contracts/interfaces/IERC20.sol";

   // uint256 eth1000=1000000000000000000000;
contract CometTest is Test {
   InteractFromPool public MainContract;
    address public constant USDCAddr=0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
    address public constant COMP=0xa035b9e130F2B1AedC733eEFb1C67Ba4c503491F;
    function setUp() public {
        

        // vm.startPrank(CompAccount);
        // MainContract=new LendingPoolSetup(0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e,0xc28aD44975C614EaBe0Ed090207314549e1c6624);
        MainContract=new InteractFromPool(COMP,0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e); 
        //1st address is the supplyAsset 
        //2nd address is the baseAsset proxy (USDC from compound)
    }

    function testFuzz_Setup() public {
       
        // MainContract.setFactory()
        address accountMain=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        address collateralBuyer=0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        
        // vm.startPrank(collateralBuyer);
        // deal(USDCAddr,collateralBuyer, 10e12); 
        // IERC20(USDCAddr).approve(address(MainContract), 10e11);
        // MainContract.BuyCollateral(COMP, 10e10);

        vm.startPrank(accountMain);
        deal(COMP,address(MainContract), 10e18);
        
        console.log(IERC20(COMP).balanceOf(address(MainContract)));
        MainContract.supplyCollateral{value:1500000000000}();
        console.log(IERC20(USDCAddr).balanceOf(accountMain));
        MainContract.BorrowAsset(USDCAddr, 2e9);
        console.log(IERC20(USDCAddr).balanceOf(accountMain));
        MainContract.isLiquidatable();
         //Borrow USDC using Compound supply provided above
    }

    function run() public{

    }
}
