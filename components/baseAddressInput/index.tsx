/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useRef, useState } from "react";
import { CountrylistModel, ItemProps } from "../../includes/types";
import Countrylist from "../../includes/countrylist.json";
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import AppStyles from "../../includes/styles";
import { ReturnAllNumbers } from "../../includes/functions";
import {COLOURS, DEVICE, FONTFAMILY} from "../../includes/constants";
import FastImage from "react-native-fast-image";
import { FormikErrors } from 'formik';
import { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CaretDownIcon from '../svgs/caretDown';
import useHttp from "../../includes/http.hooks";

interface BaseInputMobileProps {
   onValueChange:(text: string) => void;
   value:string;
   label?:string;
   errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
   style?:ViewStyle;
   disabled?:boolean;
   placeholder?:string;
}
const BaseAddressInput = (props:BaseInputMobileProps)=>{
    const [show,setShow] = useState<boolean>(false);
    const [focus,setFocus] = useState<boolean>(false);
    const [fetching,setFetching] = useState<boolean>(false);
    const [list,setList] = useState<ItemProps[]>([]);
    const [searchText,setSearchText] = useState("");
    const {ShowMessage} = useHttp()
   const progress = useSharedValue(0);
   const GoogleAutocomplete = async(query:string)=>{
    if(query.length === 0)
    {
    return;
    }
    if(isNaN(parseFloat(query[0])))
    {
      ShowMessage("top").fail("Address must start with a number (e.g 12 Golden street)");
      props.onValueChange("");
      setSearchText("");
      return;
    }
    setFetching(true);
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=AIzaSyAhO7hcE9OavPyvOWNQZUAYKlgil47uKt8`);
    const data = await response.json();
    console.log(data);
    ShowMessage("top").fail("Oops! address cannot be fetched at the moment, try again later.");
    return displaySuggestions(data.predictions);
  }
  
  const displaySuggestions = (predictions:any[])=> {
    setFetching(false);
  if (predictions.length === 0) {
    setShow(false);
    return [];
  }
  setShow(true);
  const list = predictions.map(prediction => {
   return{
    title:prediction.description,
    value:prediction.description
   }
  });
  setList(list)
  }
    useEffect(()=>{
      if(!show)
      {
        setSearchText(props.value)
      }
    },[show,props.value])
   
    useEffect(()=>{
      progress.value = props.errorMessage?1:0;
       },[props.errorMessage]);

    return <View style={{flexDirection:'column',marginBottom:16,position:"relative"}}>
         <View style={[Styles.baseInputWrapper,{borderColor:COLOURS.lightPurple,borderWidth:props.errorMessage?0.5:0,paddingTop:15}]}
      >
        <Text style={Styles.baseInputLabel}>{props.label}</Text>
        <View style={{flexDirection:"row",width:"100%",height:45,marginTop:-3}}>
       <View
      style={{flex:1,overflow:"hidden"}}
      >
   <TextInput
   focusable={focus}
   cursorColor={COLOURS.purple}
   underlineColorAndroid="transparent"
   onBlur={()=>{
       setShow(false)
      }}
  keyboardType={"default"}
  onChangeText={(d)=>{
        setSearchText(d)
        GoogleAutocomplete(d)
  }}
  onFocus={()=>{
    setSearchText("");
  }}
  numberOfLines={1}
  style={[AppStyles.baseInput,{flex:1,paddingHorizontal:10,color:COLOURS.black,textAlign:"left"}]}
  placeholder={props.placeholder}
  placeholderTextColor={"#999"}
  maxLength={70}
  value={searchText}
   />
   </View>
   <View>
    {fetching &&<ActivityIndicator size={"small"} color={COLOURS.purple}/>}
   </View>
   </View>
   </View>
  <Text style={[AppStyles.error,{marginTop:0}]}>{props.errorMessage}</Text>
  {show &&<View style={Styles.dropdownContainer}>
    <FlatList 
    nestedScrollEnabled
    data={list}
    renderItem={({item,index})=><TouchableOpacity 
    onPress={()=>{
      props.onValueChange(String(item?.value));
      setFocus(false)
      setShow(false)
    }}
    
    style={{paddingVertical:15}}
    >
      <Text style={{paddingHorizontal:20}}>{item.title}</Text>
    </TouchableOpacity>}
    ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:COLOURS.inputWrapper}}></View>}
    />
  </View>}
   </View>
   }
   export default BaseAddressInput;
   const Styles = StyleSheet.create({
    dropdownContainer:{
    overflow:"hidden",
    position:"absolute",
    top:60,
    minHeight:50,
    maxHeight:220,
    backgroundColor:"white",
    alignSelf:"center",
    left:10,
    right:10,
    zIndex:99999,
    borderBottomRightRadius:15,
    borderBottomLeftRadius:15,
    elevation:3
    },
      searchBarWrapper:{
         height:50,
         borderRadius:12,
         backgroundColor:COLOURS.white,
         marginHorizontal:30,
      },
      checked:{
         borderRadius:30,
         width:24,
         height:24,
         borderColor:"rgba(123, 127, 153, 0.5)",
         borderWidth:1
      },
      baseInputLabel:{
        color: "#7B7F99",
        fontFamily: FONTFAMILY.Baloo.normal,
        fontSize: 10,
        alignSelf:"flex-start",
        marginBottom:-2
       },
       baseInput:{
        textAlignVertical:'center',
        color:COLOURS.black,
        fontSize:14,
        height:26,
        padding:0,
        margin:0,
        fontFamily: FONTFAMILY.MONTSERRAT.normal,
      },
      baseInputWrapper:{
        paddingHorizontal:12,
        borderRadius: 12,
        overflow:"hidden",
        backgroundColor:COLOURS.white,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        height:62
       },
   })