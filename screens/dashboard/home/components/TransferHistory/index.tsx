import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, CURRENCIES, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import * as y  from 'yup';
const Schema = y.object({
    fromDate:y.string().required('Start Date is required.'),
    toDate:y.string().required('End Date is required.')
});
import styled from "styled-components/native";
import BaseSelect from "../../../../../components/baseSelect";
import BaseInputDate from "../../../../../components/baseInputDate";
import BaseButton from "../../../../../components/baseButton";
import useHttp from "../../../../../includes/http.hooks";
import { ReturnComma } from "../../../../../includes/functions";
import moment from "moment";
import { Formik } from "formik";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import { navigationRef } from "../../../../../App";
import { BaseModalLoader } from "../../../../../components/baseLoader";
import { connect } from "react-redux";
type SectionProp = "History" | "Details" | "success";
interface TransactionHistoryProp {
  amount?:string;
  balanceAfter?:string;
  balanceBefore?:string;
  bulkTransferBeneficiaryGroupId?:string;
  createdAt?:string;
  fromBank?:string;
  id?:string;
  isDistressTransaction?:string;
  metadata?:{
    description?:string;
    statusCode?:string;
    baxiReference?:string;
    provider_message?:string;
    transactionStatus?:string;
    transactionMessage?:string;
    transactionReference?:string;
  };
  reference?:string;
  status?:string;
  toBank?:string;
  transactionCategory?:string;
  type?:string;
  updatedAt?:string;
  narration?:string;
  userId?:string;
  walletId?:string;
  divider?:boolean;
  title?:string;
}
const TransactionHistoryScreen = ({route,goBack,Reducer,onSuccess}: ScreenComponentType) => {
   const {ShowMessage,GetAllTransactions,RequestAccountStatement} = useHttp();
 const [selectedwalletId,setSelectedwalletId] = useState<string>("");
   const [selectedTab,setSelectedTab] = useState<string>("All");
    const [processing,setProcessing] = useState<boolean>(false);
    const [saveData,setSaveData] = useState<any | null>()
    const [sucessObject,setSucessObject] = useState<{
      message:string;
      raiseIssueBtnText:string;
      shareBtnText:string;
    }>({
      message:"",
      raiseIssueBtnText:"",
      shareBtnText:""
    })
    const [section,setSection] = useState<SectionProp>("History");
    const tabs:string[] = [
        "All",
        "Inflow",
        "Wallet Transfer",
        "Outflow",
        "Bulk Transfer"
    ];
    const [list,setList] = useState<TransactionHistoryProp[]>([
      
  ]);
    const [selected,setSelected] = useState<number>(0)
 useEffect(()=>{
  GetAllTransactions({
    limit:10,
    skip:1
  }).then((res)=>{
    if(res.data)
    {
      var listOfDates:string[] = [];
      var list = res.data.map((a:TransactionHistoryProp,i:number)=>{
        if(listOfDates.indexOf(String(a.createdAt)) == -1)
        {
          listOfDates.push(String(a.createdAt));
          a.divider = true;
        }
        return a;
      });
       setList(list);
    }
  })
 },[])

 const [searchText,setSearchText] = useState<string>("")
var filterText = "";
if(["wallet"].includes(String(searchText).toLowerCase()))
{
  filterText = "";
}else if(["outflow"].includes(String(searchText).toLowerCase()))
  {
    filterText = "debit";
}else if(["inflow"].includes(String(searchText).toLowerCase()))
{
      filterText = "credit";
}else{
if(searchText === "All")
  {
    filterText = "";
}else{
  filterText = String(searchText).toLowerCase();
  }
}
const getMonth = moment().format("MMMM");
var reset = 0;
const ListOfMonths = Array.from({length:12}).map((a,i)=>{
  const month = moment(`1900-${i+1}-01`).format("MMMM");
  return `${month}`
}).filter((a,i,self)=>self.indexOf(getMonth) > i - 1);
const rangeOfMonths:ItemProps[] = ListOfMonths.map((a,i,self)=>{
  var start = i === 0?0:i * 3;
  var end = start + 2;
if(start > self.length)
{
  end = start + 2;
}
const year = moment().year();
  return {
    title:`1st ${self[start]}${i !== self.length - 1?(i === 0?" - 29th "+self[i + 2]:String(" - 29th "+self[end]).replace("- 29th undefined",`- 29th ${self[start]}`)):""}`,
    value:`${year}-${start+1>9?start+1:"0"+(start+1)}-01${i !== self.length - 1?" - "+`${year}-${end+1 > 9?end+1:"0"+(end+1)}-29`:`${year}-${start-3}-29`}`
  }
}).filter((a,i)=>!a.title.includes("1st undefined"));
if(section === "success") 
{
  return <SuccessScreen
  onSuccess={()=>{}}
  goBack={()=>{
    navigationRef.current?.goBack()
  }}
  message={sucessObject.message}
  />
}
return <AppContainer
    showNavBar
    white
    goBack={()=>{
      if(saveData)
      {
        return setSaveData(null);
      }
        if(section === "History")
        {
            if(goBack)
            {
            goBack();
            }
        }else{
            setSection("History")
        }
    }}
    title={saveData?"Transaction PIN":section}
    footer={section === "History" && !saveData ?<TouchableOpacity 
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
    disableScrol
    >

{section === "History"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",overflow:'hidden',padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<ScrollView 
showsVerticalScrollIndicator={false}
>
  <View style={{gap:20,flexDirection:"column"}}>
<BaseSelect 
 label="Select Account"
 placeholder="Please Select"
 list={Reducer?.wallets?Reducer?.wallets.map((a,i)=>{
  return {
   title:a.name,
   value:a.id
  } 
}):[]}
 onChange={(data)=>{
  setSelectedwalletId(String(data?.value));
  setSearchText(String(data?.value));
 }}
 type="custom"
//  errorMessage={touched.accountType && errors.accountType}
 />
 <View style={{flexDirection:"row",height:50,padding:4,marginTop:-30,backgroundColor:"#7B7F991A",borderRadius:16}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
  <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Account Statements</Text>
  </TouchableOpacity>
</View>
{selected === 0?<View style={{flexDirection:"column",gap:20}}>
<View style={{height:50}}>
<SearchContainer style={{justifyContent:"center"}}>
    <View 
    style={{position:"absolute",left:12}}
    >
    <SearchIcon />
    </View>
<TextInput 
style={{width:"100%",paddingHorizontal:44}}
placeholder="Search"
onChangeText={(d)=>{
  setSearchText(String(d))
}}
/>
</SearchContainer>
</View>
<View style={{height:50,flexDirection:"row"}}>
  <View style={{flex:1,flexDirection:"column"}}>
    <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
<View style={{width:5,height:5,backgroundColor:"green",borderRadius:5}} />
<Text1 style={{textAlign:"left",fontSize:10}}>Inflow</Text1>
  </View>
<Text1 style={{color:COLOURS.black,textAlign:"left",fontSize:14}}>₦12,345.67</Text1>
</View>
  <View style={{flex:1,flexDirection:"column"}}>
  <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"center",gap:5}}>
<Text1 style={{textAlign:"right",fontSize:10}}>Outflow</Text1>
<View style={{width:5,height:5,backgroundColor:"red",borderRadius:5}} />
  </View> 
   <Text1 style={{color:COLOURS.black,textAlign:"right",fontSize:14}}>+ {CURRENCIES.Naira.Symbol}12,345.67</Text1>
  </View>
</View>
<View style={{height:40,width:"100%"}}>
<ScrollView 
horizontal
nestedScrollEnabled
>
<View style={{flexDirection:"row",alignItems:"center",gap:0}}>
{tabs.map((item,index)=><TouchableOpacity
onPress={()=>{
  setSelectedTab(item)
  setSearchText(String(item))
}}
style={{paddingHorizontal:20,paddingVertical:8,borderBottomColor:selectedTab === item?COLOURS.purple:"transparent",borderBottomWidth:2}}
>
 <Text1 style={{color:selectedTab === item?COLOURS.purple:"rgba(123, 127, 153, 0.50)"}}>{item}</Text1>
</TouchableOpacity>)}
</View>
</ScrollView>
</View>
<View style={{flexDirection:"column",gap:20,marginBottom:220}}>
{list.filter((a,i)=>String(a.type).toLowerCase()?.includes(filterText) || String(a.amount).toLowerCase()?.includes(filterText) || String(a.createdAt).toLowerCase()?.includes(filterText) || String(a.walletId)?.includes(filterText)).map((a,i)=>{
    return <View style={{flexDirection:"column"}}>
      {a.divider?<Text1 style={{color:COLOURS.purple,textAlign:"left"}}>{moment(a.createdAt).fromNow()} </Text1>:null}
      <ItemView 
    style={{flexDirection:"row"}}
    >
<View style={{flex:1,justifyContent:"flex-start",paddingLeft:5}}>
<Text1 style={{color:COLOURS.black,textAlign:"left",fontSize:14}}>{a.metadata?.description?a.metadata?.description:a.metadata?.transactionMessage}</Text1>
<View style={{flexDirection:"row",alignItems:"center",gap:5}}>
<View style={{width:5,height:5,backgroundColor:a.type !== "debit"?"green":"red",borderRadius:5}} />
<Text1 style={{textAlign:"left",fontSize:10}}>{a.type !== "debit"?"Inflow":"Outflow"}</Text1>
  </View>
</View>
<View style={{flexDirection:"column"}}>
<Text1 style={{color:COLOURS.black,textAlign:"right",fontSize:14}}>+ ₦{ReturnComma(String(a?.amount))}</Text1>
<Text1 style={{textAlign:"right",fontSize:10}}>{moment(a.createdAt).format("Do, MMM, YYYY")}</Text1>
</View>
</ItemView>
</View>
})}
</View>
</View>:<Formik
initialValues={{
  range:false,
  rangeValue:"",
  fromDate:"",
  toDate:""
}}
onSubmit={(values:any, actions:any) => {
  if(selectedwalletId === "")
  {
    return ShowMessage("top").fail("Select a wallet to proceed.")
  }
  setSaveData({
    fromDate:values.fromDate,
    toDate:values.toDate 
  })
}}
validationSchema={Schema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{flexDirection:"column"}}>
<BaseSelect 
 label="Date Range"
 placeholder="Please Select"
 list={rangeOfMonths}
 onChange={(data)=>{
   setFieldValue("range",true);
   setFieldValue("rangeValue",data.value);
   const splitDate = String(data.value).split(" - ");
   setFieldValue("fromDate",splitDate[0]);
   setFieldValue("toDate",splitDate[1]);
 }}
 type="custom"
 /> 
 <View style={{flexDirection:"row",gap:20,marginBottom:10}}>
 <View style={{flex:1}}>
  <BaseInputDate 
  limit={18}
  onChange={(d)=>{
    setFieldValue("fromDate",d);
  }}
  value={values.fromDate}
  label="Start Date"
  placeholder="01/01/2000"
  />
  </View> 
  <View style={{flex:1}}>
  <BaseInputDate 
  limit={0}
  onChange={(d)=>{
    setFieldValue("toDate",d);
  }}
  value={values.toDate}
  label="End Date"
  placeholder="01/01/2000"
  />
  </View> 
  </View> 
  {/* <BaseSelect 
 label="Statement Type"
 placeholder="Please Select"
 list={[
    {title:"PDF",value:"pdf"},
    {title:"Image",value:"image"}
 ]}
 onChange={(data)=>{
    // setFieldValue("accountType",data.value)
 }}
 type="custom"
//  errorMessage={touched.accountType && errors.accountType}
 /> 
 <BaseSelect 
 label="Statement Format"
 placeholder="Please Select"
 list={[
    {title:"Custom",value:"Custom"}
 ]}
 onChange={(data)=>{
    // setFieldValue("accountType",data.value)
 }}
 type="custom"
//  errorMessage={touched.accountType && errors.accountType}
 />  */}
 <BaseButton 
 title="Generate Statement"
 onPress={handleSubmit}
 />
</View>)}
</Formik>}
</View>
</ScrollView>
{saveData?<View 
style={{flex:1,zIndex:999,backgroundColor:"#F2F2F2",height:"100%",...StyleSheet.absoluteFillObject}}
>
<PINScreen
subTitle="Enter your transaction PIN"
onValue={(pin)=>{
  setProcessing(true);
  RequestAccountStatement({...saveData,transactionPin:pin,walletId:selectedwalletId}).then((res)=>{
    setProcessing(false);
    if(res.data)
    {
      setSucessObject({
        ... sucessObject,
        message:res.message
      })
      setSection("success")
    }
    
  })
  // 
}}
status="pin"
data={{}}

/>
</View>:null}
{processing && <BaseModalLoader modal />}
</View>
:null}
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(TransactionHistoryScreen);

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