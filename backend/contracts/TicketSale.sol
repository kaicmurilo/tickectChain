// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketSale {
    address public owner;
    uint public ticketPrice;
    uint public ticketsAvailable;

    mapping(address => uint) public ticketsOwned;

    event TicketPurchased(address buyer, uint amount);

    constructor(uint _ticketPrice, uint _ticketsAvailable) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        ticketsAvailable = _ticketsAvailable;
    }

    function buyTickets(uint _amount) public payable {
        require(msg.value == _amount * ticketPrice, "Valor incorreto enviado");
        require(ticketsAvailable >= _amount, "Ingressos insuficientes");

        ticketsOwned[msg.sender] += _amount;
        ticketsAvailable -= _amount;

        emit TicketPurchased(msg.sender, _amount);
    }

    function withdraw() public {
        require(msg.sender == owner, unicode"Apenas o proprietário pode sacar");
        payable(owner).transfer(address(this).balance);
    }
}
