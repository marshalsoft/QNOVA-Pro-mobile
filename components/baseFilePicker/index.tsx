import React,{ ReactNode, useEffect, useState } from 'react';
import { View,Alert, Text, TouchableOpacity, KeyboardTypeOptions, TextInputProps, Modal, StyleSheet, FlatList, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AppStyles from '../../includes/styles';
import { EyeOpen,EyeClosed } from '../svgs/eyeClosed';
import FastImage from 'react-native-fast-image';
import { FormikErrors } from 'formik';
import { COLOURS, DEVICE, FONTFAMILY } from '../../includes/constants';
import { APIResponse, ItemProps } from '../../includes/types';
import {ImageLibraryOptions,ImagePickerResponse,Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker'
import UploadIcon from '../svgs/uploadIcon';
import { useToast } from 'react-native-toast-notifications';
import useHttp from '../../includes/http.hooks';
import TrashIcon from '../svgs/trashIcon';
import { Styles } from '../baseInput';
interface BaseSelectProps {
maxFileSize:number;
onChange:(data: APIResponse) => void;
label?:string;
placeholder?:string;
errorMessage?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined | any;
fileTypes:FileTypes[];
upload?:boolean;
}
type FileTypes = "png" | "jpeg" | "pdf" | "jpg" | "csv";
export const mediaOption:ImageLibraryOptions = {
  maxWidth: 200, 
  maxHeight: 200,
  mediaType:'photo',
  quality:1,
  selectionLimit:1,
  includeBase64:false,
  includeExtra:false,
  assetRepresentationMode:"auto",
  presentationStyle:'pageSheet'
}
interface FileProps {
  fileSize:number;

}

import DocumentPicker,{pickSingle} from "react-native-document-picker";
const FilePickerOptions = {
  type: [DocumentPicker.types.allFiles],
}
import {PERMISSIONS, request,requestMultiple } from 'react-native-permissions';
import { UploadFile } from '../../includes/functions';
const BaseFilePicker = (props:BaseSelectProps)=> {
 const [value,setValue] = useState<string>("");
 const {ShowMessage} = useHttp();

 const handleFilePicker = async(fileTypes:FileTypes[])=>{
  request(Platform.OS === "android"?
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE:PERMISSIONS.IOS.PHOTO_LIBRARY,
    {
        title: 'File Permission',
        message: 'QNOVA-Pro needs access to your storage to read your file.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
    }
).then((granted)=>{
if(granted === "granted")
{
  pickSingle(FilePickerOptions).then((res)=>{
 console.log(res);
 setValue("");
 if(!res.size)
 {
  props.onChange({status:false,message:res.copyError!,data:{}});
 }else{
 const fileSizeInMB = res.size / (1024 * 1024);
if(fileSizeInMB > props.maxFileSize)
{
  setValue("");
  props.onChange({status:false,message:`File is more than the required size of ${fileSizeInMB}mb.`,data:{}});
}else{
    var splitPath = String(res?.name).split(".");
    var extn = String(splitPath[splitPath.length - 1]).toLowerCase() as FileTypes;
    if(fileTypes.includes(extn))
    {
    setValue(res.name!);
    props.onChange({status:true,message:"",data:res});
    }else{
    ShowMessage("top").fail(`Oops! invalid file format, the following is required (${fileTypes.join(", ")}).`);
    props.onChange({status:false,message:"",data:null});
    }
  }
 }
  })
}
})
 } 
    return (<View style={{flexDirection:'column',marginBottom:10}}>
      <View
      style={[Styles.baseInputWrapper,{height:56,flexDirection:"row"}]}
      >
      <View
        style={{flex:1,flexDirection:"column"}}
        >
     <Text style={[Styles.baseInputLabel,{fontSize:10,marginTop:2}]}>{props.label}</Text>
     <Text
     numberOfLines={1}
        style={[Styles.baseInput,{color:value?COLOURS.black:COLOURS.inActive,paddingRight:16}]}>
          {value?value:"Tap to upload"}
        </Text>
      </View>
      <TouchableOpacity
      onPress={async ()=>{
        if(props.upload)
        {
          return  UploadFile().then((res)=>{
            if(res.status)
            {
              if(Array.isArray(res.data))
              {
              setValue(res.message)
               props.onChange(res);
              }else{
                ShowMessage("top").fail("Data malform");
              }
            }
            })
        }
        await handleFilePicker(props.fileTypes);
      }}
      style={{alignItems:'center',justifyContent:'center'}} >
      {value?<TrashIcon 
      size={20} 
      color='black'
      />:<UploadIcon 
      size={20}
      />}
      </TouchableOpacity>
        </View>
       <Text style={[AppStyles.error,{marginTop:0}]}>{props.errorMessage}</Text>
      </View>
    );
  };
  export default BaseFilePicker;
  interface SelectModalProp {
    show:boolean;
    onClose:()=>void;
    onValue:(data:ItemProps)=>void;
    list?:ItemProps[] | null;
    title?:string;
  }
  
