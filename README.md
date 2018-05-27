# Project-Team-7
## Employee Review BlockChain Network
**Protecting companies against wrongful termination lawsuits by their employees.**


**Concept and Working**

Wrongful termination lawsuit are very common these days. After getting terminated many employees file wrong termination lawsuits against the companies primarily because of the easy availability of lawyers and supporting agencies and websites. However, the ground for filing a lawsuit is unclear many time.According to one survey, approximately 42000 cases were filed in 2016 under the category retaliation and only 86 were found to be solved and legitimate. Still, for the rest of the cases, the company has to bear all the legal expenses till the case is resolved. To save this extra financial overhead, we are proposing a new review system based on blockchain. From our study it was found that performance of the employee is not the only reason for which he/she may get terminated. There may be several other causes such as policy breach, taking too many long leaves, complaint due to bad behaviour with peers and even fake health issues.

Prior to this, there was no centralized and secured dataset maintaining these small yet relevant records. Moreover, even if the reason for termination was present in the record, employee lawyers would prove that the data was being modified and hence cannot be trusted.  Hence, in-order buildtrust we are using blockchain to keeping employee records. Blockchain is governed by hash function which depends on the hashing of the previous block. Initial block is called the genesis block which is created at the start of blockchain network. Blockchain adds data in the blockchain network on the basis of consensus i.e mutual agreement between it peers. At any point existing data cannot be modified or updated  due to the presence of strong hashing algorithm and consensus. To simplify and shorten the time of development we are using Hyperledger Composer framework which internally uses couchDB, NodeJS and yeoman to build our blockchain network and provide Rest API services can be integrated on any frontend platform. Express is used a backend along with MongoDB and CouchDB database and ReactJS and Redux as frontend framework.

### Architecture
![architecture](https://user-images.githubusercontent.com/31717682/34090188-04ce2c7e-e36a-11e7-8b51-8ef801ce57c1.png)


In our project Manager, Employee, HR and Team Lead are the participants that are taking part in read/write access for adding any type of employee record. At the same time employee has right to view his history and track record. We are also demonstrating the transaction history so that we have a clear picture as in who added the record, when and for whom. To have a quick glimpse of employee review history, we are running heavy analysis on existing json data and using react-chartjs-2 to show meaningful graphical charts.Thus, the company has enough data to to prove its case on the other hand employee has clear understanding for his termination hence it is less likely to file a lawsuit for wrong termination. 

### Setup
To run reviewnet service from your PC
Download hyperledger composer runtime on your PC.
Copy Hyperledger composer backend folder in generated fabric-tools folder
Once copies follow the below steps to start reviewnet service on your machine.

cd ~/fabric-tools

./stopFabric.sh

./teardownFabric.sh

./startFabric.sh

./createPeerAdminCard.sh
cd reviewnet

rm -f *.bna

composer archive create -t dir -n .

composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName reviewnet

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile reviewnet@0.0.1.bna --file networkadmin.card

composer-rest-server

Follow the documentation below for more information 
https://hyperledger.github.io/composer/tutorials/developer-tutorial.html

The working application can be accessed by using below url.
http://reviewnet.hopto.org
