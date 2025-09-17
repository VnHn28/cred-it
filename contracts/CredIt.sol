//SPDX-License-Identifier: SimPL-2.0

pragma solidity 0.8.13;

contract CredIt{
    address private owner;


//enums
    enum Role{
        Vacant, //空的
        Client,
        Bank
    }
    
    enum Status{
        None, //預設
        Closed,
        Ongoing,
        Failed,
        Late
    }
    

//structs
    struct loan{
        string id;
        uint loanDate;
        address bankAddress;
        address clientAddress;
        uint amount;
        uint endDate;
        Status status;
    }

    struct Bank{
        address account;
        string name;
        mapping(address=>bool) clientMap; 
        address[] clientIndex;

    }

    struct Client{
        address account;
        string name;
        mapping(address=>bool) bankMap;
        address[] bankIndex;
        mapping(string=>loan) recordMap;
        string[] recordIndex;
    }
   

//mappings
    mapping (address=>Bank) internal banks;
    mapping (address=>Client) internal clients;
    mapping (address=>Role) private roles;


//events
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event RoleSet(address indexed userAddress, Role userRole);


//modifiers
    modifier onlyOwner(){
        require(msg.sender == owner, "Caller is not owner!");
        _;
    }

    modifier onlyBank(){
        require(roles[msg.sender]==Role.Bank, "Caller is not bank!");
        _;
    }

    modifier onlyClient(){
        require(roles[msg.sender]==Role.Client, "Caller is not client!");
        _;
    }


//constructor
    constructor() {
        owner = msg.sender; 
        //emit OwnerSet(address(0), owner);
    }
    

//ownerfunctions管理者
    function changeOwner(address _newOwner) public onlyOwner {
        require (_newOwner != owner, "new owner can't be the same as old owner!");
        owner = _newOwner;
        emit OwnerSet(owner, _newOwner);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function setRole(address _userAddress, string memory _userName, Role _userRole) public onlyOwner{
        require (_userAddress != msg.sender, "failed to set own role!");
        roles[_userAddress]=_userRole;
        if(_userRole==Role.Bank){
            //banks[_userAddress]=Bank({account: _userAddress, name: _userName});
            Bank storage newBank = banks[_userAddress];
            newBank.account = _userAddress;
            newBank.name = _userName;
            emit RoleSet(_userAddress, _userRole);

        } else if(_userRole==Role.Client){
            //clients[_userAddress]=Client({account: _userAddress, name: _userName});
            Client storage newClient = clients[_userAddress];
            newClient.account = _userAddress;
            newClient.name = _userName;
            emit RoleSet(_userAddress, _userRole);
            
        }
    }


//functions銀行、用戶
    function getRole(address _userAddress) public view returns (Role){
        return roles[_userAddress];
    }

    function getBankName(address _bankAddress) public view returns (string memory bankName){  
        return (banks[_bankAddress].name);
    }

    function getClientName(address _clientAddress) public view returns (string memory clientName){  
        return (clients[_clientAddress].name);
    }

    function setPermission(address _userAddress, bool _givePermission) public {
        require (_userAddress != msg.sender, "cannot give permission to self!");
        if(_givePermission==true){
            if(roles[msg.sender]==Role.Bank){
                banks[msg.sender].clientMap[_userAddress]=_givePermission;
                banks[msg.sender].clientIndex.push(_userAddress);
            } else if(roles[msg.sender]==Role.Client){
                clients[msg.sender].bankMap[_userAddress]=_givePermission;
                clients[msg.sender].bankIndex.push(_userAddress);
            } 
        } else if(_givePermission==false){
            if(roles[msg.sender]==Role.Bank){
                banks[msg.sender].clientMap[_userAddress]=_givePermission;
                for(uint i=0; i<banks[msg.sender].clientIndex.length; i++){
                    if(banks[msg.sender].clientIndex[i]==_userAddress){
                        banks[msg.sender].clientIndex[i]=banks[msg.sender].clientIndex[banks[msg.sender].clientIndex.length-1];
                        break;
                    }    
                }
                banks[msg.sender].clientIndex.pop();
            } else if(roles[msg.sender]==Role.Client){
                clients[msg.sender].bankMap[_userAddress]=_givePermission;
                for(uint i=0; i<clients[msg.sender].bankIndex.length; i++){
                    if(clients[msg.sender].bankIndex[i]==_userAddress){
                        clients[msg.sender].bankIndex[i]=clients[msg.sender].bankIndex[clients[msg.sender].bankIndex.length-1];
                        break;
                    }    
                }
                clients[msg.sender].bankIndex.pop();
            } 
        }
    }

    function checkPermission(address _userAddress) public view returns (bool allowed){
        require (_userAddress != msg.sender, "inputted address cannot be your own address!");
        if(roles[msg.sender]==Role.Bank){
            return (banks[msg.sender].clientMap[_userAddress]);
        } else if(roles[msg.sender]==Role.Client){
            return (clients[msg.sender].bankMap[_userAddress]);
        }
    }

    function getAllPermittedAccount() public view returns (address[] memory addressList){
        if(roles[msg.sender]==Role.Bank){
            return (banks[msg.sender].clientIndex);
        } else if(roles[msg.sender]==Role.Client){
            return (clients[msg.sender].bankIndex);
        }
    }

    function checkMutual(address _bankAddress, address _clientAddress) internal view returns (bool mutual){
        require(_bankAddress==msg.sender || _clientAddress==msg.sender, "Caller has to be at least one of either addresses!");
        if(banks[_bankAddress].clientMap[_clientAddress]==true&&clients[_clientAddress].bankMap[_bankAddress]==true){
            return true;
        } else {
            return false;
        }
    }

    function setClientRecord(string memory _id, uint _loanDate, address _clientAddress, uint _amount, uint _endDate, Status _status) public onlyBank{
        require(checkMutual(msg.sender, _clientAddress)==true, "is not mutual!");
        loan memory newLoan;
        newLoan=loan({id:_id, loanDate:_loanDate, bankAddress:msg.sender, clientAddress:_clientAddress, amount:_amount, endDate:_endDate, status:_status});
        clients[_clientAddress].recordMap[_id]=newLoan;
        clients[_clientAddress].recordIndex.push(_id);
    }

    function getClientAllRecord(address _clientAddress) public view onlyBank returns (loan[] memory){
        require(checkMutual(msg.sender, _clientAddress)==true, "is not mutual!");
        loan[] memory temparray = new loan[](clients[_clientAddress].recordIndex.length);
        for(uint i=0; i<clients[_clientAddress].recordIndex.length; i++){
            loan memory temploan = clients[_clientAddress].recordMap[clients[_clientAddress].recordIndex[i]];
            temparray[i] = temploan;
        }
        return (temparray); 
    }

    function getClientRecordByID(address _clientAddress, string memory _recordID) public view onlyBank returns(loan memory){
        require(checkMutual(msg.sender, _clientAddress)==true, "is not mutual!");
        loan memory temploan;
        for(uint i=0; i<clients[_clientAddress].recordIndex.length; i++){
            if(compareStrings(clients[_clientAddress].recordIndex[i], _recordID)){
                temploan = clients[_clientAddress].recordMap[clients[_clientAddress].recordIndex[i]];
                return (temploan);
            }
        }
        return (temploan);
    }

    function updateRecordStatusByID(address _clientAddress, string memory _recordID, Status _status) public onlyBank{
        require(checkMutual(msg.sender, _clientAddress)==true, "is not mutual!");
        for(uint i=0; i<clients[_clientAddress].recordIndex.length; i++){
            if(compareStrings(clients[_clientAddress].recordIndex[i], _recordID)){
                clients[_clientAddress].recordMap[clients[_clientAddress].recordIndex[i]].status=_status;
                break;
            }
        }
    }

    function generateClientCreditScore(address _clientAddress) public view onlyBank returns(uint32 creditScore){
        require(checkMutual(msg.sender, _clientAddress)==true, "is not mutual!");

        uint32 tempScore;
        if(clients[_clientAddress].recordIndex.length==0){
            tempScore=0;
        } else if(clients[_clientAddress].recordIndex.length>0){
            tempScore=650;
        }
        uint32 finalScore;
        
        for(uint i=0; i<clients[_clientAddress].recordIndex.length; i++){
            string memory record = clients[_clientAddress].recordIndex[i];
            //loan memory temploan = clients[_clientAddress].recordMap[record];
            if(clients[_clientAddress].recordMap[record].status==Status.Failed){
                tempScore-=125;
            } else if(clients[_clientAddress].recordMap[record].status==Status.Late){
                tempScore-=50;
            } else if(clients[_clientAddress].recordMap[record].status==Status.Closed){
                tempScore+=35;
            } else if(clients[_clientAddress].recordMap[record].status==Status.Ongoing){
                tempScore+=15;
            } 
        }

        if(tempScore>850){
            finalScore=850;
        } else if(tempScore<0){
            finalScore=0;
        } else {
            finalScore=tempScore;
        }
        return (finalScore); 
    }

    function getAllMyRecord() public view onlyClient returns (loan[] memory){
        loan[] memory temparray = new loan[](clients[msg.sender].recordIndex.length);
        for(uint i=0; i<clients[msg.sender].recordIndex.length; i++){
            loan memory temploan = clients[msg.sender].recordMap[clients[msg.sender].recordIndex[i]];
            temparray[i] = temploan;
        }
        return (temparray); 
    }

    function getMyRecordByID(string memory _recordID) public view onlyClient returns(loan memory){
        loan memory temploan;
        for(uint i=0; i<clients[msg.sender].recordIndex.length; i++){
            if(compareStrings(clients[msg.sender].recordIndex[i], _recordID)){
                temploan = clients[msg.sender].recordMap[clients[msg.sender].recordIndex[i]];
                return (temploan);
            }
        }
        return (temploan);
    }

    function generateMyCreditScore() public view onlyClient returns(uint32 creditScore){
        
        uint32 tempScore;
        if(clients[msg.sender].recordIndex.length==0){
            tempScore=0;
        } else if(clients[msg.sender].recordIndex.length>0){
            tempScore=650;
        }
        uint32 finalScore;
        
        
        for(uint i=0; i<clients[msg.sender].recordIndex.length; i++){
            string memory record = clients[msg.sender].recordIndex[i];
            //loan memory temploan = clients[msg.sender].recordMap[record];
            if(clients[msg.sender].recordMap[record].status==Status.Failed){
                tempScore-=125;
            } else if(clients[msg.sender].recordMap[record].status==Status.Late){
                tempScore-=50;
            } else if(clients[msg.sender].recordMap[record].status==Status.Closed){
                tempScore+=35;
            } else if(clients[msg.sender].recordMap[record].status==Status.Ongoing){
                tempScore+=15;
            } 
        }

        if(tempScore>850){
            finalScore=850;
        } else if(tempScore<0){
            finalScore=0;
        } else {
            finalScore=tempScore;
        }
        return (finalScore); 
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool){
        return (keccak256 (abi.encodePacked((a)))) == (keccak256 (abi.encodePacked((b))));
    }
}