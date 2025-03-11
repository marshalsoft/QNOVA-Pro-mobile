/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { BusinessRegFormProps, ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, FONTFAMILY, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import AppStyles from '../../includes/styles';
import CheckedIcon from '../../components/svgs/checkedIcon';
import { useEffect, useState } from 'react';
import CloseIcon from '../../components/svgs/closeIcon';

  const SignUpScreen = ({route}:ScreenComponentType) => {
  const {Register,loading} = useHttp();
  const dispatch = useDispatch()
  const [iHaveBusiness,setIhaveBusiness] = useState<boolean>(false);
  useEffect(()=>{
    dispatch({
      type:"update",
      payload:{
        creationOfDistressPin:true,
        creationOfNextOfKin:false,
        creationOfEmergencyPreference:false,
        creationOfSafeWord: false,
        isOpamProtected:false
    }})
  },[]) 
  return <AppContainer 
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    backgroundColor={COLOURS.defaultWhite}
    disableScrol
    >
<View style={{flexDirection:"column",padding:30}}>
      <TopSection 
      title='Register'
      sub='Welcome to QNova-Pro'
      />
      <Image 
      source={require("../../images/bn.png")}
      style={{width:212.09,height:134,marginVertical:10}}
      resizeMode='contain'
      />
      <Text style={[AppStyles.topSectionTitleText,{fontFamily:FONTFAMILY.MONTSERRAT.bold,fontSize:16,width:"70%"}]}>Do you have a registered 
      business name? </Text>
      <Text style={[AppStyles.blackText,{fontSize:12,fontFamily:FONTFAMILY.MONTSERRAT.normal,marginVertical:10}]}>You need a registered business under CAC to create a QNova-Pro account. If you don’t have a registered business, we can create one for you.</Text>
      <View 
      style={{flexDirection:"row",gap:15,marginTop:120}}
      >
        <TouchableOpacity 
        onPress={()=>{
          setIhaveBusiness(true);
          navigationRef.current?.navigate(ROUTES.unRegisteredBusiness);
        }}
        style={{flex:1,flexDirection:"column",height:120,backgroundColor:!iHaveBusiness?COLOURS.white:COLOURS.purple,borderRadius:8,padding:10,alignItems:"center",justifyContent:"center",borderColor:COLOURS.purple,borderWidth:2}}
        >
          <CheckedIcon 
          color={iHaveBusiness?COLOURS.white:COLOURS.purple}
          size={18}
          />
        <Text style={[AppStyles.whiteText,{fontSize:14,fontFamily:FONTFAMILY.MONTSERRAT.semiBold,textAlign:"center",marginTop:8,color:iHaveBusiness?COLOURS.white:COLOURS.purple}]}>Yes I have a 
        registered business</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>{
          setIhaveBusiness(false);
          navigationRef.current?.navigate(ROUTES.nameVerification);
        }}
        style={{flex:1,flexDirection:"column",height:120,backgroundColor:iHaveBusiness?COLOURS.white:COLOURS.purple,borderRadius:8,padding:10,alignItems:"center",justifyContent:"center",borderColor:COLOURS.purple,borderWidth:2}}
        >
          <View 
          style={{backgroundColor:!iHaveBusiness?COLOURS.white:COLOURS.purple,padding:5,borderRadius:10}}
          >
          <CloseIcon 
          color={iHaveBusiness?COLOURS.white:COLOURS.purple}
          size={8}
          />
          </View>
        <Text style={[AppStyles.whiteText,{fontSize:14,fontFamily:FONTFAMILY.MONTSERRAT.semiBold,textAlign:"center",marginTop:8,color:!iHaveBusiness?COLOURS.white:COLOURS.purple}]}>No I don't have a 
        registered business</Text>
        </TouchableOpacity>
      </View>
      </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(SignUpScreen);
  