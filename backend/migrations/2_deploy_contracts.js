const TicketSale = artifacts.require("TicketSale");

module.exports = function (deployer) {
  const ticketPrice = web3.utils.toWei("0.1", "ether");
  const ticketsAvailable = 100;
  deployer.deploy(TicketSale, ticketPrice, ticketsAvailable);
};
