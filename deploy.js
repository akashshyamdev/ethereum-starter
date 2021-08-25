const walletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const { PHRASE } = require('./config');

const provider = new walletProvider(PHRASE, 'https://rinkeby.infura.io/v3/21e523b9f70746289fb86611a47d199e');

const web3 = new Web3(provider);

async function deploy() {
	const accounts = await web3.eth.getAccounts();

	console.log(accounts);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ gas: '1000000', from: accounts[0], gasPrice: 5000000000 });

	console.log(result.options);
}

deploy();
