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
import BaseButtonOptions from "../../../../../components/baseButtonOptions";
type SectionProp = "Salary" ;
interface PayrollProps {
  createdAt?:string;
  dayOfMonth?:number;
  id?:string;
  isPaid?:boolean;
  organizationId?:string;
  payrollFrequency?:string;
  payrollName?:string;
  payrollRecords?:PayrolRecordProp[];
  timeOfDay?:string;
  totalAmount?:string;
  updatedAt?:string;
}
interface PayrolRecordProp {
  staffId?:string;
  amount?:string;
  id?:string;
  isPaid?:boolean;
  createdAt?:string;
  updatedAt?:string;
  staff?:{
    id?:string;
    fullName?:string;
    avatar?:string;
    primaryPhoneNumber?:string;
    email?:string;
    username?:string;
    role?:string;
    country?:string;
    activatedAt?:string;
    invitationCode?:string;
    accountStatus?:string;
    createdAt?:string;
    updatedAt?:string;
    organizationId?:string;
  }
}
const PayRollRecordsScreen = ({route,Reducer,goBack,onSuccess}: ScreenComponentType) => {
  var Options = [
    {icon:<PayIcon />,title:"Pay Salary",value:"pay"},
    {icon:<EditIcon />,title:"Edit Payrol",value:"edit"},
    {icon:<DeleteIcon />,title:"Delete Payrol",value:"delete"}
  ];
  const [details,setDetails] = useState<PayrollProps>();
  const [message,setMessage] = useState("");
  const [searchQuery,setSearchQuery] = useState<string>("");
  const [selected,setSelected] = useState<number>(0)
  const [processing,setProcessing] = useState<boolean>(false);
    const [selectedItem,setSelectedItem] = useState<any>();
    const [saveData,setSaveData] = useState<any>();
    const [showOptions,setShowOptions] = useState<boolean>(false);
    const [section,setSection] = useState<SectionProp>("Salary");
    const {GetSalaryHistory} = useHttp();
    const [list,setList] = useState<PayrolRecordProp[]>([
    ]);
    const [history,setHistory] = useState<PayrolRecordProp[]>([
    ]);
    const placeholder:PayrolRecordProp[] = [
      {},
      {},
      {},
      {},
      {},
      {}
  ];

    useEffect(()=>{
      if(route?.params?.createdAt)
      {
        setDetails(route?.params);
      }
    },[route?.params])
const searchText = String(searchQuery).trim();
 return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(goBack)
            {
            goBack();
            }
       
    }}
    title={section}
    footer={section === "Salary" ?<TouchableOpacity 
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
{section === "Salary"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
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
<BaseButtonOptions 
onChange={(d)=>{
}}
list={Options}
title="More"
>
<DotsIcon />
</BaseButtonOptions>
</View>
<View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5,marginTop:20}}>
<TouchableOpacity 
            onPress={()=>{
                setSelected(0)
            }}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>{
                 setSelected(1);
             }}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Staffs ({details?.payrollRecords?.length}) </Text>
            </TouchableOpacity>
 </View>
{selected === 1?<View style={{flexDirection:"column",gap:20,marginTop:20}}>
{(details?.payrollRecords?[...details?.payrollRecords?.filter((a,i)=>String(a.staffId).toLowerCase()?.includes(String(searchText).toLowerCase())),...placeholder.filter((a,i)=>i > list.length )]:placeholder).map((item,index)=><ItemViewNonClickAble 
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}>{item.staff?.fullName}</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>{item.amount?item.staff?.username+" . "+item.staff?.organizationId:""}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{item.amount?CURRENCIES.Naira.Symbol+ReturnComma(String(item.amount)):""} </Text1>
 </View>
 </ItemViewNonClickAble>)}
</View>:<View style={{flexDirection:"column",gap:20,marginTop:20}}>
{[...history?.filter((a,i)=>String(a.staffId).toLowerCase()?.includes(String(searchText).toLowerCase())),...placeholder.filter((a,i)=>i > list.length )].map((item,index)=><ItemView 
key={index}
activeOpacity={item.staffId?0:1}
disabled={!item.staffId}
onPress={()=>{
  if(item.staffId)
  {
console.log (JSON.stringify(item))
// alert (JSON.stringify(item))
  }
    // setSelectedItem();
    // setSection("Confirm Details") 
}}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}>{item.staff?.fullName}</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>{item.amount?item.staff?.username+" . "+item.staff?.organizationId:""}</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>{item.amount?CURRENCIES.Naira.Symbol+ReturnComma(String(item.amount)):""} </Text1>
 </View>
 </ItemView>)}
</View>}
</View>:null} 
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(PayRollRecordsScreen);

const SearchContainer = styled.View`
height: 56px;
align-items: center;
flex: 1 0 0;
border-radius: 12px;
background: #FFF;`


const DotsIcon=()=>{
  return (
    <Svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill="none"
  >
    <Rect width={56} height={56} rx={12} fill="#8B1D41" />
    <Path
      d="M28 29a1 1 0 100-2 1 1 0 000 2zM28 22a1 1 0 100-2 1 1 0 000 2zM28 36a1 1 0 100-2 1 1 0 000 2z"
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
export const ItemViewNonClickAble = styled.View`
border-radius: 12px;
background: #FFF;
display: flex;
height: 72px;
padding: 16px 12px;
justify-content: space-between;
align-items: center;
flex-direction:row;
`;
const PayIcon = ()=>{
  return (
    <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
  >
    <Path
      d="M14 14V8m0 0H8m6 0l-6 6m13-3c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10z"
      stroke="#8B1D41"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
    )
}
const EditIcon = ()=>{
  return (<Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
  >
    <Path
      d="M19 17l-1 1.094c-.53.58-1.25.906-2 .906a2.71 2.71 0 01-2-.906 2.716 2.716 0 00-2-.904c-.75 0-1.469.325-2 .904M1 19h1.675c.489 0 .733 0 .963-.055.205-.05.4-.13.579-.24.201-.123.374-.296.72-.642L17.5 5.5a2.121 2.121 0 10-3-3L1.937 15.063c-.346.346-.519.519-.642.72a2 2 0 00-.24.579c-.055.23-.055.474-.055.964V19z"
      stroke="#8B1D41"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
    )
}
const DeleteIcon = ()=>{
  return (<Svg
    width={20}
    height={22}
    viewBox="0 0 20 22"
    fill="none"
  >
    <Path
      d="M14 5v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C12.48 1 11.92 1 10.8 1H9.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C6 2.52 6 3.08 6 4.2V5m2 5.5v5m4-5v5M1 5h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311C14.72 21 13.88 21 12.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.311C3 18.72 3 17.88 3 16.2V5"
      stroke="#8B1D41"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
    )
}