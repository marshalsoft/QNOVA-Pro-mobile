import React,{ ReactNode, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardTypeOptions, TextInputProps, Modal, StyleSheet, FlatList, ViewProps, ViewStyle, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AppStyles from '../../includes/styles';
import { EyeOpen,EyeClosed } from '../svgs/eyeClosed';
import FastImage from 'react-native-fast-image';
import { FormikErrors } from 'formik';
import { COLOURS, DEVICE, FONTFAMILY } from '../../includes/constants';
import CaretDownIcon from '../svgs/caretDown';
import { ItemProps } from '../../includes/types';
import CloseIcon from '../svgs/closeIcon';
import BaseInput from '../baseInput';
import BaseInputSearch from '../baseInputSearch';
interface BaseSelectProps {
type: "country"|"custom" | "component" | "address-search";
onChange:(text: ItemProps) => void;
disabled?:boolean;
label?:string;
placeholder?:string;
errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
list:ItemProps[];
title?:string | ReactNode;
value?:string;
style?:ViewStyle;
children?:ReactNode;
containerStyle?:ViewStyle;
searchBar?:boolean;
}
import { CountrylistModel } from "../../includes/types";
import Countrylist from "../../includes/countrylist.json";

const BaseSelect = (props:BaseSelectProps)=> {
 const [value,setValue] = useState<string>("");
 const [show,setShow] = useState<boolean>(false);
 const [selectedCountry,setSelectedCountry] = useState<CountrylistModel>({
  calling_code:"234",
  flag:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAIAAAAVyRqTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjI4OEFDMTE3ODQxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjI4OEFDMjE3ODQxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMjg4QUJGMTc4NDExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGMjg4QUMwMTc4NDExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qCpo0QAAADBJREFUeNpiZGgPZMAN/leswyPL2BGER5aJgWZg1OhRo0eNHjV61OhRo2lnNECAAQBu1gQALTkVbAAAAABJRU5ErkJggg=="
  }
)
    useEffect(()=>{
      if(props?.value)
      {
      setValue(props?.value)
      }
    },[props.value])
    return (<View style={{flexDirection:'column',marginBottom:props.children?0:10,...props.containerStyle}}>
      {!props.children?<View 
        style={[Styles.baseInputWrapper,{borderColor:COLOURS.lightPurple,borderWidth:props.errorMessage?0.5:0,...props.style}]}
      >
        <Text style={Styles.baseInputLabel}>{props.label}</Text>
        <TouchableOpacity
      onPress={()=>setShow(true)}
      style={{flexDirection:"row",height:25,alignItems:'center'}}
      >
        {props.type === "country"?<FastImage 
        style={{height:15,borderRadius:3,marginRight:5,width:20,backgroundColor:"#ddd"}}
        source={{uri:selectedCountry.flag}} 
        />:null}
        <View
        style={{flex:1}}
        >
     <Text
     numberOfLines={1}
        style={[Styles.baseInput,{color:value?COLOURS.black:COLOURS.inActive,paddingLeft:0,paddingRight:25}]}>
          {value?value:props.placeholder}
        </Text>
        </View>
        <View style={{width:40,alignItems:'center',justifyContent:'center',position:"absolute",right:-10,top:-5}} >
        <CaretDownIcon 
        size={20}
        />
        </View>
        </TouchableOpacity>
        </View>:<TouchableOpacity 
        onPress={()=>setShow(true)}
        >{props.children}</TouchableOpacity>}
       {!props.children?<Text style={[AppStyles.error,{marginTop:0}]}>{props.errorMessage}</Text>:null}
      <SelectModal
      type={props.type}
      onValue={(d)=>{
        setValue(d?.title!);
        setSelectedCountry({
          flag:d.icon
        })
        props.onChange(d);
        setShow(false);
      }}
      show={show}
      onClose={()=>setShow(false)}
      list={props.list}
      title={props.title}
      searchBar={props.searchBar}
      />
      </View>
    );
  };
  export default BaseSelect;
  interface SelectModalProp {
    show:boolean;
    onClose:()=>void;
    onValue:(data:ItemProps)=>void;
    list?:ItemProps[] | null;
    title?:string | ReactNode;
    type: "country"|"custom" | "component" | "address-search";
    searchBar?:boolean;
  }
  export const SelectModal = (prop:SelectModalProp)=>{
    const [countries,setCountrylist] = useState<ItemProps[]>([]);
   
    const [addressList,setAddressList] = useState<any[]>([]);
 const [searchText,setSearchText] = useState<string>("")
  const GoogleAutocomplete = async(query:string)=>{
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=AIzaSyAhO7hcE9OavPyvOWNQZUAYKlgil47uKt8`);
    const data = await response.json();
    return displaySuggestions(data.predictions);
  }
  
  const displaySuggestions = (predictions:any[])=> {
  if (predictions.length === 0) {
    return [];
  }
  const list = predictions.map(prediction => {
   return{
    title:prediction.description,
    value:prediction.description
   }
  });
  setAddressList(list)
  console.log(JSON.stringify(predictions));
  }
  const returnCountry = ():CountrylistModel[]=>{
    let cn:CountrylistModel[] = [];
    Countrylist.forEach((a:any)=>{
      cn.push(a)
    })
    
    return cn; 
 }
 useEffect(()=>{
  if(prop.type === "address-search")
  {
    setAddressList([]);
  }else{
    setAddressList(returnCountry().map((a,i)=>{
      return {
        title:a.name,
        icon:"data:image/png;base64,"+a.flag,
        value:a.name
      }
    }))
  }
 },[])
 

  return <Modal 
    visible={prop.show}
    onRequestClose={prop.onClose}
    transparent={true}
    animationType='slide'
    >
      <KeyboardAvoidingView 
      style={{flex:1}}
      >
      <View style={[AppStyles.modalContainer,{flex:1}]} >
      <TouchableOpacity 
      onPress={prop.onClose}
      style={StyleSheet.absoluteFill}
      ></TouchableOpacity>
      <View style={[AppStyles.flatListWrapper,{position:"absolute",bottom:0,maxHeight:DEVICE.height/2}]} >
      <View style={{padding:10,paddingHorizontal:20,alignItems:"center"}} >
        <Text style={[AppStyles.topSectionSubTitleText]}>{prop.title}</Text>
        <TouchableOpacity 
        onPress={prop.onClose}
        style={{position:"absolute",right:20,top:18}}
        >
          <CloseIcon 
          size={14}
          />
        </TouchableOpacity>
        </View>
        <View style={{height:1,backgroundColor:COLOURS.gray50}} />
 {prop.searchBar && <View style={{height:45,paddingHorizontal:10,marginBottom:10,marginHorizontal:10,marginTop:5}}>
 <BaseInputSearch 
 max={100}
 onChange={(d)=>{
  setSearchText(d)
  if(prop.type === "address-search")
  {
    if(String(d).length > 2)
    {
    GoogleAutocomplete(d);
    }
  }
 }}
 value={searchText}
 placeholder='Search...'
 />
 </View>}
 <FlatList
 keyboardShouldPersistTaps="always"
 initialNumToRender={50}
 contentContainerStyle={{flexDirection:"column",marginBottom:70}}
 data={prop.type === "address-search" || prop.type === "country"?prop.type === "country"?addressList.filter((a,i)=>String(a.title).toLowerCase().includes(String(searchText).toLowerCase())):addressList:prop?.list?.filter((a,i)=>String(a.title).toLowerCase().includes(String(searchText).toLowerCase()))}
 renderItem={({item,index:number})=>{
 return <TouchableOpacity
 style={AppStyles.flatListItem}
 onPress={()=>{
    prop.onValue(item);
 }}
 >
  {item.icon && <View style={{justifyContent:'center',alignItems:'center',height:20,width:typeof(item.icon) !== "object"?30:20,marginRight:5}}>
 {typeof(item.icon) !== "object"?<FastImage
 source={{uri:item.icon}}
 style={{backgroundColor:'#999',height:30,width:30,borderRadius:5}}
 resizeMode={FastImage.resizeMode.cover}
 />:item.icon}
 </View>}
  <View style={{flex:1,paddingHorizontal:typeof(item.icon) !== "object"?10:5}}>
  <Text numberOfLines={1} style={{color:COLOURS.black}}>{item.title}</Text>
  </View>
 </TouchableOpacity>;
 }}
 ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:COLOURS.gray50}} />}
 />
      </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  }

  const Styles = StyleSheet.create({
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