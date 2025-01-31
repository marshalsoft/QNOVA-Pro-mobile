import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, Share } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import AppStyles from "../../../../../includes/styles";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { navigationRef } from "../../../../../App";
import { BtnNavProp } from "../menuComponents";
import BaseSelect from "../../../../../components/baseSelect";
import BaseButton from "../../../../../components/baseButton";

interface MockProp {
    label:string;
    value:string;
}
const SuccessScreen = ({ goBack,message,shareBtnPress,shareBtnText,raiseBtnPress,raiseIssueBtnText,hideShareBtn}: ScreenComponentType) => {
 return <AppContainer
 disableScrol
 >
<View style={{flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{paddingHorizontal:20,alignItems:"center",justifyContent:"center",flex:1}}>
<Image source={require("../../../../../images/suc.png")}
style={{width:236,height:280}}
resizeMode="contain"
/>
<Text style={{color:"white",marginVertical:20,fontFamily:FONTFAMILY.INTER.bold,fontSize:24,textAlign:"center"}}>{message?message:"Transaction Successful!"}</Text>
<BaseButton 
title="Go Back Home"
onPress={()=>{
    if(goBack)
    {
        goBack();
    }
}}
/>
{!hideShareBtn?<View style={{flexDirection:"row",marginTop:16,gap:5}} >
<View style={{flex:1}} >
<BaseButton 
type="white"
title={shareBtnText?shareBtnText:"Share Receipt"}
onPress={()=>{
    if(shareBtnPress)
    {
        return shareBtnPress();
    }
    Share.share({message:message!});
}}
/>
</View>
<View style={{flex:1}} >
<BaseButton 
type="white"
title={raiseIssueBtnText?raiseIssueBtnText:"Raise an Issue"}
onPress={()=>{
    if(raiseBtnPress)
        {
            return raiseBtnPress();
        }
}}
/>
</View>

</View>:null}
</View>
</View>
    </AppContainer>
}
export default SuccessScreen;

const Styles = StyleSheet.create({
    smallcard:{
        width:100,
        height:84,
        borderRadius:8,
        backgroundColor:COLOURS.white,
        padding:8
    },
    label:{
        fontSize:10,
        fontFamily:FONTFAMILY.INTER.normal,
        color:"rgba(123, 127, 153, 1)"
    },
    input:{
        fontSize:14,
        fontFamily:FONTFAMILY.INTER.normal,
        color:"rgba(0, 0, 0, 1)"
    },
    divider:{
        height:1,
        backgroundColor:"rgba(123, 127, 153, 0.1)",
        width:"100%"
    }
})
const MockInput = (prop:MockProp)=>{
    return <View style={{flexDirection:"column",marginBottom:20}}>
        <Text style={[Styles.label]} >{prop.label}</Text>
        <Text style={[Styles.input]} >{prop.value}</Text>
    </View>
}
