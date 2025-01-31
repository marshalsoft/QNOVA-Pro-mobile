import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler, Share, Switch } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
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
    // accountNumber:y.string().required('Account Number is required.').min(10,'Account Number must be 10 digits.'),
    // accountName:y.string().required('Account Name is required.'),
    amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
    narration:y.string().required('Narration is required.')
});
import styled from "styled-components/native";
import { SearchIcon } from "../userStaffManagement";
const SalaryComponent = ({route,goBack,onSuccess}: ScreenComponentType) => {
const handleBack = ()=>{
    if(goBack)
    {
    goBack();
    }
    return true;
}
const [selectedTab,setSelectedTab] = useState<string>("All");
const [selected,setSelected] = useState<number>(0)
const tabs:string[] = [
    "All",
    "Pending",
    "Processing",
    "Processed"
]; 
const [list,setList] = useState<any[]>([
    {},
    {},
    {},
    {},
    {},
    {}
])  
    useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",handleBack);
    return ()=>{
    BackHandler.removeEventListener("hardwareBackPress",handleBack);
    }
    },[])
return <Formik
initialValues={{
  accountType:"",
  accountNumber:"",
  accountName:"",
  amount:"",
  narration:""
}}
onSubmit={(values:FormikValues, actions:any) => {
    if(onSuccess)
   {
    onSuccess({data:values})
   }
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{paddingHorizontal:16}}>
<Text style={{fontSize:14,marginBottom:30,color:"rgba(123, 127, 153, 1)",textAlign:"center",width:"85%",alignSelf:"center"}}>Placeholder copy goes here, I'm sure you know already</Text>
<View style={{flexDirection:"row",alignItems:"center",gap:20,marginBottom:20}}>
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
    // setSection("Salary");
}}
>
<DotsIcon />
</TouchableOpacity>
</View>
<View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Staff (23)</Text>
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
{list.map((item,index)=><ItemView 
onPress={()=>{
}}
 >
 <View style={{flexDirection:"column",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}>
 <Text1 style={{fontSize:14,color:COLOURS.black}}>01/01/2025</Text1>
 <Text1  style={{fontSize:10,marginTop:8}}>23 staff</Text1>
 </View>
 <View style={{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end"}}>
 <Text1  style={{fontSize:14,color:COLOURS.black}}>₦5,000.00</Text1>
 <View style={{flexDirection:"row",alignItems:"center",gap:3,marginTop:8}}>
    <View  style={{width:5,height:5,backgroundColor:COLOURS.green,borderRadius:5}}/>
 <Text1 >Processing</Text1>
 </View>
 </View>
 </ItemView>)}
</View>

</View>
</View>)}
 </Formik>
}
export default SalaryComponent;
const SearchContainer = styled.View`
height: 56px;
align-items: center;
flex: 1 0 0;
border-radius: 12px;
background: #FFF;`

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


const DotsIcon = ()=>{
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