
import { View,Text, TouchableOpacity,Platform, StatusBar, ScrollView, Alert, StyleSheet,Image as DefaultImage, DeviceEventEmitter, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { ScreenComponentType, UserDataModel } from '../../../../includes/types';
import AppContainer from '../../../../components/appContainer';
import AppStyles from '../../../../includes/styles';
import {memo,  ReactNode, useState } from 'react';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from '../../../../includes/constants';
import LinearGradient from 'react-native-linear-gradient';
import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, Pattern, Use, Image } from "react-native-svg"
import BaseInputSearch from '../../../../components/baseInputSearch';
import { RouteProp } from '..';
import { navigationRef } from '../../../../App';
export interface BtnNavProp {
title:string;
icon:number;
route?:RouteProp;
tags?:string;
}

export const MenuComponets = ({goTo,Reducer}:{goTo:(route:RouteProp)=>void;Reducer:UserDataModel;})=>{
  const generalBtns:BtnNavProp[] = [
    {
      title:"Dashboard",
      icon:require("../../../../images/dicn.png"),
      route:null,
      tags:"dashboard"
    },
    {
      title:"Transaction History",
      icon:require("../../../../images/rci1.png"),
      route:"TransactionHistory",
      tags:"transaction,history"
    },
    // {
    //   title:"Linked Accounts",
    //   icon:require("../../../../images/lnkicn.png"),
    //   route:"LinkedAccount",
    //   tags:"link,account"
    // },
     {
      title:"Cards",
      icon:require("../../../../images/oci1.png"),
      route:"Cards",
      tags:"bulk,send,transfer,money,cash"
    }
  ];
  const paymentBtns:BtnNavProp[] = [
        {
          title:"Wallet Transfer",
          icon:require("../../../../images/ic1.png"),
          route:"WalletTransfer",
          tags:"wallet,transfer,send"
        },
        {
            title:"Bulk Transfer",
            icon:require("../../../../images/ic2.png"),
            route:"BulkTransfer",
            tags:"bulk,send,transfer"
          },
          {
            title:"Payment Request",
            icon:require("../../../../images/ic3.png"),
            route:"PaymentRequest",
            tags:"payment,request,money,cash"
          },
          {
            title:"Bill Payments",
            icon:require("../../../../images/ic4.png"),
            route:"BillPayment",
            tags:"bill,payment,airtime,data,mtn,airtel,glo,ntel,9mobile"
          }
      ];
      const businessBtns:BtnNavProp[] = [
        {
          title:"Business Profile",
          icon:require("../../../../images/bficn.png"),
        route:"Business Profile"
        },
        {
          title:"User & Staff Management",
          icon:require("../../../../images/bci1.png"),
          route:"StaffManagement",
          tags:"staff,user,management"
        },
        {
            title:"Payroll Management",
            icon:require("../../../../images/bci2.png"),
            route:"PayRollManagement",
            tags:"payroll,user,management"
          },
          {
            title:"Customer Management",
            icon:require("../../../../images/bci3.png"),
            route:"CustomerManagement",
            tags:"customer,user,management"
          }
      ]
    
      const othersBtns:BtnNavProp[] = [
          {
            title:"Settings",
            icon:require("../../../../images/oci2.png"),
            route:"Settings"
          },
          {
            title:"My Profile",
            icon:require("../../../../images/bci3.png"),
            route:"Profile",
            tags:"profile,user,settings"
          },
          {
            title:"Opam Protect",
            icon:require("../../../../images/optect.png"),
            route:"OpamProtect",
            tags:"secure,distress,protect,opam"
          }
      ]
      const [searchText,setSearchText] = useState<string>("");
      const HandleBack = ()=>{
        goTo(null);
        return true;
      }
      React.useEffect(()=>{
       BackHandler.addEventListener("hardwareBackPress",HandleBack);
       return ()=>{
        BackHandler.removeEventListener("hardwareBackPress",HandleBack);
       }
      },[])
    return  <View  style={{flexDirection:"column",padding:16}}>
 <BaseInputSearch
onChange={(d)=>setSearchText(d)}
value={searchText}
max={30}
placeholder='Search...'
 />
<View  style={{flexDirection:"column"}}>
{generalBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).length !== 0?<Text style={{color:"rgba(255,255,255,0.5)",fontSize:14,fontFamily:FONTFAMILY.INTER.normal}}>Genaral</Text>:null}
 <View style={{paddingVertical:16,flexDirection:"row",gap:5,flexWrap:"wrap"}}>
{generalBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).map((item,index)=><MenuButton 
key={index} 
item={item}
goTo={(d)=>{
 const route = d as RouteProp;
  if(String(route) === "null"){
  return goTo(null);
  }
 if(route === "LinkedAccount")
  {
    return navigationRef.current?.navigate(ROUTES.linkedAccountScreen)
  }
  goTo(route);
}}
/>)}
 </View>
 {paymentBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).length !== 0?<Text style={{color:"rgba(255,255,255,0.5)",fontSize:14,fontFamily:FONTFAMILY.INTER.normal}}>Payments</Text>:null}
 <View style={{paddingVertical:16,flexDirection:"row",gap:5,flexWrap:"wrap"}}>
{paymentBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).map((item,index)=><MenuButton 
key={index} 
item={item}
goTo={(d)=>{
 const route = d as RouteProp;
    goTo(route);
}}
/>)}
 </View>
 {businessBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).length !== 0?<Text style={{color:"rgba(255,255,255,0.5)",fontSize:14,fontFamily:FONTFAMILY.INTER.normal}}>Business Management</Text>:null}
 <ScrollView 
 horizontal 
 >
 <View style={{paddingVertical:16,flexDirection:"row",gap:5}}>
{businessBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).map((item,index)=><MenuButton 
key={index} 
item={item}
goTo={(d)=>{
 const route = d as RouteProp;
    goTo(route);
}}
/>)}
 </View>
 </ScrollView>
 {othersBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).length !== 0?<Text style={{color:"rgba(255,255,255,0.5)",fontSize:14,fontFamily:FONTFAMILY.INTER.normal}}>Other</Text>:null}
 <View style={{paddingVertical:16,flexDirection:"row",gap:5}}>
{othersBtns.filter((a,i)=>String(a.tags).includes(String(searchText).toLowerCase())).map((item,index)=><MenuButton 
key={index} 
item={item} 
goTo={(d)=>{
 const route = d as RouteProp;
 if(route === "OpamProtect")
 {
  if(Reducer.isOpamProtected)
  {
  return navigationRef.current?.navigate(ROUTES.opamProtectManageScreen)
  }
  return navigationRef.current?.navigate(ROUTES.opamProtectIntroScreen)
 }
 goTo(route);
}}
/>)}
 </View>
</View>
</View>
}
const MenuButton = memo((prop:{item:BtnNavProp;goTo:(route:string)=>void})=>{
    return <TouchableOpacity
    onPress={()=>{
      if(prop.item.route === "Settings")
        {
          return navigationRef.current?.navigate(ROUTES.settingsScreen)
        }
          prop.goTo(String(prop.item.route));
    }} 
    style={Styles.smallcard}>
    <LinearGradient 
    colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
    width:(DEVICE.width / 4) - 13,
    height:100,
    borderRadius:8,
    borderColor:"rgba(255, 255, 255, 0.25)",
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    padding:8,
    position:"absolute",
    left:0,
    top:0
    }}
    >
     <View style={{flexDirection:"column",flex:1}}>
     <View style={{flex:1,alignItems:"flex-start",justifyContent:"center"}}>
        <DefaultImage source={prop.item.icon}
        style={{width:prop.item.title.includes("Protect")?60:40,height:40}}
        resizeMode='contain'
        />
     </View>   
     <Text style={{color:"rgba(255,255,255,1)",fontSize:9,fontFamily:FONTFAMILY.INTER.normal,fontWeight:"600",lineHeight:13.5}}>{prop.item.title}</Text>
    </View>   
    </LinearGradient>
     </TouchableOpacity>
  },(prevProps, nextProps) => {
    return prevProps.item.title === nextProps.item.title;
  })
const Styles = StyleSheet.create({
    smallcard:{
        width:(DEVICE.width / 4) - 13,
        height:100
    }
})


