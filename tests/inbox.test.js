const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
	// get list of all accounts
	accounts = await web3.eth.accounts;

	// deploy contract using account[0]
	inbox = await new web3.eth.Contract(interface)
		.deploy({ data: bytecode, arguments: ['HI There!'] })
		.send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		console.log(inbox);
	});
});
