import React,{ ReactNode, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardTypeOptions, TextInputProps, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AppStyles from '../../includes/styles';
import { EyeOpen,EyeClosed } from '../svgs/eyeClosed';
import CheckedIcon from '../svgs/checkedIcon';
import { FormikErrors } from 'formik';
import { COLOURS, FONTFAMILY } from '../../includes/constants';
import Svg, { Path } from "react-native-svg";

interface BaseInputSearchProps {
onBlur?:()=>void;
type?: KeyboardTypeOptions | undefined | "mobile";
triallingIcon?:ReactNode | any;
leadingIcon?:ReactNode | any;
onChange:(text: string) => void;
max:number;
disabled?:boolean;
value:string;
showPasswordStrenght?:boolean;
placeholder?:string;
errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
}
interface PasswordChecksProps {
label:string;
regex:boolean;
}
const BaseInputSearch = (props:BaseInputSearchProps)=> {
  
    return (<View style={{flexDirection:'column',marginBottom:16}}>
      <View style={[AppStyles.baseInputWrapper,{elevation:2,height:50,borderColor:COLOURS.lightPurple,borderWidth:props.errorMessage?0.5:0},{margin:0,paddingHorizontal:16}]}
      >
      <SearchIcon />
     <TextInput
     cursorColor={COLOURS.purple}
     underlineColorAndroid="transparent"
    keyboardType={"default"}
    placeholder={props.placeholder}
    style={AppStyles.baseInput}
        onChangeText={(d)=>{
          props.onChange(d);
        }}
        maxLength={props.max}
        value={props.value}
        autoCapitalize={"none"}
        />
        </View>
      </View> 
    );
  };
  export default BaseInputSearch;
const SearchIcon = ()=>{
    return (
      <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
      >
        <Path
          d="M19 19l-4.35-4.35M17 9A8 8 0 111 9a8 8 0 0116 0z"
          stroke="#7B7F99"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
}