
import React, { useEffect, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import Businesses from './components/busineses';
import Arrow from './components/arrow';

const OpamProtectGetStartedScreen = ({route}:ScreenComponentType) => {
   
    return <AppContainer
    showNavBar
    disableScrol
    goBack={()=>navigationRef.current?.goBack()}
    >
    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",gap:15,padding:30,flex:1}}>
    <View style={{flexDirection:"column",alignItems:"center",gap:15,flex:1}}>
    <Text style={{fontSize:20,color:COLOURS.white,fontFamily:FONTFAMILY.INTER.bold,fontWeight:"700"}}>Quick guide on OPAM Protect</Text>
   <Businesses />
   <View style={{alignSelf:"flex-end",marginTop:-40,marginRight:-10}}>
    <Arrow />
   </View>
    <Text style={{fontSize:12,color:COLOURS.white,textAlign:"center",fontFamily:FONTFAMILY.INTER.medium,marginBottom:50,marginTop:-10}}>When the icon on the right side of your name is <Text style={{color:COLOURS.orange}}>YELLOW,</Text> it indicates you are in OPAM Protect mode</Text>
    <Businesses 
    dotColor='#A0A0A0'
    />
    <View style={{alignSelf:"flex-end",marginTop:-40,marginRight:-10}}>
    <Arrow color='#A0A0A0'/>
   </View>
    <Text style={{fontSize:12,color:COLOURS.white,textAlign:"center",fontFamily:FONTFAMILY.INTER.medium}}>When the icon on the right side of your name is <Text style={{color:"#A0A0A0"}}>GREY,</Text> it indicates you are in normal mode</Text>
    </View>
    <BaseButton
    onPress={()=>{
      navigationRef.current?.navigate(ROUTES.createDistressAccountScreen)
    }}
    title='Get Started'
    />
    </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };

export default connect(MapStateToProps)(OpamProtectGetStartedScreen);
 