import React,{ ReactNode, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardTypeOptions, TextInputProps, Image, StyleSheet, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AppStyles from '../../includes/styles';
import { EyeOpen,EyeClosed } from '../svgs/eyeClosed';
import CheckedIcon from '../svgs/checkedIcon';
import { FormikErrors } from 'formik';
import { COLOURS, FONTFAMILY } from '../../includes/constants';
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import CaretDownIcon from '../svgs/caretDown';
import { ReturnMobile } from '../../includes/functions';
interface BaseInputProps {
onBlur?:()=>void;
style?:ViewStyle;
type?: KeyboardTypeOptions | undefined | "mobile";
triallingIcon?:ReactNode | any;
leadingIcon?:ReactNode | any;
onChange:(text: string) => void;
max:number;
disabled?:boolean;
value:string;
showPasswordStrenght?:boolean;
label?:string;
placeholder?:string;
multiline?:boolean;
errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
flat?:boolean;
autoCapitalize?:"none" | "sentences" | "words" | "characters" | undefined;
}
interface PasswordChecksProps {
label:string;
regex:boolean;
}
const BaseInput = (props:BaseInputProps)=> {
  const [flag,setFlag] = useState<string>("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAMFBMVEUBh1L///8FilUAiEwqf1gCiE/l5eXv/fgIjVgAhVAAjFAug1z9/P0Fi1LZ6eLv//ciup9sAAABuklEQVR4nO3SyXECARAEweUS7AH4761ALlRoXlkedEYvj/NIz21//Qz12rfnzKrHcl7W5f9bb5f9fhrqvV9uA5s+cOchvuV2ud6PGb3jfh3kG9H745vRO52m+JYVXwlfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpf6su3jPh9+Y4ZvePLN+G3LlN86+2yj73v/eEbGfXBe5xHem7762eo1749Z1Y9fgF2nG32nRewWgAAAABJRU5ErkJggg==");
  const [code,setCode] = useState<string>("+234");
  const [showPlaceholder,setPlaceHolder] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(props.type === 'visible-password');
    const pStrengthList:PasswordChecksProps[] = [
        {label:'Min. of 8 characters',regex:String(props.value).length >= 8},
        {label:'Symbols (!@#$%^&)',regex:/[!@#$%^&]/.test(props.value)},
        {label:'Numbers (0 - 9)',regex:/[0-9]/.test(props.value)},
        {label:'Lowercase letter (a - z)',regex:/[a-z]/.test(props.value)},
        {label:'Uppercase letter (A - Z)',regex:/[A-Z]/.test(props.value)},
    ];
    const progress = useSharedValue(0);
    const translateY = useSharedValue(0);
    const size = useSharedValue(16);
    const animatedWrapper = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(
          progress.value,
          [0, 1],
          [COLOURS.inActive, COLOURS.lightPurple]
        ),
      };
    });
    
   

  
  const handleBlur = ()=>{
      if(props.value !== "")
      {
      // handleAnimationDown();
      }
  }
 
  
    useEffect(()=>{
      progress.value = props.errorMessage?1:0;
    },[props.errorMessage]);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
        fontSize:size.value
      }
    });
    return (<View style={{flexDirection:'column',marginBottom:16,...props.style}}>
      <Animated.View style={[Styles.baseInputWrapper,{borderColor:COLOURS.lightPurple,borderWidth:props.errorMessage?0.5:0},animatedWrapper]}
      >
        <Text style={Styles.baseInputLabel}>{props.label}</Text>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        {props.type === "mobile"?<TouchableOpacity style={{minWidth:60,paddingRight:5,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
          <Image 
          style={{height:15,borderRadius:3,marginRight:5,width:20,backgroundColor:"#ddd"}}
          source={{uri:flag}}
          />
          <Text style={{fontSize:14,color:COLOURS.gray64}}>{code}</Text>
          <CaretDownIcon size={14} />
        </TouchableOpacity>:props.leadingIcon?props.leadingIcon:null}
        {props.disabled ? <Text style={[AppStyles.baseInputText,{width:'100%',marginTop:0,fontSize:13,paddingLeft:0,color:props.value?COLOURS.black:COLOURS.gray64,fontFamily:FONTFAMILY.MONTSERRAT.normal}]}>{props.value?props.value:props.placeholder}</Text> : <View
        style={{flex:1}}
        >
     <TextInput
     cursorColor={COLOURS.purple}
     placeholderTextColor={COLOURS.gray64}
     underlineColorAndroid="transparent"
        editable={!props.disabled}
        keyboardType={props.type === 'visible-password' ? 'default' : props.type === "mobile"?"phone-pad":props.type}
        secureTextEntry={isPassword}
        style={Styles.baseInput}
        onChangeText={(d)=>{
          props.onChange(d);
        }}
        placeholder={props.placeholder}
        maxLength={props.max}
        multiline={props.multiline}
        value={props.value}
        autoCapitalize={props.autoCapitalize}
        />
        </View>}
        {props.type === 'visible-password' ? <TouchableOpacity
        onPress={()=>{
            setIsPassword(!isPassword);}
        }
        style={{padding:5}}
        >
        {!isPassword ? <EyeClosed size={20} /> : <EyeOpen size={20} />}
        </TouchableOpacity> : props.triallingIcon ? <View style={{width:40,height:35,alignItems:'center',justifyContent:'center'}} >
        {props.triallingIcon}
        </View> : null}
        </View>
        </Animated.View>
       <Text style={[AppStyles.error,{marginTop:0}]}>{props.errorMessage}</Text>
      {props.type === 'visible-password' && props.showPasswordStrenght ? <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        {pStrengthList.map((a,i)=><View key={i} style={a.regex ? AppStyles.passwordStrengthEnable : AppStyles.passwordStrength}>
         {a.regex && <CheckedIcon size={12}/>}
         <Text style={[AppStyles.passwordStrengthText,{marginLeft:3}]}>{a.label}</Text>
        </View>)}
      </View> : null}
      </View>
    );
  };
  export default BaseInput;
  export const Styles = StyleSheet.create({
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
