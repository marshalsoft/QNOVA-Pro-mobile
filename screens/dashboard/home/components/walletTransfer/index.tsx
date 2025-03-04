import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, Switch, DeviceEventEmitter, BackHandler } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LOCALSTORAGE, RELOAD, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import AppStyles from "../../../../../includes/styles";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import Svg, { Path } from "react-native-svg"
import BaseSelect from "../../../../../components/baseSelect";
import BaseButton from "../../../../../components/baseButton";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
import useHttp from "../../../../../includes/http.hooks";
import WalletTransferPreviewScreen, { MockInput } from "./preview";
import RecentTransactionsComponent from "./recentTransactions";
import ListOfBanksComponent, { BankProp } from "./ListOfBanks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseModalLoader } from "../../../../../components/baseLoader";
import PINScreen from "./pin";
import SuccessScreen from "./success";
import { navigationRef } from "../../../../../App";
import BaseSwitch from "../../../../../components/baseSwitch";
import { useDispatch } from "react-redux";

const FormSchema = y.object({
    senderWalletId:y.string().required('Wallet is required.'),
    amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
    narration:y.string().required('Narration is required.')
});

const VerifyAccountFormSchema = y.object({
    accountNumber:y.string().required('Account Number is required.').min(10,'Account Number must be 10 digits.'),
    bankCode:y.string().required('Bank is required.')
});
export interface WalletToWalletTransferProps {
    type: "wallet";
    amount: string;
    transactionPin: number;
    senderWalletId: string;
    isBulkTransfer: boolean;
    walletBeneficiaries?:BeneficiariesType[]; // For bulk transfer
    narration:string;
    walletReceiver?:BeneficiariesType;
}
export type BeneficiariesType = {
    receiverIdentifier:string;
}
export interface WalletToWalletFormProp {
accountType:string;
accountNumber:string;
accountName:string;
amount:string;
narration:string;
beneficiaries:BeneficiariesType[];
isBulkTransfer?:boolean;
}
export interface RecentTransactionsProp {
    transfers:BeneficiariesProp[];
    billPayments:BeneficiariesProp[];
}
export interface BeneficiariesProp {
    accountNumber?:string;
    accountName?:string;
    name?:string;
    serviceType: "transfers";
    meta?:{
        bank:BankProp;
        avatar:string;
        bankCode?:string;
        accountName?:string;
        accountNumber?:string;
    },
    userId?:string;
    createdAt?:string;
    updatedAt?:string;
    selected?:boolean;
}
type ScreenTypeProps = "Wallet Transfer" | "Confirm Transfer" | "Enter your Transaction PIN" | "Success";
interface AccountDetails  {
    accountNumber:string;
    channel: "WALLET" | "IBAN";
    isValid: boolean;
    accountName:string;
    bankName:string;
    bankCode?:string;
}
const WalletTransferScreen = ({Reducer,goBack,onSuccess}: ScreenComponentType) => {
    const dispatch = useDispatch();
    const thisForm = useRef() as RefObject<FormikProps<FormikValues>>
    const [selected,setSelected] = useState<number>(0)
    const [fetching,setFetching] = useState<boolean>(false);
    const [accountDetails,setAccountDetails] = useState<AccountDetails | null>(null);
    const [section,setSelection] = useState<ScreenTypeProps>("Wallet Transfer");
    const [listOfBanks,setListOfBanks] = useState<BankProp[]>([]);
    const [listOfWallets,setListOfWallets] = useState<ItemProps[]>([]);
    const [listOfBeneficiaties,setListOfBeneficiaties] = useState<BeneficiariesProp[]>([]);
    const {ShowMessage,GetBanks,GetBeneficiaries,loading,VerifyBankAccount,WalletToWalletTransferBulk,WalletToWalletTransferSingle,WalletToBankTransferBulk,WalletToBankTransferSingle} = useHttp();
    const [savedValues,setSavedValues] = useState<any>({
        amount:0
    })
    useEffect(()=>{
        GetBeneficiaries().then((response)=>{
            if(response.data)
            {
                if(response.data?.transfers)
                {
                const beneficiaries:BeneficiariesProp[] = response.data.transfers.map((a:BeneficiariesProp,i:number)=>{
                    a.selected = false;
                    return a
                 }) as BeneficiariesProp[];
                setListOfBeneficiaties(beneficiaries);
                }
            }
        });
        AsyncStorage.getItem(LOCALSTORAGE.fundAccountNumber).then((accountNumber)=>{
        if(accountNumber)
        {
            
        }
        });
    },[])
    useEffect(()=>{
        if(Reducer?.OpamProtectAccountNumber)
        {
            thisForm.current?.setFieldValue("accountType",Reducer.OpamProtectAccountNumber.accountType);
            thisForm.current?.setFieldValue("accountNumber",Reducer.OpamProtectAccountNumber.accountNumber);
            thisForm.current?.setFieldValue("bankCode",Reducer.OpamProtectAccountNumber.bankCode);
        }
    },[Reducer?.OpamProtectAccountNumber])
    const [searchText,setSearchText] = useState<string>("");
    const HandleBack = ()=>{
        dispatch({type: "update", payload:{
            OpamProtectAccountNumber:{
              accountNumber:"",
              accountType:"",
              bankCode:""
            }
          }});
      if(goBack)
      {
        goBack();
      }
      return true;
    }
    useEffect(()=>{
     BackHandler.addEventListener("hardwareBackPress",HandleBack);
     return ()=>{
      BackHandler.removeEventListener("hardwareBackPress",HandleBack);
     }
    },[])
    const selelectedBeneficiaries:BeneficiariesType[] = listOfBeneficiaties.filter((a,i)=>a.selected).map((a,i)=>{
        return {
            receiverIdentifier:a.accountNumber
        }
    }) as BeneficiariesType[];
    const selelectedAccounts:any[] = listOfBeneficiaties.filter((a,i)=>a.selected).map((a,i)=>{
        return {
           bank: a.meta?.bank.bankName,
            accountName: a.name,
            accountNumber:a.accountNumber
        }
    }) as any[];
    useEffect(()=>{
        GetBanks().then((response)=>{
            if(response.data)
            {
                setListOfBanks(response.data);
            }
        });
    },[])
    useEffect(()=>{
      if(Reducer?.wallets)
      {
        // alert (JSON.stringify(Reducer?.Wallets))
        setListOfWallets(Reducer?.wallets.map((a,i)=>{
           return {
            title:a.name,
            value:a.id
           } 
        }))
      }
    },[Reducer?.wallets])
    if(section === "Success")
    {
        return <SuccessScreen 
        goBack={()=>{
            setAccountDetails(null);
            setSelection("Wallet Transfer");
        }}
        />
    }
    return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(section === "Confirm Transfer"){
            return setSelection("Wallet Transfer")
        }
        if(section === "Enter your Transaction PIN"){
            return setSelection("Confirm Transfer")
        }
        if(section === "Wallet Transfer"){
            HandleBack();
         }
    }}
    title={section}
    footer={section === "Wallet Transfer"?<TouchableOpacity 
        onPress={()=>{
            if(goBack)
            {
            goBack();
            }
        }}
      style={{position:"absolute",bottom:50,right:20}}
      >
        <Image 
        source={require("../../../../../images/menubtn.png")}
        style={{width:84,height:84}}
        resizeMode='contain'
        />
      </TouchableOpacity>:null}
      disableScrol
    >
 <View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",paddingVertical:30,borderTopRightRadius:20,borderTopLeftRadius:20,overflow:"hidden"}}>
 <View style={{paddingHorizontal:20}}>
 <View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5}}>
            <TouchableOpacity 
            onPress={()=>{
                setListOfBeneficiaties(listOfBeneficiaties.map((a,i)=>{
                   a.selected = false
                    return a
                }))
                setSelected(0)
                setAccountDetails(null)
            }}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>To QNOVA Pro</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>{
                setListOfBeneficiaties(listOfBeneficiaties.map((a,i)=>{
                    a.selected = false
                     return a
                 }));
                 setSelected(1);
                 setAccountDetails(null)
             }}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>To Other Banks</Text>
            </TouchableOpacity>
 </View>
 </View>
<ScrollView 
showsVerticalScrollIndicator={false}
keyboardShouldPersistTaps="always"
>
<View style={{flexDirection:"column",paddingHorizontal:20}}>
<RecentTransactionsComponent 
    list={listOfBeneficiaties}
    onValue={(d)=>{
        setListOfBeneficiaties(d);
        setAccountDetails(null);
    }}
    selectedTab={selected === 0?"Wallet":"Bank"}
    />
</View>
{selected === 0?<View style={{flexDirection:"column",paddingHorizontal:20}}>
 {listOfBeneficiaties.filter((a,i)=>a.selected).length === 0?<View 
 style={{flexDirection:"column"}}
 >
<Formik
innerRef={thisForm}
initialValues={{
    accountType:"wallet",
    accountNumber:"",
    bankCode:""
}}
onSubmit={(values:any, actions:any) => {
    setFetching(true);
    VerifyBankAccount({
    accountNumber:values.accountNumber,
    channel:"WALLET",
    bankCode:"044" 
    }).then((res)=>{
        setFetching(false);
        if(res.data)
        {
            if(res.data?.data)
            {
                setAccountDetails(res.data.data);  
            }
        }else{
        ShowMessage("top").fail(res.message);
        }
    })
}}
validationSchema={VerifyAccountFormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column",height:accountDetails === null?DEVICE.height:95}}>
<BaseInput 
 max={11}
 placeholder="Enter account number"
 type="number-pad"
 value={ReturnAllNumbers(values.accountNumber)}
 onChange={(d)=>{
    setFieldValue("accountNumber",d);
    setAccountDetails(null)
     }}
 errorMessage={touched.accountNumber && errors.accountNumber}
 label="Account Number"
 
 />
 {accountDetails === null?<BaseButton 
 title="Verify Account"
 loading={fetching}
 onPress={handleSubmit}
 />:null}
 </View>)}
 </Formik>
 {accountDetails !== null?<Formik
initialValues={{
    type:"wallet",
    senderWalletId:"",
    amount:"", 
    accountName:accountDetails.accountName,
    narration:"",
    isBulkTransfer:false,
    saveBeneficiary:false
}}
onSubmit={(values:any, actions:any) => {
    const data = {...values,...accountDetails}
    setSavedValues(data);
    // alert(JSON.stringify(data));
    setSelection("Confirm Transfer");
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column",paddingBottom:120}}>
<MockInput 
style={{marginTop:-20}}
 value={accountDetails.accountName}
 label="Account Name"
 />
 <BaseSelect 
 list={listOfWallets}
 onChange={(d)=>{
    setFieldValue("senderWalletId",d.value);
 }}
 type="custom"
 label="Select Wallet"
 placeholder="Please Select"
 />
<BaseInput 
 max={12}
 leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black,marginRight:2}}>₦</Text>}
  type="number-pad"
  placeholder="Enter amount"
 value={ReturnComma(values.amount!)}
 onChange={(d)=>{
    setFieldValue("amount",d)
     }}
 errorMessage={touched.amount && errors.amount}
 label="Amount"
 /> 
 <BaseInput 
 max={20}
 type="default"
 placeholder="Write Here"
 value={values.narration}
 onChange={(d)=>{
    setFieldValue("narration",d)
     }}
 errorMessage={touched.narration && errors.narration}
 label="Narration"
 />
 <BaseButton 
 title="Continue"
 onPress={handleSubmit}
 />
  <View
  style={{marginTop:30,marginBottom:80,flexDirection:"row"}}
   >
    <View style={{flex:1}}>
    <Text>Save to Beneficiaries</Text>
    </View>
    <BaseSwitch
    onValueChange={(d)=>{
        setFieldValue("saveBeneficiary",d); 
    }}
    value={values.saveBeneficiary}
    />

 </View>

 </View>)}
 </Formik>:null}
 </View>:<Formik
initialValues={{
    type:"wallet",
    senderWalletId:"",
    amount:"", 
    narration:"",
    isBulkTransfer:false,
    saveBeneficiary:false
}}
onSubmit={(values:any, actions:any) => {
    var data = {...values,...accountDetails}
    const beneficiaries = listOfBeneficiaties.filter((a,i)=>a.selected);
    if(beneficiaries.length === 1)
    {
        data = {...values,...accountDetails,
            walletReceiver:{
            receiverIdentifier:beneficiaries[0].meta?.accountNumber
            }
        }
    }else{
        data = {...values,...accountDetails,
            walletReceiver:beneficiaries.map((a,i)=>{
                return {
                    receiverIdentifier:a.accountNumber
                }
            })
        }  
    }
    setSavedValues(data);
    setSelection("Confirm Transfer");
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column",paddingBottom:120}}>

 <BaseSelect 
 list={listOfWallets}
 onChange={(d)=>{
    setFieldValue("senderWalletId",d.value);
 }}
 type="custom"
 label="Select Wallet"
 placeholder="Please Select"
 />
<BaseInput 
 max={12}
 leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black,marginRight:2}}>₦</Text>}
  type="number-pad"
  placeholder="Enter amount"
 value={ReturnComma(values.amount!)}
 onChange={(d)=>{
    setFieldValue("amount",d)
     }}
 errorMessage={touched.amount && errors.amount}
 label="Amount"
 /> 
 <BaseInput 
 max={20}
 type="default"
 placeholder="Write Here"
 value={values.narration}
 onChange={(d)=>{
    setFieldValue("narration",d)
     }}
 errorMessage={touched.narration && errors.narration}
 label="Narration"

 />
 <BaseButton 
 title="Continue"
 onPress={handleSubmit}
 />
  <View
  style={{marginTop:30,marginBottom:80,flexDirection:"row"}}
   >
    <View style={{flex:1}}>
    <Text>Save to Beneficiaries</Text>
    </View>

<BaseSwitch
value={values.saveBeneficiary}
onValueChange={(d)=>{
    setFieldValue("saveBeneficiary",d); 
}}
    />
 </View>
 </View>)}
 </Formik>}
 </View>:<View style={{flexDirection:"column",paddingHorizontal:20}}>
 {listOfBeneficiaties.filter((a,i)=>a.selected).length === 0?<View 
 style={{flexDirection:"column"}}
 >
<Formik
initialValues={{
    accountType:"wallet",
    accountNumber:"",
    accountName:"", 
    bankName:"",
    bankCode:""
}}
onSubmit={(values:any, actions:any) => {
    setFetching(true);
    VerifyBankAccount({
    accountNumber:values.accountNumber,
    channel:"IBAN",
    bankCode:values.bankCode
    }).then((res)=>{
        setFetching(false);
        if(res.data)
        {
            if(res.data?.isValid)
            {
                setAccountDetails({...res.data.data,bankCode:values.bankCode});  
            }
        }
    })
}}
validationSchema={VerifyAccountFormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column",height:accountDetails === null?DEVICE.height:95}}>
<BaseSelect 
searchBar
style={{marginTop:0}}
 label="Select Bank"
 placeholder="Please select a bank"
 list={listOfBanks.map((bank:BankProp,i:number)=>{
    return {title:bank.bank_name,value:bank.bank_code,icon:bank.logo_url}
 })}
 onChange={(data)=>{
    setFieldValue("bankName",data.title);
    setFieldValue("bankCode",data.value);
    setFieldValue("accountName","");
 }}
 type="custom"
 errorMessage={touched.bankCode && errors.bankCode}
 />
<BaseInput 
 max={10}
 placeholder="Enter account number"
 type="number-pad"
 value={ReturnAllNumbers(values.accountNumber)}
 onChange={(d)=>{
    setFieldValue("accountNumber",d);
    setAccountDetails(null)
     }}
 errorMessage={touched.accountNumber && errors.accountNumber}
 label="Account Number"
 />
 {accountDetails === null?<BaseButton 
 title="Verify Account"
 onPress={handleSubmit}
 />:null}
 </View>)}
 </Formik>
 {accountDetails !== null?<Formik
initialValues={{
    type:"wallet",
    senderWalletId:"",
    amount:"", 
    accountName:accountDetails.accountName,
    narration:"",
    isBulkTransfer:false,
    saveBeneficiary:false
}}
onSubmit={(values:any, actions:any) => {
    const data = {...values,...accountDetails};
    setSavedValues(data);
    setSelection("Confirm Transfer");
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column",paddingBottom:120}}>
<MockInput 
style={{marginTop:70}}
 value={accountDetails.accountName}
 label="Account Name"
 />
 <BaseSelect 
 list={listOfWallets}
 onChange={(d)=>{
    setFieldValue("senderWalletId",d.value);
 }}
 type="custom"
 label="Select Wallet"
 placeholder="Please Select"
 />
<BaseInput 
 max={12}
 leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black,marginRight:2}}>₦</Text>}
  type="number-pad"
  placeholder="Enter amount"
 value={ReturnComma(values.amount!)}
 onChange={(d)=>{
    setFieldValue("amount",d)
     }}
 errorMessage={touched.amount && errors.amount}
 label="Amount"
 /> 
 <BaseInput 
 max={20}
 type="default"
 placeholder="Write Here"
 value={values.narration}
 onChange={(d)=>{
    setFieldValue("narration",d)
     }}
 errorMessage={touched.narration && errors.narration}
 label="Narration"

 />
 <BaseButton 
 title="Continue"
 onPress={handleSubmit}
 />
  <View
  style={{marginTop:30,marginBottom:80,flexDirection:"row"}}
   >
    <View style={{flex:1}}>
    <Text>Save to Beneficiaries</Text>
    </View>
    <BaseSwitch
value={values.saveBeneficiary}
onValueChange={(d)=>{
    setFieldValue("saveBeneficiary",d); 
}}

/>
 </View>

 </View>)}
 </Formik>:null}
 </View>:<Formik
initialValues={{
    type:"bank",
    senderWalletId:"",
    amount:"", 
    narration:"",
    isBulkTransfer:false,
    saveBeneficiary:false
}}
onSubmit={(values:any, actions:any) => {
    var data = {...values,...accountDetails}
    const beneficiaries = listOfBeneficiaties.filter((a,i)=>a.selected);
    if(beneficiaries.length === 1)
        {
            data = {...values,...accountDetails,
                receiver:{
                    bank:beneficiaries[0].meta?.bank?.name,
                    accountName:beneficiaries[0].meta?.accountName,
                    accountNumber:beneficiaries[0].meta?.accountNumber,
                    bankCode:beneficiaries[0].meta?.bank.bankCode
                }
            }
        }else{
            data = {...values,...accountDetails,
                receiver:beneficiaries.map((a,i)=>{
                    return {
                        bank:a.meta?.bank?.name,
                        accountName:a.meta?.accountName,
                        accountNumber:a.meta?.accountNumber,
                        bankCode:a.meta?.bank.bankCode
                    }
                })
            }  
        }
    setSavedValues(data);
    // alert (JSON.stringify(beneficiaries))
    // return;
    setSelection("Confirm Transfer");
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column",paddingBottom:120}}>

 <BaseSelect 
 list={listOfWallets}
 onChange={(d)=>{
    setFieldValue("senderWalletId",d.value);
 }}
 type="custom"
 label="Select Wallet"
 placeholder="Please Select"
 />
<BaseInput 
 max={12}
 leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black,marginRight:2}}>₦</Text>}
  type="number-pad"
  placeholder="Enter amount"
 value={ReturnComma(values.amount!)}
 onChange={(d)=>{
    setFieldValue("amount",d)
     }}
 errorMessage={touched.amount && errors.amount}
 label="Amount"
 /> 
 <BaseInput 
 max={20}
 type="default"
 placeholder="Write Here"
 value={values.narration}
 onChange={(d)=>{
    setFieldValue("narration",d)
     }}
 errorMessage={touched.narration && errors.narration}
 label="Narration"

 />
 <BaseButton 
 title="Continue"
 onPress={handleSubmit}
 />
  <View
  style={{marginTop:30,marginBottom:80,flexDirection:"row"}}
   >
    <View style={{flex:1}}>
    <Text>Save to Beneficiaries</Text>
    </View>
    <BaseSwitch
    value={values.saveBeneficiary}
    onValueChange={(d)=>{
        setFieldValue("saveBeneficiary",d); 
    }}
    />
 </View>
 </View>)}
 </Formik>}
 </View>}
 </ScrollView>
 {section === "Confirm Transfer"?<WalletTransferPreviewScreen
 goBack={() => setSelection("Wallet Transfer")}
 data={savedValues}
 beneficiaries={selelectedBeneficiaries}
 onNext={() => setSelection("Enter your Transaction PIN")}
 />:null}
 {section === "Enter your Transaction PIN"?<View style={{paddingHorizontal:20,flexDirection:"column",position:"absolute",backgroundColor:"rgba(242, 242, 242, 1)",top:0,height:DEVICE.height - 100,width:DEVICE.width,paddingVertical:20,borderTopRightRadius:20,borderTopLeftRadius:20}}>
 <PINScreen
 onValue={(pin)=>{
if(selected == 0)
{
if(selelectedBeneficiaries.length === 0)
{
const data:any = savedValues as WalletToWalletTransferProps;
data.walletReceiver = {
    receiverIdentifier:accountDetails?.accountNumber
}
data.transactionPin = pin;
data.amount = parseInt(String(data.amount).replace(/[,]/,''))

setFetching(true)
WalletToWalletTransferSingle(data).then((res)=>{
  setFetching(false);
  if(res.data)
  {
    setSelection("Success");
    DeviceEventEmitter.emit(RELOAD.wallet,{})
  }
})
}else{
    const data:any = {
    type: "wallet",
    amount: parseInt(String(savedValues.amount).replace(/[,]/,'')),
    saveBeneficiary: false, // boolean
    transactionPin: pin,
    senderWalletId:savedValues.senderWalletId,
    isBulkTransfer: true,
    walletBeneficiaries: selelectedBeneficiaries, 
    narration:savedValues.narration
    }
    setFetching(true)
    WalletToWalletTransferBulk(data).then((res)=>{
      setFetching(false);
      if(res.data)
      {
        setSelection("Success");
        DeviceEventEmitter.emit(RELOAD.wallet,{})
      }
    })
}
}else{
setFetching(true);
const data:any = savedValues as WalletToWalletTransferProps;
data.amount = parseInt(String(data.amount).replace(/[,]/,''))
WalletToBankTransferBulk({transactionPin:pin,...data}).then((res)=>{
              setFetching(false);
              if(res.data)
              {
                setSelection("Success");
                DeviceEventEmitter.emit(RELOAD.wallet,{})
              }
            })
}
 }}
 status="pin"
 data={savedValues}
 subTitle="Enter your transaction PIN to confirm this transaction"
 title=""
 />
 </View>:null}
 </View>
 {fetching?<BaseModalLoader />:null}
 </AppContainer>
}
export default WalletTransferScreen;

export const CheckIcon = ()=>{
    return  <Svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M4 12.611L8.923 17.5 20 6.5"
      stroke="green"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>}


