import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, CURRENCIES, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import * as y  from 'yup';
import styled from "styled-components/native";
import PayrollDetailComponent from "./PayrollDetails";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import SalaryComponent from "./Salary";
import useHttp from "../../../../../includes/http.hooks";
import NewSalaryComponent from "./newSalary";
import { connect } from "react-redux";
import { BaseModalLoader } from "../../../../../components/baseLoader";
import { ReturnComma } from "../../../../../includes/functions";
import moment from "moment";
import PayRollRecordsScreen  from "./records";
type SectionProp = "Payroll Management" | "Confirm Details" | "Salary" | "New Payroll" | "pin" | "success" | "Details";
interface PayrollProps {
  createdAt?:string;
  dayOfMonth?:number;
  id?:string;
  isPaid?:boolean;
  organizationId?:string;
  payrollFrequency?:string;
  payrollName?:string;
  payrollRecords?:string[];
  timeOfDay?:string;
  totalAmount?:string;
  updatedAt?:string;
}
const PayRollManagementScreen = ({route,Reducer,goBack,onSuccess}: ScreenComponentType) => {
  const {GetPayrollList,CreatePayroll} = useHttp();
  const [message,setMessage] = useState("");
  const [searchQuery,setSearchQuery] = useState<string>("");
  const [selectedTab,setSelectedTab] = useState<string>("All");
  const [processing,setProcessing] = useState<boolean>(false);
    const [selectedItem,setSelectedItem] = useState<PayrollProps>();
    const [saveData,setSaveData] = useState<any>();
    const [section,setSection] = useState<SectionProp>("Payroll Management");
    const tabs:string[] = [
        "All",
        "Due"
    ];
    const [list,setList] = useState<PayrollProps[]>([
    ]);
    const placeholder:PayrollProps[] = [
      {},
      {},
      {},
      {},
      {},
      {}
  ];
const GetPayroll = ()=>{
  GetPayrollList(
    Reducer?.selectedBusiness?.regNumber!
  ).then((res)=>{
  if(res.data)
  {
    setList(res.data);
  }
  })
}
    useEffect(()=>{
      GetPayroll();
    },[])
const searchText = String(searchQuery).trim();
    if(section === "pin")
      {
      return <View  
      style={{flex:1,flexDirection:"column"}}>
        <PINScreen
      password
      goBack={()=>setSection("Confirm Details")}
      title="Password"
      subTitle="Enter your current password to continue."
      onValue={(pin)=>{
        // alert(JSON.stringify(saveData));
        // return ;
        setProcessing(true);
        CreatePayroll({data:{
          ...saveData,
          password:pin,
          timeOfDay:String(saveData.timeOfDay).replace(/[ A-Z]/g,"")
        },
      profileId:Reducer?.selectedBusiness?.regNumber!
      }).then((res)=>{
        setProcessing(false);
        if(res.data)
        {
          GetPayroll();
          setMessage(res.message);
          setSection("success");
        }
        })
      }}
      data={{}}
      status="pin"
      />
      {processing && <BaseModalLoader modal/>}
      </View>
    }
    if(section === "success")
    {
      return <SuccessScreen 
      message={message}
      goBack={()=>setSection("Payroll Management")}
      hideShareBtn
      />
      }
    if(section === "Details")
    {
    return <PayRollRecordsScreen
    route={{
      params:selectedItem
    }}
    goBack={()=>setSection("Payroll Management")}
    />
    }
 return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(section === "Payroll Management")
        {
            if(goBack)
            {
            goBack();
            }
        }else{
            setSection("Payroll Management")
        }
    }}
    title={section}
    footer={section === "Payroll Management" ?<TouchableOpacity 
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
{section === "Confirm Details"?<PayrollDetailComponent
goBack={()=>setSection("New Payroll")}
onSuccess={()=>setSection("pin")}
Reducer={Reducer}
route={{
    params:saveData
}}
/>:null}

{section === "Salary"?<SalaryComponent
goBack={()=>setSection("Payroll Management")}
route={{
    params:selectedItem
}}
onSuccess={()=>setSection("pin")}
/>:null}
{section === "New Payroll"?<NewSalaryComponent 
onSuccess={(data)=>{
  setSaveData(data.data);
  setSection("Confirm Details")
}}
/>:null}
{section === "Payroll Management"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{flexDirection:"row",alignItems:"center",gap:20}}>
<SearchContainer style={{flex:1,justifyContent:"center"}}>
    <View 
    style={{position:"absolute",left:12}}
    >
    <SearchIcon />
    </View>
<TextInput 
style={{width:"100%",paddingHorizontal:44}}
placeholder="Search..."
/>
</SearchContainer>
<TouchableOpacity 
onPress={()=>{
    setSection("New Payroll");
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
<View style={{flexDirection:"column",gap:20,marginTop:20}}>
{[...list.filter((a,i)=>String(a.payrollName).toLowerCase()?.includes(String(searchText).toLowerCase())),...placeholder.filter((a,i)=>i > list.length )].map((item,index)=><ItemView 
key={index}
activeOpacity={item.payrollName?0:1}
disabled={!item.payrollName}
onPress={()=>{
  if(item.payrollName)
  {
    setSelectedItem(item);
    setSection("Details");
  }
    // 
    // 
}}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}>{item.payrollName}</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>{item.totalAmount?item.payrollRecords?.length + " staffs":""}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{item.totalAmount?CURRENCIES.Naira.Symbol+ReturnComma(String(item.totalAmount)):""} </Text1>
 <Text1  style={{fontSize:10,marginTop:8}}> {item.totalAmount?moment(item.createdAt).format("Do, MMM YYYY"):""}</Text1>
 </View>
 </ItemView>)}
</View>
</View>:null} 
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(PayRollManagementScreen);

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