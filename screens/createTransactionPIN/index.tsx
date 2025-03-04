/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ForgotPasswordProps, ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import BaseInputOTP from '../../components/baseInputOTP';
import { NextArrow, NormalText, TitleText } from '../settings';
import { CheckedIconAlt } from '../../components/svgs/checkedIcon';
import { Card2 } from '../dashboard/home/components/profile';
import ArrowRight from '../../components/svgs/arrowRight';
import PINScreen from '../dashboard/home/components/walletTransfer/pin';
import { useState } from 'react';
import { BaseModalLoader } from '../../components/baseLoader';

  const createTransactionPINScreen = ({route}:ScreenComponentType) => {
   const [switchSection,setSwitchSection] = useState<boolean>(false);
   const [pin,setPin] = useState<string>("");
   const [confirmPin,setConfirmPin] = useState<string>("");
   const {CreateTransationPIN,ShowMessage,loading} = useHttp()
    return <AppContainer
    showNavBar
    white
    goBack={()=>{
      if(switchSection)
      {
        setConfirmPin("");
        return setSwitchSection(false);
      }
      navigationRef.current?.goBack();
    }}
    title={""}
    disableScrol
    >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,minHeight:DEVICE.height - 136,borderTopRightRadius:20,borderTopLeftRadius:20}}>
{!switchSection?<PINScreen
title='Create Transaction PIN'
subTitle="This will be use to complete all your transactions."
goBack={()=>{}}
onValue={(pin)=>{
  setPin(pin);
  setSwitchSection(true);
}}
status='pin'
value={pin}
/>:<PINScreen
title='Confirm Transaction PIN'
subTitle="This will be use to complete all your transactions."
goBack={()=>{}}
onValue={(cpin)=>{
  setConfirmPin(cpin);
  if(pin !== cpin)
  {
    return ShowMessage("top").fail("Confirm PIN not match!");
  }
  CreateTransationPIN(pin).then((res)=>{
    if(res.data)
    {
      navigationRef.current?.goBack();
    }
  })
}}
status='pin'
value={" "}
/>}
</View>
{loading && <BaseModalLoader modal/>}
</AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(createTransactionPINScreen);
 