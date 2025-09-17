// const { default: Web3 } = require("web3");

async function contract_changeOwner(contract, newOwner) {
    try {
        var data = await contract.methods.changeOwner(newOwner).send({ from: web3.eth.defaultAccount });
    } catch (error) {
        console.log(error);
        alert("Unable to change Owner!");
    }

}

async function contract_getOwner(contract) {
    try {
        var data = await contract.methods.owner().call();
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get Contract Owner!");
        return null;
    }
}

async function contract_setRole(contract, userAddress, userName, userRole) {
    try {
        var data = await contract.methods.setRole(userAddress, userName, userRole).send({ from: web3.eth.defaultAccount });
        alert("Set Role Successfully!");
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to set Role!");
    }
}

async function contract_getRole(contract, userAddress) {
    try {
        var data = await contract.methods.getRole(userAddress).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get Role!");
    }
}

async function contract_getBankName(contract, bankAddress) {
    try {
        var data = await contract.methods.getBankName(bankAddress).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get Bank Name!");
    }
}

async function contract_getClientName(contract, clientAddress) {
    try {
        var data = await contract.methods.getClientName(clientAddress).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get Client Name!");
    }
}

async function contract_setPermission(contract, userAddress, givePermission) {
    try {
        var data = await contract.methods.setPermission(userAddress, givePermission).send({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        alert("Unable to set permit!");
        console.log(error);
    }
}

async function contract_checkPermission(contract, userAddress) {
    try {
        var data = await contract.methods.checkPermission(userAddress).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get check permission!");
    }
}

async function contract_getAllPermittedAccount(contract) {
    try {
        var data = await contract.methods.getAllPermittedAccount().call();
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get check permission!");
    }
}


async function contract_checkMutual(contract, bankAddress, clientAddress) {
    try {
        var data = await contract.methods.checkMutual(bankAddress, clientAddress).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get check Mutual!");
    }
}

async function contract_setClientRecord(contract, id, loanDate, clientAddress, amount, endDate, status) {
    try {
        var data = await contract.methods.setClientRecord(id, loanDate, clientAddress, amount, endDate, status).send({ from: web3.eth.defaultAccount });
    } catch (error) {
        console.log(error);
        alert("Unable to get set client record!");
    }
}

async function contract_getClientAllRecord(contract, clientAddress) {
    try {
        var data = await contract.methods.getClientAllRecord(clientAddress).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get all client record!");
    }
}

async function contract_getClientRecordByID(contract, clientAddress, recordID) {
    try {
        var data = await contract.methods.getClientRecordByID(clientAddress, recordID).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get client record by ID!");
    }
}

async function contract_updateRecordStatusByID(contract, clientAddress, recordID, status) {
    try {
        var data = await contract.methods.updateRecordStatusByID(clientAddress, recordID, status).send({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to update record by status ID");
    }
}

async function contract_generateClientCreditScore(contract, clientAddress) {
    try {
        var data = await contract.methods.generateClientCreditScore(clientAddress).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to generate Credit Score!");
    }
}

async function contract_getAllMyRecord(contract) {
    try {
        var data = await contract.methods.getAllMyRecord().call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get my record!");
    }
}

async function contract_getMyRecordByID(contract, recordID) {
    try {
        var data = await contract.methods.getMyRecordByID(recordID).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to get my record ID!");
    }
}

async function contract_generateMyCreditScore(contract) {
    try {
        var data = await contract.methods.generateMyCreditScore().call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable to generate my credit score!");
    }
}

async function contract_compareStrings(contract, a, b) {
    try {
        var data = await contract.methods.compareStrings(a, b).call({ from: web3.eth.defaultAccount });
        return data;
    } catch (error) {
        console.log(error);
        alert("Unable compare string");
    }
}