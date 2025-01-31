# QNova-PRO - React Native App

## Overview

QNova-PRO is a React Native banking application that offers users a comprehensive and secure platform to register a business name, manage profile and their finances.

## Features

- **User onboarding**: Creation of accounts (Individual,Business), CAC registration and dashboard overview.
- **Digital wallet**: Funding of wallet , Transfer money between accounts or to external beneficiaries.
- **Security**: Secure login with biometric authentication and PIN protection.
- **Profile Management**: Update personal information and manage account settings.
- **Notifications**: Receive alerts for transactions, bill due dates, and special offers.
- **Customer Support**: Get help through in-app notification, email, or phone support.

## Installation

To run the QNova-Pro locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/OPAM-Financial/QNovaPro.git
    cd QNova-PRO
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```
   or
    ```bash
    yarn install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory using the `.env.example` template.

4. **Link Native Modules** (if necessary):
    ```bash
    npx react-native link
    ```

5. **Run the App**:
   - **iOS**:
        ```bash
        npx pod-install ios
        npx react-native run-ios
        ```
   - **Android**:
        ```bash
        npx react-native run-android
        ```

## Project Structure

```plaintext
QNova-PRO/
├── android/               # Native Android code
├── ios/                   # Native iOS code
├── src/                   # React Native source code
│   ├── components/        # Reusable UI components
│   ├── components/        # All components
├── .env                   # Environment 
assets
│   ├── fonts/              # All fonts 
images                      # All image assets 
includes                    # All services and constants 
screens
│   ├── forgotPasswordOPTScreen/           
│   ├── forgotPasswordScreen/  
│   ├── introScreen/   
│   ├── loginScreen/       
│   ├── signUpScreen/  
Redux                       # reducer and store     
configuration
│   ├── styles/            # Global styles 
variables
├── .gitignore             # Files and directories to ignore in Git
├── app.json               # App configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation 
