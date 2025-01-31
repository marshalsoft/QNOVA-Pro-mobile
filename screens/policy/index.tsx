import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useState } from "react";
import AppContainer from "../../components/appContainer";
import { navigationRef } from "../../App";
const PolicyScreen = ({ }: ScreenComponentType) => {
  return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.goBack();
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    
     </View>
    </AppContainer>
}
export default PolicyScreen;
