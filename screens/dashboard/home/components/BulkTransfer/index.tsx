import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import AppStyles from "../../../../../includes/styles";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { navigationRef } from "../../../../../App";
import { BtnNavProp } from "../menuComponents";
import BaseSelect from "../../../../../components/baseSelect";
import BaseButton from "../../../../../components/baseButton";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
const FormSchema = y.object({
    accountType:y.string().required('Account type is required.'),
    accountNumber:y.string().required('Account Number is required.').min(10,'Account Number must be 10 digits.'),
    accountName:y.string().required('Account Name is required.'),
    amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
    narration:y.string().required('Narration is required.')
});
import styled from "styled-components/native";
import BulkTransferDetailComponent from "./BulkDetails";
import NewBulkRequestComponent, { BulkTranferBeneficiary, CreateNewBulkTranferProp } from "./NewBulkRequest";
import PINScreen from "../walletTransfer/pin";
import useHttp from "../../../../../includes/http.hooks";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import SuccessScreen from "../walletTransfer/success";
import { BaseModalLoader } from "../../../../../components/baseLoader";
import BeneficiaryDetailsComponent from "./beneficiaryDetails";
import EditBeneficiaryDetailsComponent from "./editBeneficiaryDetails";
interface BeneficiaryListProps {
  beneficiaries?:BulkTranferBeneficiary[];
  createdAt?:string;
  groupName?:string;
  id?:string;
  totalAmount?:number;
  updatedAt?:string;
}
type SectionProp = "Bulk transfer" | "Confirm Details" | "New Bulk Transfer" | "Enter your Transaction PIN" | "success" | "Details" | "Beneficiary Details" | "Edit Beneficiary";
const BulkTransferComponent = ({route,goBack,onSuccess}: ScreenComponentType) => {
   const {GetBulkList,ShowMessage,DeleteBeneficiary,VerifyBankAccount,UpdateBeneficiary,loading,CreateNewBulkTranfer} = useHttp();
  const position = useSharedValue(0);
  const [selectedBeneficiaryList,setSelectBeneficiaryList] = useState<BulkTranferBeneficiary[]>([]);
  const [searchText,setSearchText] = useState<string>("");
  const [sending,setSending] = useState<boolean>(false);
  const [selectedGroup,setSelectedGroup] = useState<BulkTranferBeneficiary | null>(null);
  const [sucessObject,setSucessObject] = useState<{
    message:string;
    raiseIssueBtnText:string;
    shareBtnText:string;
  }>({
    message:"",
    raiseIssueBtnText:"",
    shareBtnText:""
  })
  const [formData,setFormData] = useState<CreateNewBulkTranferProp>(
    {groupName:"",beneficiaries:[]}
  );
    const [section,setSection] = useState<SectionProp>("Bulk transfer");
    const [list,setList] = useState<BeneficiaryListProps[]>([
    ])
    const [placeHolder,setPlaceHolderList] = useState<BeneficiaryListProps[]>(Array.from({length:7}).map((a,i)=>{
      return {}
}))
const lastPosition = useRef<number>(0);
    const GetBulkListBeneficiaries = ()=>{
      GetBulkList().then((res)=>{
        if(res.status)
        {
          setList(res.data);
        }
      })
    }
    useEffect(()=>{
      GetBulkListBeneficiaries();
    },[])
    
    const animBtn = useAnimatedStyle(()=>{
      return {
        transform:[
          {translateY:position.value}
        ]
      }
    })
    if(section === "success")
      {
      return <SuccessScreen
      message={sucessObject.message}
      goBack={()=>setSection("Bulk transfer")}
      hideShareBtn
      />
      }
     return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(section === "Bulk transfer")
        {
            if(goBack)
            {
            goBack();
            }
        }else if(section === "Confirm Details")
        {
          setSection("New Bulk Transfer")
        }else if(section === "Enter your Transaction PIN")
        {
            setSection("Confirm Details")
          }else if(section === "Beneficiary Details")
         {
           setSection("Details")
         }else{
            setSection("Bulk transfer")
        }
    }}
    title={section == "Beneficiary Details"?selectedGroup?.accountName:section}
    footer={<View >
      {section === "Bulk transfer" ?<Animated.View 
    style={[{position:"absolute",bottom:50,right:20},animBtn]}
   
   >
      <TouchableOpacity 
        onPress={()=>{
            if(goBack)
            {
            goBack();
            }
        }}
   
      >
        <Image 
        source={require("../../../../../images/menubtn.png")}
        style={{width:84,height:84}}
        resizeMode='contain'
        />
    </TouchableOpacity>
    </Animated.View>:null}
    {sending && <BaseModalLoader 
    modal
    />}
    </View>}
    onRefresh={()=>{
      GetBulkListBeneficiaries();
    }}
    onScroll={({contentOffset,layoutMeasurement})=>{
      if(contentOffset.y > lastPosition.current )
      {
        position.value = withSpring(150,{duration:1500})
      }else{
        position.value = withSpring(0,{duration:1500})
      }
      lastPosition.current = contentOffset.y;
    }}  
    isRefresh={loading}
   
    >
{section === "Confirm Details"?<BulkTransferDetailComponent
goBack={()=>setSection("New Bulk Transfer")}
route={{
    params:formData
}}
onSuccess={()=>setSection("Enter your Transaction PIN")}
/>:null}
{section === "New Bulk Transfer"?<NewBulkRequestComponent
goBack={()=>setSection("Bulk transfer")}
onValue={(formData)=>{
  setFormData(formData);
  setSection("Confirm Details")
}}
formData={formData!}
/>:null}
{section === "Beneficiary Details"?<View >
<BeneficiaryDetailsComponent
goBack={()=>setSection("Bulk transfer")}
onEdit={()=>{
  setSection("Edit Beneficiary")
}}
onDelete={()=>{
  DeleteBeneficiary({
    beneficiaryId:selectedGroup?.id!,
    data:{},
    groupId:selectedGroup?.groupId!,
  }).then((res)=>{
    if(res.status)
    {
      GetBulkListBeneficiaries();
      setSucessObject({
        ...sucessObject,
        message:res.message
      })
      setSection("success");
    }
  })
}}
formData={selectedGroup!}
/> 
{loading && <BaseModalLoader modal/>}
 </View>:null}
{section === "Edit Beneficiary"?<View style={{flex:1,flexDirection:"column"}}>
<EditBeneficiaryDetailsComponent
goBack={()=>setSection("Beneficiary Details")}
onSave={(data)=>{
  const fData = {...selectedGroup,
    ...data
  }
 
    VerifyBankAccount({
    accountNumber:data.accountNumber,
    channel:data.bankName === "QNova Wallet"?"WALLET":"IBAN",
    bankCode:data.bankCode
    }).then((res)=>{
        if(res.status)
        {
          UpdateBeneficiary({
            beneficiaryId:selectedGroup?.id!,
            data:data,
            groupId:selectedGroup?.groupId!
          }).then((res)=>{
            if(res.status)
              {
                setSucessObject({
                  ...sucessObject,
                  message:res.message
                })
                setSection("success")
              }
          })
        }
      })
  // setSection("Beneficiary Details");
}}
formData={selectedGroup!}
/> 
{loading && <BaseModalLoader
modal
/>} 
</View>:null}
{section === "Bulk transfer"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,minHeight:DEVICE.height - 136,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{flexDirection:"row",alignItems:"center",gap:20}}>
<SearchContainer style={{flex:1,justifyContent:"center"}}>
    <View 
    style={{position:"absolute",left:12}}
    >
    <SearchIcon />
    </View>
<TextInput 
style={{width:"100%",paddingHorizontal:44}}
placeholder="Search"
onChangeText={(d)=>{
  setSearchText(d);
}}
/>
</SearchContainer>
<TouchableOpacity 
onPress={()=>{
    setSection("New Bulk Transfer");
}}
>
<PlusIcon />
</TouchableOpacity>
</View>
<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{[...list.filter((a,i)=>a.groupName?.includes(searchText)),...placeHolder.filter((a,i)=>list.length < i)].map((item,index)=><ItemView 
onPress={()=>{
  if(item.groupName)
  {
    setSelectBeneficiaryList(item.beneficiaries!)
    setSelectedGroup({
      ...selectedGroup,
      groupId:item.id,
      groupName:item.groupName
    })
    setSection("Details");
  }
}}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 numberOfLines={1} style={{fontSize:14,color:COLOURS.black}}>{item.groupName?item.groupName:""}</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>{item.groupName?`${item.beneficiaries?.length} Beneficiaries`:""}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{item.groupName?`₦${ReturnComma(String(item.totalAmount))}`:""}</Text1>
 </View>
 </ItemView>)}
 </View>
</View>:null}
{section === "Enter your Transaction PIN"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,minHeight:DEVICE.height - 136,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<PINScreen
 goBack={()=>setSection("Bulk transfer")}
 subTitle="Enter your transaction PIN to confirm this transaction"
 onValue={()=>{
  setSending(true)
  const data:CreateNewBulkTranferProp = {
    groupName:formData.groupName,
    beneficiaries:formData.beneficiaries.map((a,i)=>{
      a.amount = parseFloat(String(a.amount));
      a.isQNovaAccount = String(a.isQNovaAccount) === "true"
      return a
    }),
    totalAmount:formData.beneficiaries.map((a,i)=>parseFloat(String(a.amount))).reduce((a,b)=>a+b,0)
  }
  console.log(data);
   CreateNewBulkTranfer(data).then((res)=>{
    setSending(false);
    if(res.status)
    {
      GetBulkListBeneficiaries();
      setSection("success");
    }
 })
 }}
 
 data={{}}
 status="pin"
 />
 </View>:null}
 {section === "Details"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,minHeight:DEVICE.height - 136,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{flexDirection:"row",alignItems:"center",gap:20}}>
<SearchContainer style={{flex:1,justifyContent:"center"}}>
    <View 
    style={{position:"absolute",left:12}}
    >
    <SearchIcon />
    </View>
<TextInput 
style={{width:"100%",paddingHorizontal:44}}
placeholder="Search"
onChangeText={(d)=>{
  setSearchText(d);
}}
/>
</SearchContainer>
<TouchableOpacity 
onPress={()=>{
    setSection("New Bulk Transfer");
}}
>
<PlusIcon />
</TouchableOpacity>
</View>
<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{selectedBeneficiaryList.filter((a,i)=>a.accountName?.includes(searchText)).map((item,index)=><ItemView 
onPress={()=>{
  setSelectedGroup({
    ...selectedGroup,
    ...item
  })
  setSection("Beneficiary Details");
}}
 >
  <View style={{width:25,height:25,backgroundColor:"#ddd",marginRight:10}}>
  </View>
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 numberOfLines={1} style={{fontSize:14,color:COLOURS.black}}>{item.accountName}</Text1>
 <Text1  style={{fontSize:10,marginTop:0}}>{item.bankName}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{`₦${ReturnComma(String(item.amount))}`}</Text1>
 </View>
 </ItemView>)}
 </View>
</View>:null}
</AppContainer>
}
export default BulkTransferComponent;
const SearchContainer = styled.View`
height: 56px;
align-items: center;
flex: 1 0 0;
border-radius: 12px;
background: #FFF;`


const PlusIcon=()=>{
  return (
    <Svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
    >
      <Rect width={56} height={56} rx={12} fill="#8B1D41" />
      <Path
        d="M28 24v8m-4-4h8m6 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
const SearchIcon = ()=>{
    return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z"
            stroke="#7B7F99"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )
}
const Text1 = styled.Text`
color: rgba(123, 127, 153, 0.50);
text-align: center;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 12px;
font-style: normal;
font-weight: 600;
`;
export const ItemView = styled.TouchableOpacity`
border-radius: 12px;
background: #FFF;
display: flex;
height: 72px;
padding: 16px 12px;
justify-content: space-between;
align-items: center;
flex-direction:row;
`;