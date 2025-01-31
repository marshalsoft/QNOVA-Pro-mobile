import React, { RefObject, useEffect, useRef, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image, Linking, Share } from 'react-native';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { BusinessRegFormProps, ScreenComponentType, SignUpFormProps, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile } from '../../includes/constants';
import Svg, { Path } from "react-native-svg"
import AppStyles from '../../includes/styles';
import { CreatePINComponent } from '../signUpScreen/createPINScreen';
import useHttp from '../../includes/http.hooks';
import { BaseModalLoader } from '../../components/baseLoader';
import SplashScreen from 'react-native-splash-screen';

const WelcomeScreen = ({route}:ScreenComponentType) => {
     const [loading,setLoading] = useState<boolean>(false);
      const {UserLogin} = useHttp();
      return <View 
      onLayout={()=>{
        SplashScreen.hide();
      }}
      style={{flex:1,flexDirection:"column"}}>
        {/* <CreatePINComponent 
        count={6}
        goBack={()=>{}}
        onValue={(code)=>{
          setLoading(true);
            UserLogin({
                email:"d",
                password:"d"
            }).then((res)=>{
        navigationRef.current?.reset({
          index:0,
          routes:[
            {name:ROUTES.dashboard}
          ]
        })
            })
        }}
        status='pin'
        title={`Welcome back, Mosope!`}
        subTitle={`Our fast and secure transactions await you!`}
        /> */}
        
        {loading && <BaseModalLoader />} 
        </View>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(WelcomeScreen);
