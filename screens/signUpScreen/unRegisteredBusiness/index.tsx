import React, { RefObject, useEffect, useRef, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image, Linking, Share } from 'react-native';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { BusinessRegFormProps, ScreenComponentType, SignUpFormProps, UserLoginProps } from '../../../includes/types';
import AppContainer from '../../../components/appContainer';
import { navigationRef } from '../../../App';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile } from '../../../includes/constants';
import useHttp from '../../../includes/http.hooks';
import Svg, { Path } from "react-native-svg"
import { FormsProp } from '../registeredBusiness';
import AppStyles from '../../../includes/styles';
import { CopyText } from '../../../includes/functions';

const NonRegisteredScreen = ({route}:ScreenComponentType) => {
      useEffect(()=>{
      },[])
      const {ShowMessage} = useHttp()
      return <AppContainer
      showNavBar
      goBack={()=>{
          navigationRef.current?.goBack()
      }}
      disableScrol
      >
      <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      >
      <View style={{flexDirection:"column"}}>
       <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>We got you covered!</Text>
       <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>We'll help you get your company registered</Text>
       <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
      <View style={{paddingHorizontal:0,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
     <Image
     source={require("../../../images/bn.png")}
     style={{width:220,height:180}}
     resizeMode='contain'
     />
       <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Talk to one of our agents</Text>
       <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:36,marginVertical:10,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,fontWeight:"700"}}>0802 123 4567</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10,marginHorizontal:20}} >
    <TouchableOpacity 
    onPress={()=>{
      Linking.openURL("tel:+23480383839393")
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
    >
      <CallIcon />
      <Text style={[AppStyles.subTitle,{fontSize:14,marginTop:5}]}>Call</Text>
    </TouchableOpacity>
    <TouchableOpacity 
     onPress={()=>{
      Linking.openURL(`whatsapp://send?phone=080383839393&text=Hi there!`);
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
    >
      <WhatAppIcon />
      <Text style={[AppStyles.subTitle,{fontSize:14,marginTop:5}]}>WhatsApp</Text>
    </TouchableOpacity>
    <TouchableOpacity 
     onPress={()=>{
      CopyText("080839399393")
      ShowMessage("top").success(`Text copied`);
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
    >
      <CopyIcon />
      <Text style={[AppStyles.subTitle,{fontSize:14,marginTop:5}]}>Copy</Text>
    </TouchableOpacity>
    <TouchableOpacity 
     onPress={()=>{
      Share.share({message:"slslslsl"})
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}
    >
      <ShareIcon />
      <Text style={[AppStyles.subTitle,{fontSize:14,marginTop:5}]}>Share</Text>
    </TouchableOpacity>
       </View>
       <View style={{flexDirection:"column",marginVertical:10,paddingLeft:40}} >
        <Text style={[AppStyles.blackText,{color:COLOURS.gray64,fontSize:12,marginBottom:10}]}>What you need to know about CAC registration:</Text> 
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <View style={{width:5,height:5,backgroundColor:COLOURS.gray64,borderRadius:5,marginTop:-10,marginRight:5,marginLeft:10}}></View>
        <Text  style={[AppStyles.blackText,{color:COLOURS.gray64,fontSize:12,marginBottom:10}]}>Please insert your body copy here. </Text> 
        </View>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <View style={{width:5,height:5,backgroundColor:COLOURS.gray64,borderRadius:5,marginTop:-10,marginRight:5,marginLeft:10}}></View>
        <Text  style={[AppStyles.blackText,{color:COLOURS.gray64,fontSize:12,marginBottom:10}]}>Please insert your body copy here. </Text> 
        </View>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <View style={{width:5,height:5,backgroundColor:COLOURS.gray64,borderRadius:5,marginTop:-10,marginRight:5,marginLeft:10}}></View>
        <Text  style={[AppStyles.blackText,{color:COLOURS.gray64,fontSize:12,marginBottom:10}]}>Please insert your body copy here. </Text> 
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
  export default connect(MapStateToProps)(NonRegisteredScreen);
  
  export const CallIcon = ()=>{
    return (
      <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.34 6.856a17.217 17.217 0 008.921 8.663l.013.005.764.34a2.25 2.25 0 002.74-.737l1.274-1.763a.25.25 0 00-.046-.341l-2.225-1.795a.25.25 0 00-.358.046l-.865 1.168a.75.75 0 01-.912.237 13.387 13.387 0 01-6.67-6.67.75.75 0 01.236-.912l1.169-.866a.25.25 0 00.046-.358L4.632 1.648a.25.25 0 00-.341-.046l-1.774 1.28a2.25 2.25 0 00-.731 2.756l.553 1.217.001.001zm8.33 10.041A18.716 18.716 0 01.976 7.481l-.001-.003-.554-1.22a3.75 3.75 0 011.218-4.592L3.413.386a1.75 1.75 0 012.386.32l1.795 2.225a1.75 1.75 0 01-.32 2.505l-.67.496a11.892 11.892 0 005.118 5.118l.496-.67a1.75 1.75 0 012.505-.32l2.225 1.795a1.75 1.75 0 01.32 2.387l-1.275 1.764a3.75 3.75 0 01-4.566 1.229l-.757-.338z"
          fill="#8B1D41"
        />
      </Svg>
    )
  }
  export const WhatAppIcon = ()=>{
    return (
      <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
      >
        <Path
          d="M9.386 7.17c.183.005.386.015.579.443.128.285.343.81.519 1.238.136.333.249.607.277.663.064.128.104.275.02.448l-.029.058c-.067.14-.115.24-.228.37a9.346 9.346 0 00-.144.17c-.085.104-.17.206-.242.278-.129.128-.262.266-.114.522.148.256.668 1.098 1.435 1.777a6.635 6.635 0 001.903 1.2c.07.03.127.055.17.076.257.128.41.108.558-.064.149-.173.643-.749.816-1.005.169-.256.342-.216.58-.128.237.089 1.503.71 1.76.837l.143.07c.179.085.3.144.352.23.064.109.064.62-.148 1.222-.218.6-1.267 1.176-1.742 1.22l-.136.016c-.435.052-.987.12-2.956-.655-2.425-.954-4.026-3.32-4.35-3.799a2.738 2.738 0 00-.052-.076l-.006-.008c-.147-.197-1.048-1.402-1.048-2.646 0-1.19.586-1.81.854-2.092l.047-.05a.95.95 0 01.687-.32c.173 0 .346 0 .495.005z"
          fill="#8B1D41"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.684 21.331a.4.4 0 00.487.494l4.607-1.204a10 10 0 004.759 1.207h.005c5.486 0 9.958-4.447 9.958-9.912a9.828 9.828 0 00-2.914-7.011A9.917 9.917 0 0012.542 2c-5.486 0-9.958 4.446-9.958 9.911 0 1.739.458 3.447 1.33 4.954l-1.23 4.466zm2.677-4.068a1.5 1.5 0 00-.148-1.15 8.377 8.377 0 01-1.129-4.202c0-4.63 3.793-8.411 8.458-8.411 2.27 0 4.387.877 5.986 2.468A8.328 8.328 0 0121 11.916c0 4.63-3.793 8.412-8.458 8.412h-.005a8.5 8.5 0 01-4.044-1.026 1.5 1.5 0 00-1.094-.132l-2.762.721.724-2.628z"
          fill="#8B1D41"
        />
      </Svg>
    )
  }
  export const CopyIcon = ()=>{
    return (
      <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
      >
        <Path
          d="M9.5 3.25A5.75 5.75 0 003.75 9v7.107a.75.75 0 001.5 0V9A4.25 4.25 0 019.5 4.75h7.013a.75.75 0 000-1.5H9.5z"
          fill="#8B1D41"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.903 6.793a44.372 44.372 0 00-9.806 0 2.011 2.011 0 00-1.774 1.76 42.581 42.581 0 000 9.893 2.01 2.01 0 001.774 1.76c3.241.363 6.565.363 9.806 0a2.01 2.01 0 001.774-1.76 42.579 42.579 0 000-9.893 2.011 2.011 0 00-1.774-1.76zM9.264 8.284c3.13-.35 6.342-.35 9.472 0a.51.51 0 01.45.444c.372 3.17.372 6.374 0 9.544a.51.51 0 01-.45.444c-3.13.35-6.342.35-9.472 0a.511.511 0 01-.45-.444c-.372-3.17-.372-6.374 0-9.544a.511.511 0 01.45-.444z"
          fill="#8B1D41"
        />
      </Svg>
    )
  }
  export const ShareIcon = ()=>{
    return (
      <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.75 5.5a3.25 3.25 0 11.833 2.173l-2.717 1.482-3.04 1.737a3.254 3.254 0 01.31 2.464l5.447 2.971a3.25 3.25 0 11-.719 1.316l-5.447-2.97a3.25 3.25 0 11-.652-4.902l3.37-1.926 2.729-1.489a3.254 3.254 0 01-.114-.856zM18 3.75a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm-11 7a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm9.25 7.75a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0z"
          fill="#8B1D41"
        />
      </Svg>
    )
  }