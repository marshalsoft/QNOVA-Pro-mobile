import { useDispatch } from 'react-redux';
import { UserDataModel } from '../includes/types';

const initialState: UserDataModel = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isActive: false,
  distressSignUp: false,
  bvnVerifiedAt: "",
  createdAt: "",
  dateOfBirth: "",
  id: "",
  isEmailVerified: false,
  isPinSet: false,
  password: "",
  preference: "",
  referralCode: "",
  refferedBy: "",
  updatedAt: "",
  balance: "0.00",
  prevBalance: "0.00",
  currency: "",
  faceId: false,
  hideAccount: false,
  loginWithPin: false,
  getNotification: false,
  appActivities: false,
  banks: [],
  cards: [],
  transactions: [],
  portfolioList: [],
  wallets: [],
  inDistress: false, 
  is2FaEnabled: false,
  creationOfDistressPin: false,
  creationOfNextOfKin: false,
  creationOfEmergencyPreference: false,
  fundingOfAccount: false,
  creationOfSafeWord: false,
  isBiometricsEnabled: false,
  isBvnVerified: true,
  address: '',
  accountStatus: "",
  createAccountFormList: {
    BusinessDetails:
      { status: "selected" },
    KeyContactDetails:
      { status: "invalid" },
    UploadDocuments:
      { status: "invalid" }
  },
  bills: {
    airtime: [],
    data: [],
    tv: [],
    electricity: []
  },
  airtimeProviders: [],
  dataProviders: [],
  utilityProviders: [],
  tvProviders: [],
  businessProfile: [],
  country: "NG",
  deviceId: "",
  emailVerifiedAt: null,
  gender: "",
  isOpamProtected: false,
  lastPasswordReset: null,
  phoneVerifiedAt: null,
  playerId: "",
  transactionPin: "",
  transactionPinUpdateAt: "",
  username: "",
  selectedBusiness: null,
  preferences: {
    notifications: []
  },
  theme: "light",
  language: "en",
  biometric: null,
  OpamProtectAccountNumber:{
    accountType:"",
    accountNumber:"",
    bankCode:""
  },
  distress_pin:""
};

const AppReducer = (state = initialState, action: any) => {
  console.log(action.payload);
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default AppReducer;

export const useStoreHook = () => {
  const dispath = useDispatch();
  const update = (payload: any) => {
    dispath({ type: "update", payload: payload });
  }
  return {
    update
  }
}