import React, { } from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, DeviceEventEmitter, BackHandler } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, RELOAD, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import * as y from 'yup';
import styled from "styled-components/native";
import { connect, useDispatch } from "react-redux";
import AppContainer from "../../../components/appContainer";
import { ScreenComponentType } from "../../../includes/types";
import { navigationRef } from "../../../App";
import BaseButton from "../../../components/baseButton";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import PINScreen from "../components/pin";
import useHttp from "../../../includes/http.hooks";
import { BaseModalLoader } from "../../../components/baseLoader";
import CheckedIcon, { CheckedIconAlt } from "../../../components/svgs/checkedIcon";
import { NavigatePop } from "../../../includes/useNavigation";

const CreateDistressAccountScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
   const { ShowMessage, loading,GetOpamProtectAccountNumber } = useHttp();
   const GetFormSteps = ()=>{

   }
   useEffect(()=>{
    GetFormSteps();
    // dispatch({type:"update",payload:{
    //     creationOfDistressPin:true,
    //     creationOfNextOfKin:false,
    //     creationOfEmergencyPreference:false
    //   }})
   },[])

   const GetAccountNumber = ()=>{
    // GetOpamProtectAccountNumber().then((response)=>{
    //     if(response.status)
    //     {
    DeviceEventEmitter.emit(RELOAD.wallet,{
        accountNumber:"09000000000"
    })
    //     }
    // })
   }
    return <AppContainer
        showNavBar
        white
        goBack={() => {
            navigationRef.current?.goBack()
        }}
    >
        <View style={{ backgroundColor: "#F2F2F2", flexDirection: "column", paddingVertical: 24, height: DEVICE.height, borderTopRightRadius: 20, borderTopLeftRadius: 20, gap: 8 }}>
            <View >
                <View style={{ paddingHorizontal: 24, flexDirection: "column" }} >
                    <TitleText  >{"Create your account"}</TitleText>
                    <SubTitleText>{"Accelerate Your Business Growth with Customized Banking Tools"}</SubTitleText>
                </View>
                <View style={{ width: DEVICE.width, minHeight: 500, paddingHorizontal: 24, gap: 40, marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={() => {
                            if(!Reducer?.creationOfDistressPin)
                            {
                            navigationRef.current?.navigate(ROUTES.opamProtectCreatePasswordScreen)
                            }
                        }}
                        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                         <View style={{width:20,justifyContent:"center",alignItems:"center"}}>
                        <CreatePINIcon />
                        </View> 
                        <View style={{ flex: 1, flexDirection: "column" }}>
                        <View style={{ flexDirection: "row" }}>
                        <View style={{ flex:1}}>
                            <Text style={{ color: COLOURS.black, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >Create your Distress Password</Text>
                        </View>
                        <View >
                        {!Reducer?.creationOfDistressPin?<Text style={{ color: COLOURS.purple, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >You're Here!</Text>:<CheckedIcon size={20} />}
                        </View>
                        </View>
                            <SubTitleText style={{ fontSize: 12, textAlign: "left" }} >Secure your account with a unique Password</SubTitleText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    disabled={!Reducer?.creationOfDistressPin}
                        onPress={() => {
                            if(!Reducer?.creationOfNextOfKin)
                            {
                            navigationRef.current?.navigate(ROUTES.distressContactPreference);
                            }else{
                                
                            }
                        }}
                        style={{ flexDirection: "row", alignItems: "center", gap: 10,opacity:Reducer?.creationOfDistressPin?1:0.4}}>
                        <View style={{width:20,justifyContent:"center",alignItems:"center"}}>
                        <NextOfKinIcon />
                        </View> 
                        <View style={{ flex: 1, flexDirection: "column" }}>
                        <View style={{ flexDirection: "row" }}>
                        <View style={{ flex:1}}>
                            <Text style={{ color: COLOURS.black, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >Emergency contact</Text>
                            </View>
                        {Reducer?.creationOfDistressPin && !Reducer?.creationOfNextOfKin?<TouchableOpacity >
                        <Text style={{ color: COLOURS.purple, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >You're Here!</Text>
                        </TouchableOpacity>:Reducer?.creationOfDistressPin && Reducer?.creationOfNextOfKin?<CheckedIcon size={20} />:null}
                        </View>
                            <SubTitleText style={{ fontSize: 12, textAlign: "left" }} >Ensure emergency contact information is correct</SubTitleText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                   disabled={!Reducer?.creationOfEmergencyPreference}
                        onPress={() => navigationRef.current?.navigate(ROUTES.distressSafeWord)}
                        style={{ flexDirection: "row", alignItems: "center", gap: 10,opacity:Reducer?.creationOfEmergencyPreference?1:0.4 }}>
                       <View style={{width:20,justifyContent:"center",alignItems:"center"}}>
                        <SafeWordIcon />
                        </View>
                        <View style={{ flex: 1, flexDirection: "column" }}>
                        <View style={{ flexDirection: "row" }}>
                        <View style={{ flex:1}}>
                            <Text style={{ color: COLOURS.black, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >Create Safe Word</Text>
                           </View>
                         {Reducer?.fundingOfAccount && !Reducer.creationOfSafeWord ?<TouchableOpacity >
                        <Text style={{ color: COLOURS.purple, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >You're Here!</Text>
                        </TouchableOpacity>:Reducer?.fundingOfAccount && Reducer.creationOfSafeWord?<CheckedIcon size={20} />:null}
                        </View>   
                            <SubTitleText style={{ fontSize: 12, textAlign: "left" }} >Choose a safe word to use in time of distress</SubTitleText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    disabled={!Reducer?.creationOfEmergencyPreference}
                        onPress={() =>{
                            GetAccountNumber();
                        }}
                        style={{ flexDirection: "row", alignItems: "center", gap: 10,opacity:Reducer?.creationOfEmergencyPreference?1:0.4 }}>
                        <View style={{width:20,justifyContent:"center",alignItems:"center"}}>
                        <EmergencyIcon />
                        </View> 
                        <View style={{ flex: 1, flexDirection: "column" }}>
                        <View style={{ flexDirection: "row" }}>
                        <View style={{ flex:1}}>
                            <Text style={{ color: COLOURS.black, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >Fund Account</Text>
                           </View>
                        {Reducer?.creationOfEmergencyPreference && !Reducer.fundingOfAccount ?<TouchableOpacity >
                        <Text style={{ color: COLOURS.purple, fontSize: 14, fontWeight: "800", fontFamily: FONTFAMILY.INTER.semiBold }} >You're Here!</Text>
                        </TouchableOpacity>:Reducer?.creationOfEmergencyPreference && Reducer.fundingOfAccount?<CheckedIcon size={20} />:null}
                        </View>   
                            <SubTitleText style={{ fontSize: 12, textAlign: "left" }} >Fund your account to complete the onboarding process</SubTitleText>
                        </View>
                    </TouchableOpacity>
                    
                    <BaseButton
                        onPress={() => {
                        NavigatePop(2)
                        }}
                        title="Cancel"
                    />
                </View>
            </View>
        </View>
        {loading && <BaseModalLoader
            modal
        />}
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
};
export default connect(MapStateToProps)(CreateDistressAccountScreen);

const TitleText = styled.Text`
color: ${COLOURS.black};
text-align: center;
font-family: ${FONTFAMILY.INTER.bold};
font-size: 20px;
font-weight: 600;
`;
const SubTitleText = styled.Text`
color: #7B7F99;
text-align: center;
font-family: ${FONTFAMILY.INTER.normal};
font-size: 14px;
font-weight: 500;
`;

const CreatePINIcon = () => {
    return (<Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 3.63V2.46A1.75 1.75 0 016.74.73L7.96.547a13.75 13.75 0 014.08 0l1.22.183a1.75 1.75 0 011.49 1.73v1.17l1.714.138a2.86 2.86 0 012.594 2.394 27.129 27.129 0 010 8.674 2.86 2.86 0 01-2.594 2.394l-1.872.15a57.078 57.078 0 01-9.184 0l-1.872-.15a2.86 2.86 0 01-2.593-2.394 27.13 27.13 0 010-8.674 2.86 2.86 0 012.593-2.394L5.25 3.63zm2.933-1.6a12.25 12.25 0 013.634 0l1.22.183a.25.25 0 01.213.247v1.065a57.073 57.073 0 00-6.5 0V2.46a.25.25 0 01.213-.247l1.22-.183zM5.529 5.112c2.976-.24 5.966-.24 8.942 0l1.872.152a1.36 1.36 0 011.234 1.138c.062.385.116.77.16 1.158a17.517 17.517 0 01-15.474 0c.045-.387.098-.773.16-1.158a1.36 1.36 0 011.234-1.138l1.872-.152zm-3.4 4.044a19.018 19.018 0 0015.742 0 25.63 25.63 0 01-.294 5.44 1.36 1.36 0 01-1.234 1.139l-1.871.15c-2.977.24-5.967.24-8.943 0l-1.872-.15a1.36 1.36 0 01-1.234-1.139 25.63 25.63 0 01-.294-5.44z"
        fill="#8B1D41"
      />
    </Svg>
    )
}

const NextOfKinIcon = () => {
    return (<Svg
        width={16}
        height={18}
        viewBox="0 0 16 18"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 4.5a4.25 4.25 0 118.5 0 4.25 4.25 0 01-8.5 0zM8 1.75a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zM4 11.75A2.25 2.25 0 001.75 14v1.188c0 .018.013.034.031.037 4.119.672 8.32.672 12.438 0a.037.037 0 00.031-.037V14A2.25 2.25 0 0012 11.75h-.34a.253.253 0 00-.079.012l-.865.283a8.751 8.751 0 01-5.432 0l-.866-.283a.252.252 0 00-.077-.012H4zM.25 14A3.75 3.75 0 014 10.25h.34c.185 0 .369.03.544.086l.866.283a7.251 7.251 0 004.5 0l.866-.283c.175-.057.359-.086.543-.086H12A3.75 3.75 0 0115.75 14v1.188c0 .753-.546 1.396-1.29 1.517a40.095 40.095 0 01-12.92 0 1.537 1.537 0 01-1.29-1.517V14z"
          fill="#8B1D41"
        />
      </Svg>)
}

const EmergencyIcon = () => {
    return <Svg
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
}
const SafeWordIcon = () => {
    return <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
    <Path d="M15.9999 17L16.2099 17.21C16.5789 17.579 16.7629 17.763 16.9859 17.75C17.2089 17.738 17.3719 17.535 17.6979 17.127L18.9999 15.5M16.1709 7.91V9.5M16.1709 7.91C16.1709 7.156 16.805 6.545 17.5859 6.545C18.3659 6.545 18.9999 7.156 18.9999 7.909V9.5M16.1709 7.91V5.181C16.1709 4.428 15.5379 3.817 14.7569 3.817C13.9759 3.817 13.342 4.427 13.342 5.181M13.342 5.181V9.5M13.342 5.181V3.364C13.342 2.61 12.71 2 11.928 2C11.146 2 10.514 2.61 10.514 3.364V6.09M10.514 6.09C10.514 5.337 9.87995 4.726 9.09895 4.726C8.31895 4.726 7.68495 5.336 7.68495 6.09V12.637C7.68495 13.053 7.15195 13.25 6.86195 12.942L4.57195 10.503C4.37727 10.2774 4.11633 10.119 3.82633 10.0504C3.53633 9.98179 3.23208 10.0065 2.95695 10.121C1.94895 10.538 1.71195 12.009 2.36695 12.857C3.48895 14.309 4.63695 16.29 5.56495 18.037C6.82495 20.41 9.30995 22 12.0719 22M10.514 6.09V9.5M13 15.454V15.84C13 17.042 12.9999 17.643 13.1479 18.193C13.3329 18.8752 13.6809 19.5022 14.1619 20.02C14.5519 20.442 15.068 20.77 16.099 21.427C16.56 21.721 16.791 21.868 17.037 21.937C17.34 22.021 17.661 22.021 17.964 21.937C18.209 21.868 18.4399 21.721 18.9009 21.427C19.9319 20.77 20.4479 20.442 20.8379 20.02C21.319 19.5022 21.667 18.8752 21.8519 18.193C21.9999 17.643 21.9999 17.043 21.9999 15.84V15.454C21.9999 14.706 21.9999 14.332 21.8579 14.016C21.7688 13.8209 21.6436 13.6445 21.4889 13.496C21.2359 13.256 20.8769 13.124 20.1589 12.861L18.6849 12.321C18.0989 12.107 17.8059 12 17.4999 12C17.1939 12 16.901 12.107 16.315 12.322L14.8409 12.862C14.1229 13.124 13.7639 13.255 13.5109 13.496C13.3559 13.6444 13.2303 13.8209 13.1409 14.016C12.9999 14.332 13 14.706 13 15.454Z" stroke="#841743" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
    
}
