import React,{useEffect, useState } from "react"
import { View,Text, TouchableOpacity, KeyboardTypeOptions, Modal, TextInput, ViewStyle } from "react-native"
import AppStyles from "../../includes/styles";
import { FormikErrors } from "formik";
import CalendarIcon from "../svgs/calandarIcon";
import DatePicker from 'react-native-date-picker';
import moment from "moment";
import BaseButton from "../baseButton";
import BaseInput, { Styles } from "../baseInput";
import { ReturnAllNumbers } from "../../includes/functions";
import { COLOURS, DEVICE, FONTFAMILY } from "../../includes/constants";
import TimeIcon from "../svgs/timeIcon";
interface BaseInputProps {
type?:"time"|"date"|"datetime";
onChange:(text: string) => void;
value:string;
label?:string;
placeholder?:string;
limit?:number;
min?:Date;
max?:Date;
style?:ViewStyle;
errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
}

const BaseInputDate = (props:BaseInputProps)=> {
    const [selectedDate, setSelectedDate] =  useState<string>("");
    const [date, setDate] = useState(props.max?props.max:new Date())
    const [max, setMaxDate] = useState(props.max?props.max:new Date())
    const [min, setMinDate] = useState(props.min?props.min:new Date())
    const [open, setOpen] = useState(false)
  useEffect(()=>{
    if(props?.value)
    {
      setSelectedDate(props?.value)
    }
  },[props.value])
  useEffect(()=>{
    // if(props?.limit)
    // {
    //  setDate(new Date(moment().subtract(props.limit,"years").toISOString()))
    // }else{
    //  setDate(new Date(moment().toISOString()))
    // }
  },[props.limit])
  
    return (<View style={{flexDirection:'column',marginBottom:10,...props.style}}>
      <View style={[Styles.baseInputWrapper,{borderColor:COLOURS.lightPurple,borderWidth:props.errorMessage?0.5:0,flexDirection:"row"}]}
          >
      <View style={{flex:1}} >
      <Text style={[Styles.baseInputLabel]}>{props.label}</Text>
      <View style={{flexDirection:"row",alignItems:"center"}} >
      <View style={{flex:1,}} >
      <Text style={[AppStyles.baseInputText,{width:'100%',marginTop:3,fontSize:13,paddingLeft:0,color:props.value?COLOURS.black:COLOURS.gray64,fontFamily:FONTFAMILY.MONTSERRAT.normal}]}>{selectedDate === ""?props.type == "time"?"Select time":"YYYY-MM-DD":selectedDate}</Text>
      </View>
      </View>
      </View>
      <TouchableOpacity
        onPress={()=>setOpen(true)}
        style={{width:20}}
        >
      {props.type == "time"?<TimeIcon size={15} />:<CalendarIcon size={20} />}
     </TouchableOpacity>
   </View>
   {props.errorMessage?<Text style={[AppStyles.error]}>{props.errorMessage}</Text>:null}
      <DatePicker
        modal
        open={open}
        date={date}
        maximumDate={new Date(moment().subtract(props.limit!,"year").toISOString())}
        mode={props.type?props.type:"date"}
        onConfirm={(date) => {
          const formatedDate = moment(date).format("YYYY-MM-DD")
          setOpen(false)
          setSelectedDate(formatedDate);
          props.onChange(formatedDate);
        }}
        onCancel={() => {
          setOpen(false)
        }}
        
      />
   </View>
    );
}
export default BaseInputDate;