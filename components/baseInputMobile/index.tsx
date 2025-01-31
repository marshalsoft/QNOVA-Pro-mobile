/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { CountrylistModel } from "../../includes/types";
import Countrylist from "../../includes/countrylist.json";
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import AppStyles from "../../includes/styles";
import { ReturnAllNumbers } from "../../includes/functions";
import {COLOURS, DEVICE, FONTFAMILY} from "../../includes/constants";
import FastImage from "react-native-fast-image";
import { FormikErrors } from 'formik';
import { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CaretDownIcon from '../svgs/caretDown';

interface BaseInputMobileProps {
   onValueChange:(text: string) => void;
   onCode:(code: string) => void;
   value:string;
   label?:string;
   errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
   style?:ViewStyle;
   filter?:string[];
   disabled?:boolean;
   placeholder?:string;
   flag?:string;
   rightIcon?:ReactNode;
   onBlur?:()=>void;
}
const BaseInputMobile = (props:BaseInputMobileProps)=>{
    const SetCode = (country:CountrylistModel)=>{
       props.onCode(String(country.calling_code));
       SetSelectedCountry({...country,flag:"data:image/png;base64,"+country.flag})
       setShow(false)
       SetsearchText("");
    };
    const [show,setShow] = useState<boolean>(false);
    const [searchText,SetsearchText] = useState("");
    const [countries,SetCountrylist] = useState<CountrylistModel[]>([]);
    const [selectedCountry,SetSelectedCountry] = useState<CountrylistModel>({
       calling_code:"234",
       flag:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAIAAAAVyRqTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjI4OEFDMTE3ODQxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjI4OEFDMjE3ODQxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMjg4QUJGMTc4NDExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGMjg4QUMwMTc4NDExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qCpo0QAAADBJREFUeNpiZGgPZMAN/leswyPL2BGER5aJgWZg1OhRo0eNHjV61OhRo2lnNECAAQBu1gQALTkVbAAAAABJRU5ErkJggg=="
       }
   )
   const progress = useSharedValue(0);
   const labelPosition = useSharedValue(12);
   const labelTextSize = useSharedValue(10);
   const labelTextTranslateX = useSharedValue(0);
   
   const HandleAnimDown = ()=>{
     labelPosition.value = withTiming(12,{duration:100})
     labelTextSize.value = withTiming(14,{duration:100});
     labelTextTranslateX.value  = withTiming(90,{duration:100});
   }
   const HandleAnimUp = ()=>{
     labelPosition.value = withTiming(0,{duration:100})
     labelTextSize.value = withTiming(8,{duration:100})
     labelTextTranslateX.value  = withTiming(0,{duration:100});
   }
    const returnCountry = ():CountrylistModel[]=>{
       let cn:CountrylistModel[] = [];
       Countrylist.forEach((a:any)=>{
         cn.push(a)
       })
       
       return cn; 
    }
    useEffect(()=>{
       SetCountrylist(returnCountry())
    },[])
    useEffect(()=>{
      props.onCode(String(selectedCountry.calling_code))
    },[selectedCountry])
    useEffect(()=>{
      progress.value = props.errorMessage?1:0;
       },[props.errorMessage]);
       useEffect(()=>{
        if(props.value === "")
        {
          // HandleAnimDown();
        }else{
          HandleAnimUp();
        }
       },[props.value])
    let countryList = countries;
    if(props.filter != undefined)
    {
     countryList = countryList.filter((a,i)=>props.filter?.includes(String(a.calling_code)))
    }
    return <View style={{flexDirection:'column',marginBottom:16}}>
         <View style={[Styles.baseInputWrapper,{borderColor:COLOURS.lightPurple,borderWidth:props.errorMessage?0.5:0,paddingTop:15}]}
      >
        <Text style={Styles.baseInputLabel}>{props.label}</Text>
        <View style={{flexDirection:"row",width:"100%",height:45,marginTop:-3}}>
     <TouchableOpacity 
     onPress={()=>setShow(true)}
     style={{height:40,minWidth:60,paddingRight:5,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
        <Image 
        style={{height:15,borderRadius:3,marginRight:5,width:20,backgroundColor:"#ddd"}}
        source={{uri:props?.flag?props.flag:selectedCountry.flag}} 
        />
        <Text style={{fontSize:14,color:COLOURS.gray64}}>+{selectedCountry.calling_code}</Text>
        <CaretDownIcon size={14} />
      </TouchableOpacity>
      {props.disabled ? <Text style={[AppStyles.baseInputText,{width:'90%',marginTop:0,fontSize:13,paddingLeft:10,color:props.value?COLOURS.black:COLOURS.gray64,fontFamily:FONTFAMILY.MONTSERRAT.normal}]}>{props.value?props.value:props.placeholder}</Text> : <View
      style={{flex:1}}
      >
   <TextInput
   onFocus={HandleAnimUp}
   cursorColor={COLOURS.purple}
   underlineColorAndroid="transparent"
      editable={!props.disabled}
      onBlur={()=>{
        if(props.value == "")
        {
          HandleAnimDown();
        }
        props.onBlur
      }}
      keyboardType={"phone-pad"}
      onChangeText={(d)=>{
        HandleAnimUp();
        props.onValueChange(d);
      }}
    onChange={()=>{
      if(props.value == "")
        {
          HandleAnimDown();
        }else{
         HandleAnimUp(); 
        }
    }}
   style={[AppStyles.baseInput,{flex:1,paddingHorizontal:10,color:COLOURS.black}]}
   placeholder={props.placeholder}
   placeholderTextColor={"#999"}
   maxLength={10}
   value={ReturnAllNumbers(String(parseInt(String(props.value))))}
      />
      </View>}
      </View>
      </View>
     <Text style={[AppStyles.error,{marginTop:0}]}>{props.errorMessage}</Text>
     <Modal 
   visible={show}
   onRequestClose={()=>setShow(false)}
   animationType="slide"
   transparent={true}
   >
   <View style={[AppStyles.modalContainer]} >
     <TouchableOpacity 
     activeOpacity={0}
     onPress={()=>setShow(false)}
     style={{height:DEVICE.height,width:DEVICE.width,position:"absolute",top:0,left:0}}>
    </TouchableOpacity>
    <View style={{flex:1}}></View>
   <View style={[AppStyles.flatListWrapper,{backgroundColor:COLOURS.defaultWhite,position:"relative",flex:2}]} >
   <Text style={{padding:10,width:"100%",textAlign:"center",fontFamily:FONTFAMILY.INTER.medium,color:COLOURS.black,fontSize:20,fontWeight:"600"}}>Country Code</Text>
   <View style={Styles.searchBarWrapper}>
       {/* <Icons.AntDesign name="search1" size={20} /> */}
       <TextInput 
       value={searchText}
       placeholder="Search..."
       placeholderTextColor="#999"
       style={{flex:1,color:COLOURS.black,paddingHorizontal:16,
         paddingVertical:12}}
       maxLength={50}
       onChangeText={(d)=>{
           SetsearchText(d)
       }}
       />
   {searchText != "" && <TouchableOpacity 
    onPress={()=>{
       SetsearchText("")
   }}
   >
   {/* <Icons.AntDesign name="closecircle" size={15} />  */}
   </TouchableOpacity>}
   </View>
   <FlatList 
   keyboardShouldPersistTaps="always"
   initialNumToRender={20}
   data={countryList.filter((a,i)=>String(a.name).includes(searchText))}
   renderItem={({item,index:number})=>{
   return <TouchableOpacity 
   style={AppStyles.flatListItem}
   onPress={()=>{
      SetCode(item);
   }}
   >
   <View style={[Styles.checked,{borderWidth:selectedCountry.calling_code === item.calling_code?5:1,borderColor:selectedCountry.calling_code === item.calling_code?COLOURS.green:COLOURS.gray64}]} ></View>
    <View style={{marginLeft:20,justifyContent:"center",alignItems:"center",height:20,width:30,marginRight:10}}>
   <FastImage 
   source={{uri:"data:image/png;base64,"+item.flag}} 
   style={{backgroundColor:"#999",height:25,width:35,borderRadius:3}} 
   resizeMode={FastImage.resizeMode.cover}
   />
    </View>
    <View style={{flex:1}}>
    <Text style={{color:COLOURS.black}}>{item.name} (+{selectedCountry.calling_code})</Text>
    </View>
   </TouchableOpacity>
   }}
   ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:COLOURS.inputWrapper}}></View>}
   />
   </View>
   </View>
   </Modal>
    </View>
  
   }
   export default BaseInputMobile;
   const Styles = StyleSheet.create({
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