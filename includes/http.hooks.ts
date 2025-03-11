import { useToast } from 'react-native-toast-notifications';
import { DeleteDATA, GetDATA, PostDATA, PutDATA } from './functions';
import { useState } from 'react';
import { APIResponse, BillersType, ForgotPasswordProps, LanguageTypes, NotificationsProps, SignUpFormProps, ThemeProp, UserLoginProps } from './types';
import { navigationRef } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { COLOURS, LOCALSTORAGE, ROUTES } from './constants';
import { WalletToWalletTransferProps } from '../screens/dashboard/home/components/walletTransfer';
import { CreateNewBulkTranferProp } from '../screens/dashboard/home/components/bulkTransfer/NewBulkRequest';
import { CreateCardPayloadProps } from '../screens/dashboard/home/components/cards/createNewCard';
export interface OpamProtectAddEmergencyContactProps {
    full_name?:string;
    relationship?:string;
    phone_number?:string;
    distress_pin?:string;
    email?:string;
    preferred_contact_method?:"SMS"|"EMAIL"|"PHONE_NUMBER";
    contact_id?:string;
    address_line1?:string;
    gender?:"male"|"female";
    emergency_contact_priority?:number;
    
}
interface VerifyOTPProps {
phone?: string; // if type is phone
type: "email" | "phone"; // phone or email
email?: string; // if type is email
otp:string;
password?:string;
}
const useHttp = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const ShowToast = (data: APIResponse, position: "top" | "bottom" = "top") => {
        toast.show(data.message, {
            swipeEnabled: true,
            type: 'custom',
            successColor: COLOURS.red,
            placement: position,
            textStyle: {
                color: COLOURS.white
            },
            duration: 4000,
            animationType: 'slide-in',
            style: {
                backgroundColor: data.data? "#00A551" : "red",
                marginBottom: position === "top" ? 5 : 0,
                marginTop: position === "bottom" ? 5 : 0,
            },
            data: data
        });
    }
    const ShowMessage = (position: "top" | "bottom" = "top") => {
        const Show = (message: string, status: boolean) => {
            toast.show(message, {
                swipeEnabled: true,
                type: 'custom',
                successColor: COLOURS.red,
                placement: position,
                textStyle: {
                    color: COLOURS.white
                },
                duration: 4000,
                animationType: 'slide-in',
                style: {
                    backgroundColor: status ? "#00A551" : "red",
                    marginBottom: position === "top" ? 5 : 0,
                    marginTop: position === "bottom" ? 5 : 0,
                },
                data: {
                    message,
                    status
                }
            });
        }
        return {
            success: (message: string) => Show(message, true),
            fail: (message: string) => Show(message, false)
        }
    }
    const UserLogin = async (props: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
        PostDATA('auth/login', props).then((res) => {
        setLoading(false);
        resolve(res) 
         })
        })
    };

    const Register = (props: SignUpFormProps) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            const data: SignUpFormProps = { ...props, phoneNumber: "+" + String(props?.code) + parseInt(String(props?.phoneNumber)) }
            delete data.code;
            return PostDATA('auth/register', data).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                if (res.data?.token) {
                    AsyncStorage.setItem(LOCALSTORAGE.accessToken, res.data.token)
                }
                resolve(res)
            });
        })
    };
    const UserForgotPassword = async (props: ForgotPasswordProps) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA('auth/pin-management/forgot', props).then((res) => {
                setLoading(false);
                ShowToast(res);
                if (res.data || res?.errorCode == "OTP_ALREADY_SENT") {
                    navigationRef.current?.navigate(ROUTES.forgotPasswordOTP,{message:res.message,...props});
                }
                resolve(res)
            })
        })
    };
    const UserResetPassword = async (props: ForgotPasswordProps) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA('auth/pin-management/forgot', props).then((res) => {
                setLoading(false);
                ShowToast(res,);
                if (res.data) {
                    navigationRef.current?.reset({
                        index: 0,
                        routes: [{
                            name: ROUTES.loginScreen,
                        }],
                    });
                }
                resolve(res)
            })
        })
    };

    const SendOTP = (email: string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PutDATA(`auth/verify-email`, { email }).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    const VerifyEmail = (email: string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`auth/send-verification-code`, { type: "email", email: email }).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    const VerifyMobileNumber = (mobileNumber: string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`auth/send-verification-code`, { type: "phone", phone: mobileNumber }).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }

    const VerifiyBusinessName = (businessName: string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PutDATA(`business_name`, { businessName }).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    const CreateAccount = (data: any) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            console.log(data);
            return PostDATA(`auth/register`, data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }

    const WalletToWalletTransferBulk = (data: WalletToWalletTransferProps) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`wallets/transfer`, data).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    const WalletToWalletTransferSingle = (data: WalletToWalletTransferProps) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`wallets/transfer`, data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }

    const CreateNewBulkTranfer = (data: CreateNewBulkTranferProp) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`bulk-transfer-beneficiaries`, data).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    
    const VerifyOTP = (data: VerifyOTPProps) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`auth/confirm-verification-code`, data).then((res) => {
                setLoading(false);
                if(res.statusCode === 200)
                {
                    res.data = {}
                }
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    const VerifyCACNumber = (cacNumber: string) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`identity-verification`, {
                type: "cac",
                cardNumber: cacNumber
            }).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    const VerifyBVN = (props: {
        bvn: string;
        dob: string;
    }) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`identity-verification`, {
                type: "bvn",
                cardNumber: props.bvn,
                dateOfBirth: props.dob
            }).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }

    const GetBusinesses = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`user`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }

    const UploadFiles = (prop: any) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`upload-onboarding-documents`, prop,"image").then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }
    const FetchBillers = (billersType: BillersType) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`bills/billers`, {
                type: billersType
            }).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }

    const GetCardBrands = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`cards/brands`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }
    const GetAllPHYSICALCards = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`cards?cardType=PHYSICAL`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }
    const GetAllVIRTUALCards = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`cards?cardType=VIRTUAL`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }
    const GetBeneficiaries = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`user/transaction-beneficiaries`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }
    const GetBanks = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`banks`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }
    interface VerifyBankAccountProp {
        channel: "IBAN" | "WALLET";
        accountNumber: string;
        bankCode?: string | number;
    }
    const VerifyBankAccount = (prop: VerifyBankAccountProp) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`account-lookup`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }

    const GetWallets = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`wallets`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }

    const WalletToBankTransferSingle = (data: any) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`wallets/transfer`, data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }

    const WalletToBankTransferBulk = (data: any) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`wallets/transfer`, data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }

    const GetBulkList = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return GetDATA(`bulk-transfer-beneficiaries`, {}).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }

    const ResquestCard = (prop: CreateCardPayloadProps) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`cards`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }

    const LinkNewAccount = (prop: any) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`link-new-account`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }


    const GetLinkedAccounts = () => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`get-linked-accounts`, {}).then((res) => {
                setLoading(false);
                resolve(res)
            });
        })
    }
    const BillPurchase = (prop: any) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`bills/purchase`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }
    const VerifyAirtimeNumber = (phoneNumber: any) => {
        return new Promise<APIResponse>((resolve) => {
            setLoading(true);
            return PostDATA(`bills/verify-airtime-phone`, { phoneNumber }).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }
    const GetDataPlans = (network: any) => {
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`bills/bundles`, {
                type: "databundle",
                provider: network
            }).then((res) => {
                resolve(res)
            });
        })
    }
    const GetBillers = (type: 'airtime' | 'airtime' | 'cabletv' | 'databundle' | 'electricity') => {
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`bills/billers`, {
                type: type
            }).then((res) => {
                resolve(res)
            });
        })
    }
    const VerifyBillAccount = (props: {
        accountNumber: string;
        provider: "dstv" | string
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`bills/verify-account`, props).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }
    const GetTvPlans = (props: "dstv" | "gotv" | "showmax" | "startimes") => {
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`bills/bundles`, {
                type: "cabletv",
                provider: props
            }).then((res) => {
                resolve(res)
            });
        })
    }
    const CreateTransationPIN = (pin: string) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`auth/pin-management/create`, {
                type: "transaction-pin",
                pin
            }).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }

    const ResetPassword = (prop: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`auth/pin-management/reset-login-password`, prop).then((res) => {
                setLoading(false);
                ShowToast(res, "top");
                resolve(res)
            });
        })
    }

    const CardInfo = (ref: string) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`cards/${ref}`, {}).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowToast(res, "top");
                }
                resolve(res)
            });
        })
    }
    interface GetAllTransactionsProp {
        skip:number;
        limit:number;
    }
    const GetAllTransactions = (prop:GetAllTransactionsProp) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`transactions?skip=${prop.skip}&limit=${prop.limit}`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    const GetTransactionsById = (id: string) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`transactions/${id}`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    const CardDelete = (id: string) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`delete:cards/delete-card/${id}`, {}).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message)
                }
                resolve(res);
            });
        })
    }
    const CardFreezeUnfreeze = (prop: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`patch:cards/freeze`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message)
                }
                resolve(res);
            });
        })
    }
    const CardTopUp = (prop: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`cards/topup`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message)
                }
                resolve(res);
            });
        })
    }
    const CardWithdrawal = (prop: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`cards/withdrawal`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message)
                }
                resolve(res);
            });
        })
    }
    const CardTransactions = (id: string) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`cards/transactions/${id}`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    const FetchCardBrands = () => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`cards/brands`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    interface UpdateBeneficiaryProp {
        groupId: string;
        beneficiaryId: string;
        data: any;
    }
    const UpdateBeneficiary = (prop: UpdateBeneficiaryProp) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`patch:bulk-transfer-beneficiaries/${prop.groupId}/members/${prop.beneficiaryId}`, prop.data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message)
                }
                resolve(res);
            });
        })
    }
    const DeleteBeneficiary = (prop: UpdateBeneficiaryProp) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`delete:bulk-transfer-beneficiaries/${prop.groupId}/members/${prop.beneficiaryId}`, prop.data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message)
                }
                resolve(res);
            });
        })
    }
    const RequestAccountStatement = (prop: any) => {
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`transactions/generate-statement`, prop).then((res) => {
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                }
                resolve(res);
            });
        })
    }

    const AddNewAddressBook = (prop: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`${prop.profileId}/customers`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                }
                resolve(res);
            });
        })
    }
    const GetAddressBook = (prop: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`${prop}/customers`, prop).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                }
                resolve(res);
            });
        })
    }
    const GetCurrentUserDetails = () => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`user`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }

    const UpdateProfile = (data: any) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`user/update-profile`, data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                } else {
                    ShowMessage("top").success(res.message);
                }
                resolve(res);
            });
        })
    }

    const GetPaymentInvoice = (data: {
        profileId: string;
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`${data.profileId}/invoices`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }

    const CreateNewInvoice = (data: {
        profileId: string;
        data: any
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`${data.profileId}/invoices`, data.data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                }
                resolve(res);
            });
        })
    }
    const GetAllStaffs = (data: {
        profileId: string;
        data: any
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`${data.profileId}/staffs`, data.data).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    const CreateStaff = (data: {
        profileId: string;
        data: any
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`${data.profileId}/staffs`, data.data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                }
                resolve(res);
            });
        })
    }

    const DeactivateStaff = (data: {
        profileId: string;
        staffId: string;
        data: any
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`patch:${data.profileId}/staffs/${data.staffId}/deactivate`, data.data).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    const GetStaff = (data: {
        profileId: string;
        staffId: string;
        data: any
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`${data.profileId}/staffs/${data.staffId}`, data.data).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }

    const CreatePayroll = (prop: {
        profileId: string;
        data: any
    }) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`${prop.profileId}/payroll`, prop.data).then((res) => {
                setLoading(false);
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                }
                resolve(res);
            });
        })
    }

    const GetPayrollList = (profileId: string) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`${profileId}/payroll`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    const GetSalaryHistory = (profileId: string) => {
        setLoading(true);
        return new Promise<APIResponse>((resolve) => {
            return GetDATA(`${profileId}/payroll`, {}).then((res) => {
                setLoading(false);
                resolve(res);
            });
        })
    }
    interface UpdatePreferenceProp {
        enableBiometrics?: boolean;
        theme: ThemeProp;
        notifications: NotificationsProps[];
        language: LanguageTypes;
    }
    const UpdatePreference = (prop: UpdatePreferenceProp) => {
        return new Promise<APIResponse>((resolve) => {
            return PostDATA(`patch:user/settings`, prop).then((res) => {
                if (!res.data) {
                    ShowMessage("top").fail(res.message);
                } else {
                    ShowMessage("top").success(res.message);
                }
                resolve(res);
            });
        })
    }
    
    const OpamProtectAddEmergencyContact = (data:OpamProtectAddEmergencyContactProps)=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`opam-protect/emergency-contacts`,data).then((res)=>{
            setLoading(false);
            ShowToast(res,"top");
            resolve(res)
            });
        })
    }
    const OpamProtectGetUser  = ()=>{
        return new Promise<APIResponse>((resolve)=>{
            return GetDATA(`opam-protect/profile`,{}).then((res)=>{
            resolve(res)
            });
        })
    }
    interface OpamProtectCreateUserProps {
        distress_pin: string;
        preferred_emergency_action: string;
    }
    const OpamProtectCreateUser  = (props:OpamProtectCreateUserProps)=>{
        return new Promise<APIResponse>((resolve)=>{
            return PostDATA(`opam-protect/profile`,props).then((res)=>{
            resolve(res)
            });
        })
    }
    
    interface OpamProtectUpdateSafeWordProps {
        safeword?:string;
        audioFile?:{
            fileName:string;
            path:string;
        };
    }
    const OpamProtectUpdateSafeWord  = (props:OpamProtectUpdateSafeWordProps)=>{
        return new Promise<APIResponse>((resolve)=>{
            return PostDATA(`opam-protect/manage-safeword`,props).then((res)=>{
                
                resolve(res)
            });
        })
    }
    interface OpamProtectCreatePasswordProps {
        distress_pin: string;
        preferred_emergency_action?:string;
    }
    const OpamProtectCreatePassword  = (props:any)=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`opam-protect/profile`,{
                ...props,
                preferred_emergency_action:"Contact bank account officer to freeze account"
            },"image").then((res)=>{
                setLoading(false);
                ShowToast(res,"top");
                resolve(res)
            });
        })
    }
    const OpamProtectUpdateEmergencyContact = (props:OpamProtectAddEmergencyContactProps)=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`patch:opam-protect/emergency-contacts`,props).then((res)=>{
                setLoading(false);
                ShowToast(res,"top");
                resolve(res)
            });
        })
    }
    
    const OpamProtectAudioUpload = (props:{
        safeword:string;
        audioFile:any;
    })=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`patch:opam-protect/manage-safeword`,props,"image").then((res)=>{
                setLoading(false);
                if(res.message.includes(""))
                {
                    ShowToast({data:{},...res},"top");
                }else{
                    ShowToast(res,"top");
                }
                resolve(res)
            });
        })
    }
    
    
    const OpamProtectUpdatePassword = (distress_pin:string)=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`patch:opam-protect/manage-distress-pin`,{distress_pin}).then((res)=>{
                setLoading(false);
                ShowToast(res,"top");
                resolve(res)
            });
        })
    }
    
    const UserCreateNewPassword = (prop:any)=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`auth/create-new-password`,prop).then((res)=>{
                setLoading(false);
                ShowToast(res,"top");
                if (res.data) {
                    navigationRef.current?.reset({
                        index: 0,
                        routes: [{
                            name: ROUTES.loginScreen
                        }],
                    });
                }
                resolve(res)
            });
        })
    }
    const GetOpamProtectAccountNumber = ()=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`auth/get-account-number`,{}).then((res)=>{
                setLoading(false);
                ShowToast(res,"top");
                resolve(res)
            });
        })
    }
    
    const LoginWithFTA = (props:any)=>{
        return new Promise<APIResponse>((resolve)=>{
            setLoading(true);
            return PostDATA(`auth/verify-login-code`,props).then((res)=>{
                setLoading(false);
                ShowToast(res,"top");
                if (res.data) {
                    dispatch({ type: "update", payload: res.data.user });
                    AsyncStorage.setItem(LOCALSTORAGE.userData, JSON.stringify(res.data.user));
                    AsyncStorage.setItem(LOCALSTORAGE.accessToken, res.data.tokens.accessToken);
                    AsyncStorage.setItem(LOCALSTORAGE.refreshToken, res.data.tokens.refreshToken);
                    navigationRef.current?.reset({
                        index:0,
                        routes:[
                            {name:ROUTES.dashboard}
                        ]
                    })
                }
                resolve(res)
            });
        })
    }
const GetDistressLogs = (props?:any)=>{
    return new Promise<APIResponse>((resolve)=>{
        setLoading(true);
        return GetDATA(`opam-protect/distress-events`,props).then((res)=>{
            setLoading(false);
            resolve(res)
        });
    })
}
    return {
        UserLogin,
        VerifiyBusinessName,
        loading,
        Register,
        VerifyEmail,
        UserForgotPassword,
        SendOTP,
        VerifyMobileNumber,
        ShowMessage,
        CreateAccount,
        WalletToWalletTransferBulk,
        CreateNewBulkTranfer,
        VerifyOTP,
        VerifyCACNumber,
        VerifyBVN,
        GetBusinesses,
        UploadFiles,
        FetchBillers,
        GetCardBrands,
        GetBeneficiaries,
        GetBanks,
        VerifyBankAccount,
        GetWallets,
        WalletToWalletTransferSingle,
        WalletToBankTransferSingle,
        WalletToBankTransferBulk,
        GetBulkList,
        ResquestCard,
        LinkNewAccount,
        GetLinkedAccounts,
        BillPurchase,
        VerifyAirtimeNumber,
        GetDataPlans,
        GetTvPlans,
        GetBillers,
        VerifyBillAccount,
        CreateTransationPIN,
        ResetPassword,
        GetAllVIRTUALCards,
        GetAllPHYSICALCards,
        CardInfo,
        GetAllTransactions,
        GetTransactionsById,
        CardDelete,
        CardFreezeUnfreeze,
        CardTopUp,
        CardWithdrawal,
        CardTransactions,
        FetchCardBrands,
        UpdateBeneficiary,
        DeleteBeneficiary,
        RequestAccountStatement,
        AddNewAddressBook,
        GetAddressBook,
        GetCurrentUserDetails,
        UpdateProfile,
        GetPaymentInvoice,
        CreateNewInvoice,
        GetAllStaffs,
        CreateStaff,
        DeactivateStaff,
        GetStaff,
        GetPayrollList,
        CreatePayroll,
        GetSalaryHistory,
        UpdatePreference,
        OpamProtectAddEmergencyContact,
        OpamProtectGetUser,
        OpamProtectCreateUser,
        OpamProtectUpdateSafeWord,
        OpamProtectCreatePassword,
        OpamProtectUpdateEmergencyContact,
        OpamProtectAudioUpload,
        OpamProtectUpdatePassword,
        UserResetPassword,
        UserCreateNewPassword,
        GetOpamProtectAccountNumber,
        LoginWithFTA,
        GetDistressLogs
    }
};
export default useHttp;
