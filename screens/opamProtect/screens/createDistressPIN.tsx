import React, { } from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, DeviceEventEmitter, BackHandler } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import * as y from 'yup';
import styled from "styled-components/native";
import { connect, useDispatch } from "react-redux";
import AppContainer from "../../../components/appContainer";
import { ScreenComponentType } from "../../../includes/types";
import { navigationRef } from "../../../App";
import BaseInput from "../../../components/baseInput";
import { Formik, FormikValues } from "formik";
import BaseInputMobile from "../../../components/baseInputMobile";
import BaseButton from "../../../components/baseButton";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Card from "../../../components/card";
import useHttp from "../../../includes/http.hooks";
import { BaseModalLoader } from "../../../components/baseLoader";
import PINScreen from "../components/pin";
import PasswordScreen from "../components/password";
import { NavigatePop, NavigateReplace } from "../../../includes/useNavigation";

export interface listOfChannelsProps {
  title: string;
  selected: boolean;
}
const CreateDistressPINScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
  const { ShowMessage, loading, OpamProtectCreatePassword,OpamProtectUpdatePassword} = useHttp();
  const [showSuccess, setShowSucces] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [showPin, setShowPIN] = useState<boolean>(false);
  const [pin, setPIN] = useState<string>("");
  const handleCreatePIN = (pin: string) => {
    if (route?.params?.goto) {
      OpamProtectUpdatePassword(pin).then((res) => {
        if (res.data) {
          handleGotoDashboard();
        }
      })
    }else{
    OpamProtectCreatePassword({
      distress_pin: pin
    }).then((res) => {
      if (res.data) {
        handleGotoDashboard();
      }
    })
  }
  }

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const position = useSharedValue(0);
  const animateWidth = useSharedValue(0);

  const HandleAnimation = (index: number) => {
    setSelectedTab(index)
    position.value = withTiming(-(DEVICE.width * index), { duration: 100 })
    animateWidth.value = withTiming(((index + 1) * (100 / 3)), { duration: 100 })
  }
  useEffect(() => {
    HandleAnimation(0)
  }, [])
  useEffect(() => {
    if (route?.params?.goto) {
      setShowPIN(true);
    }
  }, [route?.params])
  const handleGotoDashboard = () => {
    dispatch({
      type: "update", payload: {
        creationOfDistressPin: true
      }
    })
    NavigatePop(2);
  }
  return <AppContainer
    showNavBar
    white
    goBack={() => {
      if (pin !== "") {
        return setPIN("")
      }
      if (route?.params?.goto) {
        return navigationRef.current?.goBack()
      }
      if (showPin) {
        return setShowPIN(false);
      }
      if (showSuccess) {
        navigationRef.current?.goBack()
      }
      navigationRef.current?.goBack()
    }}
    disableScrol
  >
   <View style={{ backgroundColor: "#F2F2F2", flexDirection: "column", paddingVertical: 24, height: DEVICE.height, borderTopRightRadius: 20, borderTopLeftRadius: 20, gap: 8 }}>
   <View style={{ width: DEVICE.width, minHeight: 500,marginTop: 0 }}>
      <PasswordScreen
        goBack={() => setShowPIN(false)}
        onValue={(value) => {
          setPIN(value);
        }}
        status={"pin"}
        params={route?.params?.goto}
      />
      {pin !== ""?<View style={{...StyleSheet.absoluteFillObject,backgroundColor:COLOURS.white,flex:1}}>
        <PasswordScreen
        goBack={() => setPIN("")}
        onValue={(value) => {
          if (pin !== value) {
            return ShowMessage("top").fail("PIN not matched!")
          }
          handleCreatePIN(value);
        }}
        status={"confirm"}
      />
      </View>:null}
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
export default connect(MapStateToProps)(CreateDistressPINScreen);

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


const LockIcon = () => {
  return <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path d="M10.5 16a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill="#8B1D41" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.621 10.597l-.315-2.839a4.96 4.96 0 010-1.095l.022-.205a4.7 4.7 0 019.342 0l.023.205c.04.364.04.731 0 1.095l-.315 2.84.686.054c1.083.087 1.967.9 2.143 1.972a20.89 20.89 0 010 6.752 2.361 2.361 0 01-2.143 1.972l-1.496.12c-2.375.19-4.762.19-7.137 0l-1.497-.12a2.361 2.361 0 01-2.142-1.972 20.891 20.891 0 010-6.752 2.361 2.361 0 012.142-1.972l.687-.055zM11.625 3.8a3.2 3.2 0 013.555 2.825l.022.205c.028.254.028.51 0 .764l-.32 2.89a44.84 44.84 0 00-5.764 0l-.322-2.89a3.46 3.46 0 010-.764l.023-.205a3.2 3.2 0 012.806-2.825zm3.824 8.229a43.342 43.342 0 00-6.899 0l-1.496.12a.861.861 0 00-.782.719 19.39 19.39 0 000 6.267.861.861 0 00.782.719l1.496.12c2.296.183 4.603.183 6.899 0l1.496-.12a.861.861 0 00.781-.72 19.39 19.39 0 000-6.266.861.861 0 00-.781-.72l-1.496-.12z"
      fill="#8B1D41"
    />
  </Svg>
}
const ShieldIcon = () => {
  return <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.645 5.263a1.25 1.25 0 00-1.29 0l-.516.311a10.75 10.75 0 01-4.537 1.493l-.325.031a.25.25 0 00-.227.249V8.99a9.25 9.25 0 002.82 6.65l3.256 3.147a.25.25 0 00.348 0l3.255-3.147a9.25 9.25 0 002.821-6.65V7.347a.25.25 0 00-.227-.249l-.325-.03a10.75 10.75 0 01-4.537-1.494l-.516-.31zM10.58 3.978a2.75 2.75 0 012.838 0l.516.311a9.25 9.25 0 003.904 1.285l.325.03a1.75 1.75 0 011.586 1.743V8.99a10.75 10.75 0 01-3.278 7.729l-3.256 3.147a1.75 1.75 0 01-2.432 0L7.528 16.72A10.75 10.75 0 014.25 8.99V7.348a1.75 1.75 0 011.586-1.742l.325-.031a9.25 9.25 0 003.904-1.285l.516-.31z"
      fill="#8B1D41"
    />
  </Svg>
}
