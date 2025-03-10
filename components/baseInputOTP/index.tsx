/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React,{ useEffect, useState } from 'react';
import { View,Text, TouchableOpacity, Platform } from 'react-native';
import AppStyles from '../../includes/styles';
import Animated, { useSharedValue,withTiming, withDelay } from 'react-native-reanimated';
import { FormikErrors } from 'formik';
import BaseButton from '../baseButton';
import ArrowLeft from '../svgs/arrowLeft';
import OTPTextView from 'react-native-otp-textinput';
import { COLOURS } from '../../includes/constants';
interface BaseInputOTPProps {
loading?:boolean;
onValue:(text: string) => void;
value:string;
label?:string;
virtualKeys?:boolean;
showPIN?:boolean;
update?:boolean;
errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
}

const BaseInputOTP = (props:BaseInputOTPProps)=> {
    const [show,setShow] = useState<boolean>(false)
  const [otp,setOTP] = useState<string[]>(['','','','','','']);
  return (<View style={{flexDirection:'column',marginBottom:10,alignItems:'center'}}>
     <OTPTextView
     inputCount={6}
     textInputStyle={{borderColor:COLOURS.purple,borderWidth:0,borderRadius:8,width:40}}
     offTintColor={COLOURS.gray}
     tintColor={COLOURS.purple}
     handleTextChange={(d)=>props.onValue(d)}
     />
      </View>
    );
  };
  export default BaseInputOTP;
