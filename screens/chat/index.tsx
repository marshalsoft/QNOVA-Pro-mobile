/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ForgotPasswordProps, ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import ArrowLeft from '../../components/svgs/arrowLeft';
  const ChatScreen = ({route,Reducer}:ScreenComponentType) => {
  const {loading} = useHttp();
  // const [switch,setSwitch] = use
    return <View style={{backgroundColor:"#8B1D41",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"row",alignItems:"center",gap:10,paddingHorizontal:20}}>
      <TouchableOpacity 
      onPress={()=>navigationRef.current?.goBack()}
      >
        <ArrowLeft size={20} color='white'/>
      </TouchableOpacity>
      <Text style={{color:COLOURS.white,fontFamily:FONTFAMILY.INTER.bold,fontSize:16}}>AI Business Assistance</Text>
    </View>
    <View style={{flexDirection:"column",paddingHorizontal:20,paddingVertical:50}}>
    <Text style={{color:COLOURS.white,fontFamily:FONTFAMILY.INTER.bold,fontSize:24,alignSelf:"center"}}>Hello {Reducer?.firstName}</Text>
    </View>
    <View style={{backgroundColor:COLOURS.white,height:320,borderTopLeftRadius:10,borderTopRightRadius:200,borderBottomLeftRadius:200,borderBottomRightRadius:200,
    alignItems:"center",
    justifyContent:"center"
  }}>
    <Image 
    style={{width:120,height:120}}
    resizeMode='contain'
    source={require("../../images/chatbot.png")}
    />
    <Text style={{color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.medium,fontSize:14,textAlign:"center",paddingHorizontal:40}}>My name is Zoey!
    Your AI Business Assistance model</Text>
  </View>
  <Text style={{color:COLOURS.white,fontFamily:FONTFAMILY.INTER.normal,fontSize:18,textAlign:"center",paddingHorizontal:20,marginVertical:20}}>I’m here to answer all your questions.
  How can i help you today?</Text>
   <TouchableOpacity 
   style={{backgroundColor:COLOURS.white,paddingVertical:10,alignItems:"center",justifyContent:"center",marginHorizontal:30,borderRadius:8}}
   >
   <Text style={{color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.bold,fontSize:21}}>GET STARTED</Text>
   </TouchableOpacity>
    </View>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(ChatScreen);
  