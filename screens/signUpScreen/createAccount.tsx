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

const CreateAccountScreen = ({Reducer,route}: ScreenComponentType) => {
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
      publicIP().then(ip => { 
      getUniqueId().then((uId)=>{
        getManufacturer().then((manufacturer)=>{
      const data = {
        keyContactIdentity:route?.params,
        bvn: formData?.bvn,
        businessRegNumber:formData.cacNumber, // business regNumber (cac)
        password:formData.pin,
        deviceId:uId,
        deviceName:manufacturer,
        ipAddress:ip,
        playerId:getBundleId(),
        gender:formData.gender,
        dateOfBirth: String(formData.dob).replace(/[\/]/g,"-"),
        location:formData.branchAddress
        }
console.log(data);
      CreateAccount(data).then((res)=>{
      if(res.status)
      {
        setSuccess(true)
      }
      })
    })
  })
  })
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
    {success?<View style={{flexDirection:"column",paddingHorizontal:24}}>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium,marginBottom:40}}>Account created!</Text>
     <BaseButton 
       onPress={()=>{
        navigationRef.current?.reset({
          index:0,
          routes:[
            {name:ROUTES.loginScreen}
          ]
        })
        }}
       title="Continue"
       />
    </View>:<ScrollView 
    keyboardShouldPersistTaps="always"
    >
    <View style={{flexDirection:"column"}}>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>Create your account</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:50}}>Please insert your body copy here. </Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    <TouchableOpacity 
    onPress={()=>{
        update({
            createAccountFormList:{
                ...Reducer?.createAccountFormList,
                BusinessDetails:{status:"selected"}
            }
        })
        navigationRef.current?.navigate(ROUTES.businessDetails,{index:0,formData});
    }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:20}}
    >
        <BusinessIcon />
        <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black}}>Business Details</Text>
        {Reducer?.createAccountFormList?.BusinessDetails?.status === "selected"?<Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",alignSelf:"flex-end",color:COLOURS.purple}}>You're Here!</Text>:null}
          </View> 
         <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Tell us important information about your business.</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity 
    disabled={Reducer?.createAccountFormList?.BusinessDetails.status !== "valid"}
    onPress={()=>{
        update({
            createAccountFormList:{
                ...Reducer?.createAccountFormList,
                KeyContactDetails:{status:"selected"}
            }
        })
        navigationRef.current?.navigate(ROUTES.businessDetails,{index:0,formData});
    }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:20,opacity:Reducer?.createAccountFormList?.BusinessDetails.status !== "valid"?0.2:1}}
    >
    <KeyContactIcon />
    <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
    <Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black}}>Key Contact Details</Text>
    {Reducer?.createAccountFormList?.KeyContactDetails?.status === "selected"?<Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",alignSelf:"flex-end",color:COLOURS.purple}}>You're Here!</Text>:null}
    </View> 
    <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Give us important details about a key personnel</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity 
    disabled={Reducer?.createAccountFormList?.KeyContactDetails.status !== "valid"}
    onPress={()=>{
        update({
            createAccountFormList:{
                ...Reducer?.createAccountFormList,
                UploadDocuments:{status:"selected"}
            }
        })
        navigationRef.current?.navigate(ROUTES.businessDetails,{index:0,formData});
      }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:40,opacity:Reducer?.createAccountFormList?.KeyContactDetails.status !== "valid"?0.2:1}}
    >
        <UploadDocIcon />
        <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:FONTFAMILY.INTER.medium,fontSize:14,color:COLOURS.black}}>Upload Documents</Text>
        {Reducer?.createAccountFormList?.UploadDocuments?.status === "selected" ?<Text style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,fontWeight:"bold",alignSelf:"flex-end",color:COLOURS.purple}}>You're Here!</Text>:null}
          </View> 
         <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14}}>Upload documents to verify your business.</Text>
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
     </ScrollView>}
     </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(CreateAccountScreen);

const Style = StyleSheet.create({
    dot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:COLOURS.gray64
    }
})
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import HasBusinessScreen from "./registeredBusiness/hasBusinessScreen";
import CreatePINScreen from "./createPINScreen";
import { connect } from "react-redux";
import { useStoreHook } from "../../Redux/reducer";
import { FormProps } from "./businessDetails";

export const BusinessIcon=()=> {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 3.631v-1.17A1.75 1.75 0 016.74.731L7.96.548a13.75 13.75 0 014.08 0l1.22.183a1.75 1.75 0 011.49 1.73v1.17l1.714.138a2.86 2.86 0 012.594 2.394 27.128 27.128 0 010 8.674 2.86 2.86 0 01-2.594 2.394l-1.872.15a57.078 57.078 0 01-9.184 0l-1.872-.15a2.86 2.86 0 01-2.593-2.394 27.129 27.129 0 010-8.674A2.86 2.86 0 013.536 3.77l1.714-.138zm2.933-1.6a12.25 12.25 0 013.634 0l1.22.183a.25.25 0 01.213.247v1.065a57.078 57.078 0 00-6.5 0V2.46a.25.25 0 01.213-.247l1.22-.183zM5.529 5.113c2.976-.24 5.966-.24 8.942 0l1.872.152a1.36 1.36 0 011.234 1.138c.062.385.116.77.16 1.158a17.517 17.517 0 01-15.474 0c.045-.387.098-.773.16-1.158a1.36 1.36 0 011.234-1.138l1.872-.152zm-3.4 4.044a19.018 19.018 0 0015.742 0 25.628 25.628 0 01-.294 5.44 1.36 1.36 0 01-1.234 1.139l-1.871.15c-2.977.24-5.967.24-8.943 0l-1.872-.15a1.36 1.36 0 01-1.234-1.139c-.291-1.8-.39-3.624-.294-5.44z"
        fill="#8B1D41"
      />
    </Svg>
  )
}
export const KeyContactIcon = ()=>{
return  <Svg
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
export const UploadDocIcon = ()=>{
    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M15.75 13a.75.75 0 00-.75-.75H9a.75.75 0 000 1.5h6a.75.75 0 00.75-.75zM15.75 17a.75.75 0 00-.75-.75H9a.75.75 0 000 1.5h6a.75.75 0 00.75-.75z"
          fill="#8B1D41"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 2.25A2.75 2.75 0 004.25 5v14A2.75 2.75 0 007 21.75h10A2.75 2.75 0 0019.75 19V7.968c0-.381-.124-.751-.354-1.055l-2.998-3.968a1.75 1.75 0 00-1.396-.695H7zM5.75 5c0-.69.56-1.25 1.25-1.25h7.25v4.397c0 .414.336.75.75.75h3.25V19c0 .69-.56 1.25-1.25 1.25H7c-.69 0-1.25-.56-1.25-1.25V5z"
          fill="#8B1D41"
        />
      </Svg>
    )
  }


