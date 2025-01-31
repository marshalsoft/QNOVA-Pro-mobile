import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import BaseButton from '../../components/baseButton';
import AppStyles from '../../includes/styles';
import { navigationRef } from '../../App';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from '../../includes/constants';
import Logo from '../../components/svgs/logo';
import BackgroundGradient from '../../components/svgs/backgroundGradient';
import SplashScreen  from "react-native-splash-screen";
function WelcomeScreen(){
useEffect(()=>{
  
},[])
  return (
    <SafeAreaView style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",flex:1}}>
     <View 
     style={{flexDirection:"column",justifyContent:"center",alignItems:"center",...DEVICE,backgroundColor:COLOURS.purple}}
     >
      <Image 
      onLoad={()=>{
        SplashScreen.hide();
       }}
      resizeMode='cover'
      source={require("../../images/backImg.png")}
      style={{top:0,left:0,position:"absolute",width:DEVICE.width,height:DEVICE.height}}
      />
      <BackgroundGradient />
      <View style={{position:"absolute",top:0,left:0,zIndex:9999,width:"100%",height:"100%",flexDirection:"column"}} >
      <View style={{justifyContent:"center",alignItems:"center",flex:1,paddingHorizontal:30}}>
      <Logo />
      <Text style={[AppStyles.h1,{color:COLOURS.white,fontFamily:FONTFAMILY.MONTSERRAT.extra}]} >
      QNova-PRO
      </Text>
      <Text 
      style={[AppStyles.subTitle,{textAlign:"left",marginTop:5,color:COLOURS.white}]} >
      My money, My control
      </Text>
      </View>
      <View style={{paddingHorizontal:30,flexDirection:"column",width:"100%"}} >
      <BaseButton 
      filled
      type='white'
      onPress={()=>{
        navigationRef.current?.navigate(ROUTES.loginScreen)
      }}
      title="LOG IN"
      />
      <View style={{height:20}} ></View>
      <BaseButton 
      filled
      type='outline'
      onPress={()=>{
        navigationRef.current?.navigate(ROUTES.signUpScreen)
      }}
      title="REGISTER"
      />
      </View>
<View 
onLayout={()=>{
  SplashScreen.hide();
 }}
style={{height:100}} ></View>
     </View>
     </View>
    </SafeAreaView>
  );
}


export default WelcomeScreen;
