import * as React from "react"
import { Image, Text, StyleSheet, View, TouchableOpacity, ScrollView, DeviceEventEmitter } from "react-native";
import { ItemProps, ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, passwordRules, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useEffect, useRef, useState } from "react";
import AppContainer from "../../components/appContainer";
import BaseButton from "../../components/baseButton";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import { connect } from "react-redux";

const AccountLimitScreen = ({Reducer,route}: ScreenComponentType) => {
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
 <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Account Limit</Text>
<Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:10,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:50}}></Text>

</View>
</AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(AccountLimitScreen);
