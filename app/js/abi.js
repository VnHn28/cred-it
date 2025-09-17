const Credit_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnerSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum CredIt.Role",
				"name": "userRole",
				"type": "uint8"
			}
		],
		"name": "RoleSet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "checkPermission",
		"outputs": [
			{
				"internalType": "bool",
				"name": "allowed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_clientAddress",
				"type": "address"
			}
		],
		"name": "generateClientCreditScore",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "creditScore",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "generateMyCreditScore",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "creditScore",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllMyRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "loanDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bankAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "clientAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "enum CredIt.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct CredIt.loan[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPermittedAccount",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "addressList",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_bankAddress",
				"type": "address"
			}
		],
		"name": "getBankName",
		"outputs": [
			{
				"internalType": "string",
				"name": "bankName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_clientAddress",
				"type": "address"
			}
		],
		"name": "getClientAllRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "loanDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bankAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "clientAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "enum CredIt.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct CredIt.loan[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_clientAddress",
				"type": "address"
			}
		],
		"name": "getClientName",
		"outputs": [
			{
				"internalType": "string",
				"name": "clientName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_clientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_recordID",
				"type": "string"
			}
		],
		"name": "getClientRecordByID",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "loanDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bankAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "clientAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "enum CredIt.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct CredIt.loan",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_recordID",
				"type": "string"
			}
		],
		"name": "getMyRecordByID",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "loanDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bankAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "clientAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "enum CredIt.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct CredIt.loan",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getRole",
		"outputs": [
			{
				"internalType": "enum CredIt.Role",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_loanDate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_clientAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endDate",
				"type": "uint256"
			},
			{
				"internalType": "enum CredIt.Status",
				"name": "_status",
				"type": "uint8"
			}
		],
		"name": "setClientRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_givePermission",
				"type": "bool"
			}
		],
		"name": "setPermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_userName",
				"type": "string"
			},
			{
				"internalType": "enum CredIt.Role",
				"name": "_userRole",
				"type": "uint8"
			}
		],
		"name": "setRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_clientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_recordID",
				"type": "string"
			},
			{
				"internalType": "enum CredIt.Status",
				"name": "_status",
				"type": "uint8"
			}
		],
		"name": "updateRecordStatusByID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]