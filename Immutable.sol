// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Immutable {
    struct Complaint {
        address complainant;
        string name;
        string contact;
        string location;
        uint256 timestamp;
        string description;
        string evidenceId;
    }

    mapping(bytes32 => Complaint) public complaints;

    event ComplaintFiled(bytes32 indexed txHash, address indexed complainant);

    function fileComplaint(
        string memory _name,
        string memory _contact,
        string memory _location,
        string memory _description,
        string memory _evidenceId
    ) public {
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        complaints[txHash] = Complaint(
            msg.sender,
            _name,
            _contact,
            _location,
            block.timestamp,
            _description,
            _evidenceId
        );
        emit ComplaintFiled(txHash, msg.sender);
    }

    function fetchComplaint(bytes32 _txHash)
        public
        view
        returns (
            address complainant,
            string memory name,
            string memory contact,
            string memory location,
            uint256 timestamp,
            string memory description,
            string memory evidenceId
        )
    {
        Complaint memory complaint = complaints[_txHash];
        require(
            complaint.complainant != address(0),
            "Complaint not found for the provided transaction hash"
        );
        return (
            complaint.complainant,
            complaint.name,
            complaint.contact,
            complaint.location,
            complaint.timestamp,
            complaint.description,
            complaint.evidenceId
        );
    }
}