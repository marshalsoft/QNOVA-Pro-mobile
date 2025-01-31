import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, BackHandler, ViewStyle } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { ReactNode, useEffect, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import AppStyles from "../../../../../includes/styles";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { navigationRef } from "../../../../../App";
import { BtnNavProp } from "../menuComponents";
import BaseSelect from "../../../../../components/baseSelect";
import BaseButton from "../../../../../components/baseButton";
import { ReturnComma } from "../../../../../includes/functions";
import { BeneficiariesProp, BeneficiariesType, WalletToWalletFormProp } from ".";

export interface MockProp {
    label:string;
    value:string;
    component?:ReactNode;
    style?:ViewStyle;
}
interface WalletTransferPreviewScreenProp {
data:any;
goBack:()=>void;
onNext:()=>void;
beneficiaries:BeneficiariesType[];
}
const WalletTransferPreviewScreen = ({data,beneficiaries, goBack,onNext}:WalletTransferPreviewScreenProp ) => {
   const {
    accountName,
    walletReceiver,
    type,
    amount,
    narration,
    accountNumber
   } = data;
   const GoBackHandler = ()=>{
    goBack();
    return true;
   }
   useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",GoBackHandler)
    return ()=>{
        BackHandler.removeEventListener("hardwareBackPress",GoBackHandler)
    }
   },[])
    return <View style={{paddingHorizontal:20,flexDirection:"column",position:"absolute",backgroundColor:"rgba(242, 242, 242, 1)",top:0,height:DEVICE.height - 100,width:DEVICE.width,paddingVertical:20,borderTopRightRadius:20,borderTopLeftRadius:20}}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
       <View style={{flexDirection:"column",height:DEVICE.height + 80}} >
        <Text style={{fontSize:14,marginBottom:30,color:"rgba(123, 127, 153, 1)",textAlign:"center"}}>Review the details of this transaction before you proceed</Text>
        <MockInput 
        label="Account"
        value={type!}
        />
        {beneficiaries?.length == 0?<View style={{flexDirection:"column"}}>
        <View style={[Styles.divider,{marginBottom:20}]} />
        <MockInput 
        value={accountNumber!}
        label="Account Number"
        />
        <View style={[Styles.divider,{marginBottom:20}]} />
        <MockInput 
        value={accountName}
        label="Account Name"
        />
        </View>:<View style={{flexDirection:"row"}}>
        
        </View>}
        <View style={[Styles.divider,{marginBottom:20}]} />
        <MockInput 
        value={`₦${ReturnComma(amount!)}`}
        label="Amount"
        />
        <View style={[Styles.divider,{marginBottom:20}]} />
        <MockInput 
        value="₦0.00"
        label="Fee"
        />
        <View style={[Styles.divider,{marginBottom:20}]} />
        <MockInput 
        value={`₦${ReturnComma(amount!)}`}
        label="Total"
        />
        <View style={[Styles.divider,{marginBottom:20}]} />
        <MockInput 
        value={narration!}
        label="Narration"
        />
        <View style={[Styles.divider,{marginBottom:20}]} />
        <BaseButton 
        title="Proceed"
        onPress={()=>{
            if(onNext)
            {
                onNext();
            }
        }}
        />
        </View>
    </ScrollView>
   </View>
}
export default WalletTransferPreviewScreen;

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
export const MockInput = (prop:MockProp)=>{
    return <View style={{flexDirection:"column",marginBottom:20,...prop.style}}>
        <Text style={[Styles.label]} >{prop.label}</Text>
        {prop.component?prop.component:<Text numberOfLines={1} style={[Styles.input]} >{prop.value}</Text>}
    </View>
}
