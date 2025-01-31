import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler, Share } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, CURRENCIES, DEVICE, FONTFAMILY} from "../../../../../includes/constants";
import { useEffect} from "react";
import BaseButton from "../../../../../components/baseButton";

import styled from "styled-components/native";
import { MockInput } from "../walletTransfer/preview";
import { ReturnComma } from "../../../../../includes/functions";
const PayrollDetailComponent = ({route,goBack,Reducer,onSuccess}: ScreenComponentType) => {
 
const handleBack = ()=>{
    if(goBack)
    {
    goBack();
    }
    return true;
}
    useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",handleBack);
    return ()=>{
    BackHandler.removeEventListener("hardwareBackPress",handleBack);
    }
    },[])
var total = 0;
if(route?.params?.beneficiaries)
{
    total = route?.params?.beneficiaries.map((a:any,i:number)=>{
        return parseFloat(a.amount)}).reduce((a:number,b:number)=>a+b,0);
}
return <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<Text style={{fontSize:14,marginBottom:20,color:"rgba(123, 127, 153, 1)",textAlign:"center",width:"90%",alignSelf:"center"}}>Efficient Payroll Management at Your Fingertips</Text>
 <Text1 style={{color:COLOURS.purple,alignSelf:"flex-start",marginBottom:16,fontWeight:"bold",fontFamily:FONTFAMILY.INTER.medium,fontSize:14}}>Payroll</Text1>
 <MockInput 
 label={"Payroll Name"}
 value={route?.params?.payrollName}
 />
<View style={[Styles.divider,{marginBottom:20}]} />
{route?.params?.beneficiaries?.map((a:any,i:number,self:any[])=>{
    return <View key={i} style={{flexDirection:"column"}}>
<MockInput 
 label="StaffId"
 value={""}
 component={<View style={{flexDirection:"row",alignItems:"center",gap:10}}>
    <Text >QNOVA Pro </Text>
    <View style={{width:5,height:5,backgroundColor:COLOURS.black,borderRadius:3}}/>
    <Text >{a.staffId}</Text>
    <View style={{width:5,height:5,backgroundColor:COLOURS.black,borderRadius:3}}/>
    <Text>{CURRENCIES.Naira.Symbol}{ReturnComma(a.staffId)}</Text>
 </View>}
 />
{i !== self.length - 1?<View style={[Styles.divider,{marginBottom:20}]} />:null}
</View>})}
<View style={[Styles.divider,{marginBottom:20}]} />
 <MockInput 
 label="Amount"
 value={`${CURRENCIES.Naira.Symbol}${ReturnComma(String(total))}`}
 />
 <View style={[Styles.divider,{marginBottom:20}]} />
 <MockInput 
 value={"₦0"}
 label="Fees"
 />
 <View style={[Styles.divider,{marginBottom:20}]} />
<MockInput 
 value={`${CURRENCIES.Naira.Symbol}${ReturnComma(String(total))}`}
 label="Total"
 />
 
 <View style={[Styles.divider,{marginBottom:60}]} />
 <BaseButton 
 title="Proceed"
 onPress={()=>{
    if(onSuccess)
    {
        onSuccess({});
    }
 }}
 style={{marginBottom:80}}
 />
</View>
</View>
}
export default PayrollDetailComponent;

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
const Styles = StyleSheet.create({
    smallcard:{
        width:100,
        height:84,
        borderRadius:8,
        backgroundColor:COLOURS.white,
        padding:8
    },
    label:{
        fontSize:10,
        fontFamily:FONTFAMILY.INTER.normal,
        color:"rgba(123, 127, 153, 1)"
    },
    input:{
        fontSize:14,
        fontFamily:FONTFAMILY.INTER.normal,
        color:"rgba(0, 0, 0, 1)"
    },
    divider:{
        height:1,
        backgroundColor:"rgba(123, 127, 153, 0.1)",
        width:"100%"
    }
})

const CopyIcon = ()=>{
        return (
          <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
          >
            <Path
              d="M5 2h4.733c1.494 0 2.24 0 2.811.29.502.256.91.664 1.165 1.166.291.57.291 1.317.291 2.81V11m-9.867 3h5.4c.747 0 1.12 0 1.406-.145.25-.128.454-.332.582-.583.146-.285.146-.659.146-1.405v-5.4c0-.747 0-1.12-.146-1.406a1.333 1.333 0 00-.582-.582c-.286-.146-.659-.146-1.406-.146h-5.4c-.746 0-1.12 0-1.405.146-.25.127-.455.331-.583.582C2 5.347 2 5.72 2 6.467v5.4c0 .746 0 1.12.145 1.405.128.25.332.455.583.583.285.145.659.145 1.405.145z"
              stroke="#7B7F99"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )
}