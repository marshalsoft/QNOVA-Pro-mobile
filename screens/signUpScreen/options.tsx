import { Image, Text, StyleSheet, View, TouchableOpacity, ScrollView, DeviceEventEmitter } from "react-native";
import { ItemProps, ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useEffect, useRef, useState } from "react";
import AppContainer from "../../components/appContainer";
import BaseButton from "../../components/baseButton";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import { connect } from "react-redux";
const OptionScreen = ({route}: ScreenComponentType) =>{
    const [selected,setSelected] = useState<ItemProps | null>(null);
    const list:ItemProps[] = [
        {route:ROUTES.businessDetails,title:"Yes, my business is registered.",value:"1"},
        {route:ROUTES.unRegisteredBusiness,title:"No, my business is not registered.",value:"2"},
        {route:ROUTES.unRegisteredBusiness,title:"I'm not sure.",value:"3"}
    ]
    useEffect(()=>{
     
    },[])
    return <AppContainer
    showNavBar
    goBack={()=>{
      navigationRef.current?.goBack();
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView >
    <View style={{flexDirection:"column"}}>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Is your business registered?</Text>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Please insert your body copy here. </Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    {list.map((item,index)=><TouchableOpacity 
    key={index}
    onPress={()=>{
        setSelected(item);
    }}
    style={{flexDirection:"row",alignItems:"center",marginBottom:30}}
    >
      <View style={{width:20,height:20,borderRadius:20,borderWidth:selected?.value === item.value?4:1,borderColor:selected?.value === item.value?COLOURS.orange:COLOURS.gray64}} />
       <View style={{flex:1,flexDirection:"column",paddingHorizontal:10}}>
         <Text  style={{fontFamily:FONTFAMILY.INTER.normal,fontSize:14,color:COLOURS.black}}>{item.title}</Text>
        </View>
    </TouchableOpacity>)}
    <View style={{height:50}} />
       <BaseButton 
       onPress={()=>{
        navigationRef.current?.navigate(String(selected?.route),route?.params)
       }}
       title="Continue"
       />
    </View>
     </View>
     </ScrollView>
     </View>
     </AppContainer>
}

const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(OptionScreen);