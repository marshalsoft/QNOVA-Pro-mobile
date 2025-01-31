import { ViewStyle } from 'react-native';
import { BillersPropItemProp } from '../screens/dashboard/home/components/billPayment';
import { CheckAvailablityTypes } from './useBiometricHook';

/* eslint-disable prettier/prettier */
export interface UserDataModel {
  middleName?: string;
  email?: string | null;
  phone?: string;
  lastLoginAt?: string;
  isBiometricsEnabled?: boolean;
  isBvnVerified?: boolean;
  address?: string;
  accountStatus?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  dateOfBirth?: string;
  id?: string;
  avatar?: string | null;
  createAccountFormList?: {
    BusinessDetails: FormStateProp;
    KeyContactDetails: FormStateProp;
    UploadDocuments: FormStateProp;
  };
  bills?: {
    airtime: BillersPropItemProp[];
    data: BillersPropItemProp[];
    tv: BillersPropItemProp[];
    electricity: BillersPropItemProp[];
  },
  wallets: WalletProps[];
  language: LanguageTypes;
  airtimeProviders: BillersPropItemProp[];
  dataProviders: BillersPropItemProp[];
  utilityProviders: BillersPropItemProp[];
  tvProviders: BillersPropItemProp[];
  businessProfile: BusinessProfileProps[];
  bvnVerifiedAt: string | null;
  country: string;
  deviceId: string;
  emailVerifiedAt: string | null,
  gender: string;
  isActive: boolean;
  isOpamProtected: boolean;
  lastPasswordReset: string | null;
  phoneVerifiedAt: string | null;
  playerId: string | null;
  transactionPin: string | null;
  transactionPinUpdateAt: string | null;
  updatedAt: string | null;
  username: string | null;
  selectedBusiness: BusinessProfileProps | null;
  preferences?: PreferenceProps;
  theme: ThemeProp;
  biometric: CheckAvailablityTypes;
  distressSignUp?:boolean;
  isEmailVerified?:boolean;
  password?:string;
  preference?:string;
  referralCode?:string;
   refferedBy?:string;
   balance?:string;
   prevBalance?:string;
   currency?:string;
   faceId?:boolean;
   hideAccount?:boolean;
   loginWithPin?:boolean;
   getNotification?:boolean;
   appActivities?:boolean;
   banks:[],
   cards:[],
   transactions:[],
   portfolioList:[],
   creationOfDistressPin?:boolean;
   creationOfNextOfKin?:boolean;
   creationOfEmergencyPreference?:boolean;
   fundingOfAccount?:boolean;
   creationOfSafeWord?:boolean;
   isPinSet?:boolean;
   OpamProtectAccountNumber?:{
    accountType:string;
    accountNumber:string;
    bankCode:string;
  },
  distress_pin:string;
}
export type ThemeProp = "light" | "dark" | "system";
export interface PreferenceProps {
  notifications?: NotificationsProps[];
  id?: number;
  userId?: string;
}
export interface NotificationsProps {
  allowed?: AllowedProps[];
  category?: string;
}
export interface AllowedProps {
  enabled?: boolean;
  type?: "sms" | "push" | "email";
}
export interface BusinessProfileProps {
  regNumber?: string;
  state?: string;
  country?: string;
  companyName?: string;
  companyType?: string;
  registrationDate?: string;
  companyEmail?: string;
  companyLogo?: string;
  headOfficeAddress?: string;
  isRegisteredBusiness?: string;
  isRVerified?: string;
  numberOfEmployees?: string;
  createdAt?: string;
  dateOfBirth?: string;
  id?: string;
  avatar?: string;
  isActive?: boolean;
  distressSignUp?: boolean;
  isEmailVerified: false,
  isPinSet: false,
  preference?: string;
  referralCode?: string;
  refferedBy?: string;
  balance?: string;
  prevBalance?: string;
  currency?: string;
  faceId?: boolean;
  hideAccount?: boolean;
  loginWithPin?: boolean;
  getNotification?: boolean;
  appActivities?: boolean;
  banks?: any[];
  cards?: any[];
  transactions?: any[];
  portfolioList?: any[];
  wallets?: any[];
  creationOfDistressPin?: boolean;
  creationOfNextOfKin?: boolean;
  creationOfEmergencyPreference?: boolean;
  fundingOfAccount?: boolean;
  creationOfSafeWord?: boolean;
  updatedAt?: string;
  userId?: string;
  documents?: FileProp[];
}
interface FileProp {
  uri: string;
  name: string;
  fileName: string;
}
export interface FormStateProp {
  status: "valid" | "invalid" | "selected";
}
export interface CountrylistModel {
  calling_code?: string;
  currency?: {
    code: string;
    name: string;
    symbol: string;
  };
  flag?: string;
  id?: string;
  isoAlpha2?: string;
  isoAlpha3?: string;
  isoNumeric?: string;
  name?: string;
}
export interface SignUpFormProps {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: string;
  code?: string;
  bvn?: string;
}
export interface BusinessRegFormProps {
  natureOfBusiness?: string;
  amountOfShareCapital?: string;
  corporateEmail?: string;
  phoneNumber?: string;
  businessName?: string;
  businessAddress?: string;
  directorName?: string;
  directorGender?: string;
  directorDateOfBirth?: string;
  directorResidentialAddress?: string;
  directorEmail?: string;
  directorPhoneNumber?: string;
  directorGovtId?: string;
  directorSignature?: string;
  cac?: string;
  timeIn?: string;
  timeOut?: string;
  businessCategory?: string;
  businessType?: string;
  fullName?: string;
  residentialAddress?: string;
  email?: string;
  dateOfBirth?: string;
  businessLogoFile?: string;
  businessCACFile?: string;
  businessProofOfAddressFile?: string;
  businessProofOfIdFile?: string;
}
export interface UserLoginProps {
  email: string;
  password: string;
}
export interface ForgotPasswordProps {
  confirmPassword?: string;
  password?: string;
  type: "auth-pin" | "transaction-pin", // pin type: transaction-pin or auth-pin
  channel: "phone" | "email",
  phone?:string;
  email?:string;
}
export interface APIResponse {
  status: boolean;
  message: string;
  data: any;
  errors?: any;
  errorCode?: "OTP_ALREADY_SENT" | "SENT" | "FAILED" | "RESOURCE_NOT_FOUND" | "USER_ALREADY_EXISTS";
}
export interface NavigationProps {
  closeDrawer?: Function;
  openDrawer?: Function;
  addListener: Function;
  canGoBack: Function;
  dangerouslyGetParent: Function;
  dangerouslyGetState: Function;
  dispatch: Function;
  goBack: Function;
  isFocused: Function;
  jumpTo: Function;
  navigate: Function;
  pop: Function;
  popToTop: Function;
  push: Function;
  removeListener: Function;
  replace: Function;
  reset: Function;
  setOptions: Function;
  setParams: Function;
}
export interface ScreenComponentType {
  focused?: boolean;
  scrollToTop?: () => void;
  session?: () => void;
  message?: string;
  title?: string;
  navigation?: NavigationProps;
  route?: {
    params: any;
  };
  children?: React.ReactNode;
  showHeader?: boolean;
  store?: any;
  backgroundColor?: string;
  goBack?: (s?: string) => void;
  onSuccess?: (data: { title?: string; message?: string; data?: any }) => void;
  style?: ViewStyle;
  closeButton?: JSX.Element;
  Reducer?: UserDataModel;
  shareBtnText?: string;
  raiseIssueBtnText?: string;
  shareBtnPress?: (s?: string) => void;
  raiseBtnPress?: (s?: string) => void;
  hideShareBtn?: boolean;
}
export interface ItemProps {
  balance?: string;
  currency?: string;
  title?: string;
  value?: number | string | "log"| "about";
  id?: number;
  icon?: any;
  description?: string;
  route?: string;
}
export type BillersType = 'airtime' | 'cabletv' | 'databundle' | 'electricity';
export interface WalletProps {
  accountNumber: string;
  balance: string;
  createdAt: string;
  currency: string;
  id: string;
  isDisabled: boolean;
  isDistressWallet: boolean;
  isLocked: boolean;
  isMain: boolean;
  lockExpiration: string | null;
  name: string;
  type: string;
  updatedAt: string;
  userId: string;
}
export type LanguageTypes = "uk-En" | "us-En" | "en";