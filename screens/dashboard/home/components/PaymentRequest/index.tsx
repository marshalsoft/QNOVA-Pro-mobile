import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, DeviceEventEmitter, BackHandler } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import * as y  from 'yup';

import styled from "styled-components/native";
import PaymentRequestDetailComponent from "./RequestDetails";
import NewRequestComponent from "./NewRequest";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import useHttp from "../../../../../includes/http.hooks";
import { connect } from "react-redux";
import { BaseModalLoader } from "../../../../../components/baseLoader";
type SectionProp = "Payment Request" | "Request Details" | "New Request" | "pin" | "success";
const PaymentRequestScreen = ({route,goBack,Reducer,onSuccess}: ScreenComponentType) => {
  const [section,setSection] = useState<SectionProp>("Payment Request");
  const {GetPaymentInvoice,CreateNewInvoice} = useHttp();
  const [saveData,setSaveData] = useState<any>();
  const [loading,setLoading] = useState<boolean>(false);
  const [selectedTab,setSelectedTab] = useState<string>("All");
  const [selectedItem,setSelectedItem] = useState<any>();
  const tabs:string[] = [
        "All",
        "Pending",
        "Paid",
        "Expired"
    ];
    const [list,setList] = useState<any[]>([
        {},
        {},
        {},
        {},
        {},
        {}
    ])
    const [placeHolder,setPlaceHolder] = useState<any[]>([
      {},
      {},
      {},
      {},
      {},
      {}
  ])
const GetInvoices = ()=>{
  if(Reducer?.selectedBusiness?.regNumber)
  {
  GetPaymentInvoice({
    profileId:Reducer?.selectedBusiness?.regNumber!
  }).then((res)=>{
    // alert(JSON.stringify(res.data))
    if(res.status)
    {
      // setList(res.data);
    }
  })
}
}
const HandleGoBackButton = ()=>{
  if(section === "Payment Request")
    {
        if(goBack)
        {
        goBack();
        }
    }else if(section === "pin")
      {
        setSection("New Request")
      }else{
        setSection("Payment Request")
    }
  return true;
}
var searchText = selectedTab;
if(selectedTab === "All")
{
  searchText = "";
}
    useEffect(()=>{
      GetInvoices();
     BackHandler.addEventListener("hardwareBackPress",HandleGoBackButton)
    return ()=>{
      BackHandler.removeEventListener("hardwareBackPress",HandleGoBackButton);
    }
    },[])
    if(section === "pin")
      {
      return <View style={{flexDirection:"column",flex:1}}>
      <PINScreen
      goBack={()=>setSection("New Request")}
      subTitle="Enter your transaction PIN to confirm this transaction"
      onValue={()=>{
       
      }}
      data={{}}
      status="pin"
      />
      {loading && <BaseModalLoader modal/>}
      </View>
    }
    if(section === "success")
      {
      return <SuccessScreen 
      message="Payment Request Created!"
      raiseIssueBtnText="Share Payment Link"
      shareBtnText="Share Invoice"
      goBack={()=>setSection("Payment Request")}
      />
      }
     return <AppContainer
    showNavBar
    white
    goBack={()=>{
      HandleGoBackButton();
    }}
    title={section}
    footer={section === "Payment Request" ?<TouchableOpacity 
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
{section === "Request Details"?<PaymentRequestDetailComponent
goBack={()=>setSection("Payment Request")}
route={{
    params:Reducer!
}}
/>:null}
{section === "New Request"?<NewRequestComponent
goBack={()=>setSection("Payment Request")}
route={{
 params:Reducer
}}
onSuccess={(d)=>{
  setSaveData(d.data);
  // setSection("pin");
  setLoading(true);
  CreateNewInvoice({
    profileId:Reducer?.selectedBusiness?.regNumber!,
    data:d.data
  }).then((res)=>{
  setLoading(false);
    if(res.status)
    {
      GetInvoices();
      setSection("success")
    }
  })
}}
/>:null}
{section === "Payment Request"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
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
/>
</SearchContainer>
<TouchableOpacity 
onPress={()=>{
    setSection("New Request");
}}
>
<PlusIcon />
</TouchableOpacity>
</View>
<View style={{height:50,width:"100%",marginTop:20}}>
<ScrollView 
horizontal
>
<View style={{flexDirection:"row",alignItems:"center",gap:20}}>
{tabs.map((item,index)=><TouchableOpacity
onPress={()=>setSelectedTab(item)}
style={{paddingHorizontal:20,paddingVertical:16,borderBottomColor:selectedTab === item?COLOURS.purple:"transparent",borderBottomWidth:2}}
>
 <Text1 style={{color:selectedTab === item?COLOURS.purple:"rgba(123, 127, 153, 0.50)"}}>{item}</Text1>
</TouchableOpacity>)}
</View>
</ScrollView>
</View>
<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{[...list,...placeHolder.filter((a,i)=>i > list.length - 1)].filter((a,i)=>String(a.title).toLowerCase().includes(searchText.toLowerCase())).map((item,index)=><ItemView 
onPress={()=>{
    setSelectedItem(item);
    setSection("Request Details") 
}}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}></Text1>
 <Text1  style={{fontSize:10,marginTop:8}}></Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}></Text1>
 <View style={{flexDirection:"row",alignItems:"center",gap:3,marginTop:8}}>
    {item?.amount?<View  style={{width:5,height:5,backgroundColor:COLOURS.green,borderRadius:5}}/>:null}
 <Text1 ></Text1>
 </View>
 </View>
 </ItemView>)}
</View>
</View>:null}
{loading && <BaseModalLoader modal />}
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(PaymentRequestScreen);

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