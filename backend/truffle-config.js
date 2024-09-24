module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Endereço local
      port: 8545, // Porta padrão do Ganache
      network_id: "*", // Qualquer rede
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Versão do Solidity
    },
  },
};
