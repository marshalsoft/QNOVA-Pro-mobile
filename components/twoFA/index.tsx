import { Text, TouchableOpacity, View } from "react-native"
import { COLOURS, DEVICE } from "../../includes/constants";
import Animated from "react-native-reanimated";
import BaseInputOTP from "../baseInputOTP";
import { TitleText } from "../../screens/settings";
import BaseButton from "../baseButton";
import CloseIcon from "../svgs/closeIcon";
import { useEffect, useState } from "react";
import useHttp from "../../includes/http.hooks";
interface TwoFAComponentProps {
    onClose:()=>void;
    handleLogin:(otp:string)=>void
}
const TwoFAComponent = (props:TwoFAComponentProps)=>{
    const [otp,setOtp] = useState<string>("");
    
    useEffect(()=>{
    },[])
    return <View style={[{position:"absolute",top:0,bottom:0,left:0,right:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}]}>
    <Animated.View style={[{position:"absolute",bottom:0,left:0,right:0,width:"100%",height:(DEVICE.height / 2)-40,backgroundColor:COLOURS.white,padding:20,borderTopLeftRadius:40,borderTopRightRadius:40,overflow:"hidden"}]}>
       <View 
       style={{flexDirection:"column",padding:16}}
       >
        <TitleText >2 Factor Verification</TitleText>
        <Text style={{paddingVertical:10,color:COLOURS.black,fontSize:14}}>Enter the 2fta code sent to your email address.</Text>
        <BaseInputOTP
        onValue={(pin)=>setOtp(pin)}
        value={otp}
        />
        <BaseButton
        disabled={otp.length !== 6}
        style={{marginVertical:10}}
        title="Continue login"
        onPress={()=>props.handleLogin(otp)}
        ></BaseButton>
        </View> 
        <TouchableOpacity 
        onPress={props.onClose}
        style={{position:"absolute",top:20,right:20,borderRadius:40,borderWidth:1,padding:5,borderColor:COLOURS.purple}}
        >
        <CloseIcon 
        size={12}
        />
        </TouchableOpacity>
    </Animated.View>
    </View>
}

export default TwoFAComponent;