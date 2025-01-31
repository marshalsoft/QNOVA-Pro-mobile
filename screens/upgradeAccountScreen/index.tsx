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

  const upgradeAccountScreen = ({route}:ScreenComponentType) => {
    return <AppContainer
    showNavBar
    white
    goBack={()=>{
      navigationRef.current?.goBack();
    }}
    title={""}
    disableScrol
    >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,minHeight:DEVICE.height - 136,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<ScrollView 
showsVerticalScrollIndicator={false}
>
  <View style={{flexDirection:"column"}}>
  <TitleText style={{color:COLOURS.black,fontSize:20,alignSelf:"center"}}>Upgrade your account</TitleText>
  <NormalText style={{color:"#7B7F99",marginTop:10,fontSize:14,alignSelf:"center"}}>Upgrade for Seamless Integration</NormalText>
  <View style={{flexDirection:"column",gap:20}}>
  <TitleText style={{marginTop:20}}>Tier 1</TitleText>
  <View style={{flexDirection:"row",gap:10}}>
 <CheckedIconAlt 
 size={25}
 />
  <TitleText style={{color:COLOURS.black,fontSize:14}}>Create an Account</TitleText>
  </View>
  <View style={{flexDirection:"row",gap:10}}>
 <CheckedIconAlt 
 size={25}
 />
  <TitleText style={{color:COLOURS.black,fontSize:14}}>Create Transaction PIN</TitleText>
  </View>
{/* <Card2 
onPress={()=>{
  navigationRef.current?.navigate(ROUTES.createTransactionPINScreen);
}}
style={{flexDirection:"row",alignItems:"center"}}
>
<View style={{flex:1}}>
<TitleText style={{color:COLOURS.black,fontSize:14}}>Create Transaction PIN</TitleText>
</View>
<NextArrow />
</Card2> */}
<TitleText >Tier 2</TitleText>
<Card2 
onPress={()=>{
  navigationRef.current?.navigate(ROUTES.completeKYCScreen);
}}
style={{flexDirection:"row",alignItems:"center"}}
>
<View style={{flex:1}}>
<TitleText style={{color:COLOURS.black,fontSize:14}}>Complete KYC</TitleText>
</View>
<NextArrow />
</Card2>
<TitleText >Tier 3</TitleText>
<Card2 
onPress={()=>{
  navigationRef.current?.navigate(ROUTES.indemityAgreementScreen);
}}
style={{flexDirection:"row",alignItems:"center"}}
>
<View style={{flex:1}}>
<TitleText style={{color:COLOURS.black,fontSize:14}}>Indemnity Agreement</TitleText>
</View>
<NextArrow />
</Card2>
<BaseButton
title='Go to Dashboard'
onPress={()=>{
  navigationRef.current?.navigate(ROUTES.dashboard);
}}
/>
<View 
style={{flexDirection:"row",alignItems:"center",justifyContent:'center',marginBottom:30}}
>
  <Text
  style={{fontSize:14,color:COLOURS.gray64,fontFamily:FONTFAMILY.INTER.normal}}
  >Learn more about QNOVA PRO </Text>
<TouchableOpacity 
onPress={()=>{

}}
>
<Text style={{fontSize:14,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.medium}}>Account Limits</Text>
</TouchableOpacity>
</View>
  </View>
  </View>
</ScrollView>
</View>
</AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(upgradeAccountScreen);
 