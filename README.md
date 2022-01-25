# Monthly Loan Calculator App

Server side application written in Node that listens for specific events from a Drift conversation, digests that information, and formulates a response that is sent back to the contact (site visitor) who is interacting with a Drift playbook. In this example, we will be asking the site visitor for some loan information in order to provide an accurate loan calculation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project leverages core libraries/dependencies that are listed below:

```
body-parser
dotenv
express
ngrok
node
nodemon
superagent
```

### Installing

Simply clone/download the repo locally and install the relevant dependences listed above. For a one line command to install the dependencies see below:

```
npm i body-parser dotenv express ngrok node nodemon superagent
```

Once installed navigate to the root directoy where the files resides and run the following command in the IDE of your choice 
```
node index.js
```

## Demo of End User Experience
![DRIFT-VIDEO-3045098-3149673-1643076676](https://user-images.githubusercontent.com/57994411/150898234-d06c3218-c1d8-456e-a8bd-7ffccb0ede56.gif)
