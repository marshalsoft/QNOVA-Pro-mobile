import { Image, Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useEffect, useRef, useState } from "react";
import AppContainer from "../../components/appContainer";
import AppStyles from "../../includes/styles";
import BaseInput from "../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import CaretDownIcon from "../../components/svgs/caretDown";
import BaseButton from "../../components/baseButton";
import { ReturnMobile } from "../../includes/functions";
import BaseInputMobile from "../../components/baseInputMobile";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import OTPTextView from "react-native-otp-textinput";
import BaseLoader, { BaseModalLoader } from "../../components/baseLoader";
import { connect } from "react-redux";
const FormSchema = y.object({
    otp:y.string().required('A valid OTP is required.').min(5,"A valid 5 digit OTP is required").max(5,"A valid 5 digit OTP is required")
});

const OtpScreen = ({route}: ScreenComponentType) => {
   const {VerifyOTP,SendOTP,VerifyEmail,VerifyMobileNumber,loading} = useHttp();
    const timer = useRef<NodeJS.Timeout>();
    const limit = 45;
    const [otp,setOtp] = useState<string>("");
    const [selected,setSelected] = useState<number>(0)
    const [counter,setCounter] = useState<number>(0)
    const [flag,setFlag] = useState<string>("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAMFBMVEUBh1L///8FilUAiEwqf1gCiE/l5eXv/fgIjVgAhVAAjFAug1z9/P0Fi1LZ6eLv//ciup9sAAABuklEQVR4nO3SyXECARAEweUS7AH4761ALlRoXlkedEYvj/NIz21//Qz12rfnzKrHcl7W5f9bb5f9fhrqvV9uA5s+cOchvuV2ud6PGb3jfh3kG9H745vRO52m+JYVXwlfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpf6su3jPh9+Y4ZvePLN+G3LlN86+2yj73v/eEbGfXBe5xHem7762eo1749Z1Y9fgF2nG32nRewWgAAAABJRU5ErkJggg==");
    const [code,setCode] = useState<string>("+234");
   const handleCount = ()=>{
    setCounter(limit);
    timer.current = setInterval(()=>{
                setCounter((counter)=>{
                    if(counter === 0)
                    {
                        clearInterval(timer.current);
                        return 0;
                    }
                 return counter - 1;
                })
        },1000) 
   }
   useEffect(()=>{
    handleCount();
    return ()=>{
        clearInterval(timer.current); 
    }
   },[])
    return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.goBack()
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView 
    keyboardShouldPersistTaps="always" 
    >
    <View style={{flexDirection:"column"}}>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Verify it's you</Text>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Please enter the 5-digit code sent to your phone number or email address</Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
     <OTPTextView
     inputCount={6}
     handleTextChange={(otp)=>{
        if(otp.length === 6)
        {
            VerifyOTP({
                ...route?.params,
                otp:otp}).then((res)=>{
                    if(res.status)
                    {
                    navigationRef.current?.navigate(ROUTES.registrationOptionScreen,route?.params)
                    }
            });
        }
        }}
        textInputStyle={{
          height:50,
          width:40
        }}
        tintColor={COLOURS.gray64}
        containerStyle={{alignSelf:"center"}}
     />
    <Text style={{marginVertical:30,color:COLOURS.gray64}}>or</Text>
    <View style={{flexDirection:"column",gap:30,paddingHorizontal:5,justifyContent:"center",alignItems:"center",width:"100%"}} >
       <BaseButton 
       disabled={counter !== 0}
       type="purple-white"
       onPress={()=>{
        if(route?.params?.email)
        {
            VerifyEmail(String(route?.params.email).trim()).then((res)=>{
                handleCount();
            })
        }else{
            VerifyMobileNumber(route?.params?.phone).then((res)=>{
                handleCount();
            })
        }
        
        }}
       title={counter === 0?"Resend Code":`Resend Code in ${counter}`}
       />
     </View>
    </View>
     </View>
     </ScrollView>
     </View>
     {loading && <BaseModalLoader 
     modal
     />}
    </AppContainer>
}

const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(OtpScreen);
  
