import React, { useContext } from "react";
import { ImmutableContext } from "../context/context";

const Navbar = () => {
  const { account } = useContext(ImmutableContext);

  return (
    <nav className="px-4 py-4 flex justify-between items-center shadow-md">
      <div className="text-white text-4xl font-bold">Immutable</div>
      {account ? (
        <div className="text-text-gray-500 font-bold">{account}</div>
      ) : (
        <div className="text-text-gray-500 font-bold">Connect Wallet</div>
      )}
    </nav>
  );
};

export default Navbar;
