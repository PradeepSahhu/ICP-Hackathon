# **Decentralized Donation and Investment Platform**

## **Description**

We are building a decentralized platform that enables users to donate to NGOs and support good causes while ensuring transparency and accountability. The platform allows NGOs to request funds, but every transaction is subject to the approval of donors. A notification is sent to all donors whenever an NGO wants to spend donated funds, and the transaction will only proceed if more than 50% of the donors approve it. Ultimately, the final decision is made by the organizer. The platform aims to combat money laundering, black money, and terrorism financing by providing transparency into the movement of funds.

## **Key Features**

- **Donation to NGOs**: Donate to NGOs with full transparency.
- **Transaction Approval**: Donors are notified whenever an NGO wishes to use donated funds and can approve or reject the transaction.
- **Campaign Information**: View details of ongoing and past campaigns and track the total funds raised by NGOs.
- **NGO Rankings**: Access rankings of top-performing NGOs.
- **Decentralized and Secure**: Built on the ICP blockchain for enhanced security and transparency.
- **Investment Platform**: Users can buy and sell stocks, access trading information, and monitor their investments.

## **Tech Stack**

- **Frontend**: React, Tailwind CSS, JavaScript, Three.js
- **Blockchain**: ICP (Internet Computer Protocol), Motoko
- **UI Components**: React for dynamic UI components, Tailwind CSS for styling, and Three.js for 3D elements

## **Installation & Setup**

### Prerequisites:

- Node.js and npm installed on your machine.
- ICP (Internet Computer Protocol) project setup (Motoko, canister, etc.).

### 1. **Clone the Repository**

```bash
git clone https://github.com/PradeepSahhu/ICP-Hackathon.git
cd ICP-Hackathon


## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

## Live Project
- **Frontend :** https://e7nng-5aaaa-aaaad-aalgq-cai.icp0.io/
- **Backend :** https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=eymls-qyaaa-aaaad-aalga-cai
