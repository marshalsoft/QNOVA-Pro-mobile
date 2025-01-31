import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import styled from "styled-components/native";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import { StaffProps } from "../userStaffManagement";
import NewCustomerComponent from "./NewCustomer";
import useHttp from "../../../../../includes/http.hooks";
import { BaseModalLoader } from "../../../../../components/baseLoader";
import { connect } from "react-redux";
type SectionProp = "Address book" | "Customer Details" | "New Customer" | "pin" | "success";
interface CompanyProfileProp {
  accountNumber?:string; 
  accountType?:string;
  avatar?:string;
  bankCode?:string;
  bankName?:string;
  companyName?:string;
  country?:string;
  createdAt?:string;
  email?:string;
  fullName?:string;
  id?:string;
  notes?:string;
  primaryPhoneNumber?:string;
  updatedAt?:string;
  username?:string;
}
const CustomerManagementScreen = ({route,goBack,Reducer,onSuccess}: ScreenComponentType) => {
    const [searchText,setSearchText] = useState<string>("");
    const [section,setSection] = useState<SectionProp>("Address book");
    const [saveData,setSaveData] = useState<any>()
   const {AddNewAddressBook,GetAddressBook,loading} = useHttp();
   const [list,setList] = useState<CompanyProfileProp[]>([])
   const [placeholder,setPlaceHolder] = useState<CompanyProfileProp[]>(Array.from({length:7}))
const GetListOfAddresses = ()=>{
  GetAddressBook(Reducer?.selectedBusiness?.regNumber).then((res)=>{
    if(res.status)
    {
      setList(res.data)
    }
  })
}
    useEffect(()=>{
      GetListOfAddresses();
    },[Reducer?.selectedBusiness])
    if(section === "pin")
      {
      return <View style={{flex:1,flexDirection:"column"}}>
        <PINScreen
      goBack={()=>setSection("Address book")}
      subTitle="Enter your transaction PIN to confirm this transaction"
      onValue={(pin)=>{
        AddNewAddressBook({...saveData,transactionPin:pin,profileId:Reducer?.selectedBusiness?.regNumber}).then((res)=>{
          if(res.status)
          {
            setSection("success")
          }
        })
        // 
      }}
      data={{}}
      status="pin"
      />
      {loading && <BaseModalLoader modal />}
      </View>
    }
    if(section === "success")
      {
      return <SuccessScreen 
      message="Customer Invited!"
      goBack={()=>setSection("Address book")}
      hideShareBtn
      />
      }
     return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(section === "Address book")
        {
            if(goBack)
            {
            goBack();
            }
        }else{
            setSection("Address book")
        }
    }}
    title={section}
    footer={section === "Address book" ?<TouchableOpacity 
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
      </TouchableOpacity>:<></>}
    >
{/* {section === "Request Details"?<PaymentRequestDetailComponent
goBack={()=>setSection("Payment Request")}
route={{
    params:selectedItem
}}
/>:null}
*/}
{section === "New Customer"?<NewCustomerComponent
goBack={()=>setSection("Address book")}
route={{
    params:saveData
}}
onSuccess={(d)=>{
  setSaveData(d.data);
  setSection("pin");
}}
/>:null}
 
{section === "Address book"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
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
  setSearchText(d)
}}
/>
</SearchContainer>
<TouchableOpacity 
onPress={()=>{
    setSection("New Customer");
}}
>
<PlusIcon />
</TouchableOpacity>
</View>

<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{[...list.filter((item,index)=>String(item?.companyName).includes(searchText)
),...placeholder.filter((a,i)=>i > list.length)].map((item,index)=><ItemView 
onPress={()=>{
    // setSelectedItem(item);
    // setSection("User Details") 
}}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}>{item?.companyName}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{item?.fullName}</Text1>
 <Text1  style={{fontSize:12,color:COLOURS.gray64}}>{item?.email}</Text1>
 </View>
 </ItemView>)}
</View> 
</View>:null}
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(CustomerManagementScreen);

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