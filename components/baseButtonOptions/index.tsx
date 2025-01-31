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
interface BaseButtonSelectProps {
onChange:(text: ItemProps) => void;
disabled?:boolean;
list:ItemProps[];
value?:string;
title?:string;
style?:ViewStyle;
children?:ReactNode;
searchBar?:boolean;
}

const BaseButtonOptions = (props:BaseButtonSelectProps)=> {
 const [value,setValue] = useState<string>("");
 const [show,setShow] = useState<boolean>(false);
 
    useEffect(()=>{
      if(props?.value)
      {
      setValue(props?.value)
      }
    },[props.value])
    return (<View >
      <TouchableOpacity 
        onPress={()=>setShow(true)}
        >{props.children}</TouchableOpacity>
      <SelectModal
      onValue={(d)=>{
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
  export default BaseButtonOptions;
  interface SelectModalProp {
    show:boolean;
    onClose:()=>void;
    onValue:(data:ItemProps)=>void;
    list?:ItemProps[] | null;
    title?:string | ReactNode;
    searchBar?:boolean;
  }
  export const SelectModal = (prop:SelectModalProp)=>{
 const [searchText,setSearchText] = useState<string>("")
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
 }}
 value={searchText}
 placeholder='Search...'
 />
 </View>}
 <FlatList
 keyboardShouldPersistTaps="always"
 initialNumToRender={50}
 contentContainerStyle={{flexDirection:"column",marginBottom:70}}
 data={prop?.list?.filter((a,i)=>String(a.title).toLowerCase().includes(String(searchText).toLowerCase()))}
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