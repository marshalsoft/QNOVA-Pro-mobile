import React, { RefObject, useEffect, useRef, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { ScreenComponentType, SignUpFormProps, UserLoginProps } from '../../includes/types';
import { navigationRef } from '../../App';
import SuccessScreen from '../dashboard/home/components/walletTransfer/success';

  const SuccessScreenComponent = ({route,title,goBack}:ScreenComponentType) => {
  
    return <View 
    style={{position:"absolute",width:"100%",height:"100%",flexDirection:"column",top:0,left:0,zIndex:999}}
    >
 <SuccessScreen 
message={title}
hideShareBtn
goBack={()=>{
  if(goBack)
  {
    return goBack();
  }
 navigationRef.current?.goBack();
}}
/></View>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(SuccessScreenComponent);
  