
import {TouchableOpacity, Text,View, ActivityIndicator, StyleSheet, StyleProp, ViewProps, ViewStyle, TextStyle} from 'react-native';
import AppStyles from '../../includes/styles';
import {COLOURS} from '../../includes/constants';
import {ReactNode} from 'react';
interface BaseButtonProp {
  title: string;
  style?:ViewStyle;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  filled?: boolean;
  children?: ReactNode;
  type?: 'purple-white' | 'gray'|'white'|'outline'|'outline-purple';
}
const BaseButton = (props: BaseButtonProp) => {
  let BtnStyle:StyleProp<ViewStyle> = AppStyles.purpleBtn ;
  if(props.disabled || props.loading)
  {
    BtnStyle = AppStyles.inactiveBtn;
  }else{
   if(props.type === "purple-white")
    {
      BtnStyle =  AppStyles.purpleBtn;
    }
    if(props.type === "white")
      {
        BtnStyle =  AppStyles.whiteBtn
      }
      if(props.type === "outline-purple")
        {
          BtnStyle =  AppStyles.outlineBtn
        } 
        if(props.type === "gray")
          {
            BtnStyle =  AppStyles.inactiveBtn;
          } 
  }
  return (
    <TouchableOpacity
      disabled={props.disabled || props.loading}
      onPress={props.onPress}
      style={[BtnStyle,props.style]}>
      {props.loading ?(
        <ActivityIndicator
          color={props.type === "gray" || props.type === "white"?COLOURS.purple:COLOURS.white}
          size={'small'}
          style={{marginRight: 5}}
        />
      ):<View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>{props.type === "white" || props.type === "gray" || props.type === "outline-purple" || props.disabled?<BtnTextPurple loading={false} text={props.title} />:<BtnTextWhite loading={props.disabled || props.loading} text={props.title} />}{props.children}</View>}
    </TouchableOpacity>
  );
};
export default BaseButton;
interface BtnTextProp {
text:string;
loading?:boolean;
}
export const BtnTextWhite =(prop:BtnTextProp)=>{
  return <Text style={[AppStyles.btnText,{color:prop.loading?COLOURS.gray:COLOURS.white}]}>{prop.text}</Text>
}
export const BtnTextBlack =(prop:BtnTextProp)=>{
  return <Text style={[AppStyles.btnText,{color:prop.loading?COLOURS.gray:COLOURS.black}]}>{prop.text}</Text>
}
export const BtnTextPurple =(prop:BtnTextProp)=>{
  return <Text style={[AppStyles.btnText,{color:prop.loading?COLOURS.gray:COLOURS.purple}]}>{prop.text}</Text>
}
