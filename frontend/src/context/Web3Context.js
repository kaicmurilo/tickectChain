import React, { createContext, useEffect, useState } from "react";
import TicketSaleContract from "../contracts/TicketSale.json";
import getWeb3 from "../utils/getWeb3";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = TicketSaleContract.networks[networkId];
        if (!deployedNetwork) {
          throw new Error("Contrato não implantado na rede selecionada");
        }
        const instance = new web3Instance.eth.Contract(
          TicketSaleContract.abi,
          deployedNetwork.address
        );

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(instance);
      } catch (error) {
        console.error("Erro ao conectar ao contrato:", error);
        setNotification({
          open: true,
          message: "Falha ao conectar ao MetaMask ou ao contrato.",
          severity: "error",
        });
      }
      setLoading(false);
    };
    init();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        contract,
        loading,
        notification,
        setNotification,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
