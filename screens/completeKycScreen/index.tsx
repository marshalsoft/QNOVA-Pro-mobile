import { Image, Text, StyleSheet, View, TouchableOpacity, ScrollView, DeviceEventEmitter } from "react-native";
import { ItemProps, ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useEffect, useRef, useState } from "react";
import AppContainer from "../../components/appContainer";
import BaseButton from "../../components/baseButton";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import { getUniqueId, getManufacturer,getBundleId } from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { connect } from "react-redux";
import { useStoreHook } from "../../Redux/reducer";
import { FormProps } from "../signUpScreen/businessDetails";

const CompleteKycScreen = ({Reducer,route}: ScreenComponentType) => {
  const [formData,setFormData] = useState<FormProps>({});
  const [selectedForm,setSelectedForm] = useState<"business"|null>(null)
    const [success,setSuccess] = useState<boolean>(false);
    const {loading,CreateAccount} = useHttp();
    const {update} = useStoreHook();
    useEffect(()=>{
       const x = DeviceEventEmitter.addListener(LISTENERS.createAccountForms,(data)=>{
            update({createAccountFormList:data.createAccountFormList});
            setFormData(data.formData);
        })
       return ()=>{
       x.remove();
       } 
    },[])
    var valid = false;
    if(Reducer?.createAccountFormList?.BusinessDetails?.status === "valid" && Reducer?.createAccountFormList?.KeyContactDetails?.status === "valid" && Reducer?.createAccountFormList?.UploadDocuments?.status === "valid" && formData?.bvn)
    {
      valid = true;
    }
    const handleSubmit = ()=>{
   
    }
    return <AppContainer
    showNavBar
    goBack={()=>{
     if(selectedForm !== null)
    {
    return setSelectedForm(null);
    }else if(success)
    {
      navigationRef.current?.reset({
        index:0,
        routes:[
          {name:ROUTES.loginScreen}
        ]
      })
    }else{
    navigationRef.current?.goBack();
    }
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView 
    keyboardShouldPersistTaps="always"
    >
    <View style={{flexDirection:"column"}}>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>Complete KYC</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:50}}>Verify Your Identity for Full Account Access</Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    <TouchableOpacity 
    onPress={()=>{
        // update({
        //     createAccountFormList:{
        //         ...Reducer?.createAccountFormList,
        //         BusinessDetails:{status:"selected"}
        //     }
        // })
        // navigationRef.current?.navigate(ROUTES.businessDetails,{index:0,formData});
    }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:20}}
    >
        <KeyContactIdIcon />
        <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black}}>Additional Credentials </Text>
        {Reducer?.createAccountFormList?.BusinessDetails?.status === "selected"?<Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",alignSelf:"flex-end",color:COLOURS.purple}}>You're Here!</Text>:null}
          </View> 
         <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Additional Information Required</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity 
    disabled={Reducer?.createAccountFormList?.BusinessDetails.status !== "valid"}
    onPress={()=>{
        // update({
        //     createAccountFormList:{
        //         ...Reducer?.createAccountFormList,
        //         KeyContactDetails:{status:"selected"}
        //     }
        // })
        // navigationRef.current?.navigate(ROUTES.businessDetails,{index:0,formData});
    }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:20,opacity:Reducer?.createAccountFormList?.BusinessDetails.status !== "valid"?0.2:1}}
    >
    <KeyContactAddressIcon />
    <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
    <Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black}}>Shareholder Information</Text>
    {Reducer?.createAccountFormList?.KeyContactDetails?.status === "selected"?<Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",alignSelf:"flex-end",color:COLOURS.purple}}>You're Here!</Text>:null}
    </View> 
    <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Corporate Governance Overview</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity 
    disabled={Reducer?.createAccountFormList?.KeyContactDetails.status !== "valid"}
    onPress={()=>{
        // update({
        //     createAccountFormList:{
        //         ...Reducer?.createAccountFormList,
        //         UploadDocuments:{status:"selected"}
        //     }
        // })
        // navigationRef.current?.navigate(ROUTES.businessDetails,{index:0,formData});
      }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:40,opacity:Reducer?.createAccountFormList?.KeyContactDetails.status !== "valid"?0.2:1}}
    >
        <CreateTxnPINIcon />
        <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black}}>Proof of Address</Text>
        {Reducer?.createAccountFormList?.UploadDocuments?.status === "selected" ?<Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",alignSelf:"flex-end",color:COLOURS.purple}}>You're Here!</Text>:null}
          </View> 
         <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Verify Your Residence for Account Security</Text>
        </View>
    </TouchableOpacity>
       <BaseButton 
       disabled={!valid}
       loading={loading}
       onPress={()=>{
        handleSubmit();
        }}
       title="Continue"
       />
    </View>
     </View>
     </ScrollView>
     </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(CompleteKycScreen);

export const KeyContactIdIcon=()=> {
  return (
    <Svg
    width={16}
    height={20}
    viewBox="0 0 16 20"
    fill="none"
  >
    <Path
      d="M11.75 11a.75.75 0 00-.75-.75H5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75zM11.75 15a.75.75 0 00-.75-.75H5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75z"
      fill="#8B1D41"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 .25A2.75 2.75 0 00.25 3v14A2.75 2.75 0 003 19.75h10A2.75 2.75 0 0015.75 17V5.968c0-.381-.124-.751-.354-1.055L12.398.945A1.75 1.75 0 0011.003.25H3zM1.75 3c0-.69.56-1.25 1.25-1.25h7.25v4.397c0 .414.336.75.75.75h3.25V17c0 .69-.56 1.25-1.25 1.25H3c-.69 0-1.25-.56-1.25-1.25V3z"
      fill="#8B1D41"
    />
  </Svg>
  )
}
export const KeyContactAddressIcon = ()=>{
return <Svg
width={24}
height={24}
viewBox="0 0 24 24"
fill="none"
>
<Path
  fillRule="evenodd"
  clipRule="evenodd"
  d="M7.75 7.5a4.25 4.25 0 118.5 0 4.25 4.25 0 01-8.5 0zM12 4.75a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zM8 14.75A2.25 2.25 0 005.75 17v1.188c0 .018.013.034.031.037 4.119.672 8.32.672 12.438 0a.037.037 0 00.031-.037V17A2.25 2.25 0 0016 14.75h-.34a.253.253 0 00-.079.012l-.865.283a8.751 8.751 0 01-5.432 0l-.866-.283a.252.252 0 00-.077-.012H8zM4.25 17A3.75 3.75 0 018 13.25h.34c.185 0 .369.03.544.086l.866.283a7.251 7.251 0 004.5 0l.866-.283c.175-.057.359-.086.543-.086H16A3.75 3.75 0 0119.75 17v1.188c0 .754-.546 1.396-1.29 1.517a40.095 40.095 0 01-12.92 0 1.537 1.537 0 01-1.29-1.517V17z"
  fill="#8B1D41"
/>
</Svg>
}

export const CreateTxnPINIcon = ()=>{
    return <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 13a3 3 0 100-6 3 3 0 000 6z"
        stroke="#B57373"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 22c4-4 8-7.582 8-12a8 8 0 10-16 0c0 4.418 4 8 8 12z"
        stroke="#B57373"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      </Svg>
  }


