import React, { RefObject, useEffect, useRef } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image, Keyboard, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { ItemProps, ScreenComponentType, UserDataModel, UserLoginProps } from '../../includes/types';
import { getUniqueId, getManufacturer,getBundleId } from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import AppStyles from '../../includes/styles';
import CheckedIcon from '../../components/svgs/checkedIcon';
import { useState } from 'react';
import CloseIcon from '../../components/svgs/closeIcon';
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { ReturnBusinessName } from '../../includes/functions';
import { SelectModal } from '../../components/baseSelect';
import { FormProps } from './businessDetails';
import BaseFilePicker from '../../components/baseFilePicker';
import { BaseModalLoader } from '../../components/baseLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FormSchema = y.object({
  logo:y.string().required('Logo is required.'),
  cacCertificate:y.string().required('CAC certificate is required.')
});
export interface FormScreenProp {
  onValues:(formData:FormProps)=>void;
  value:FormProps;
  Reducer:UserDataModel;
  route?:any;
  onSuccess?:(message:string)=>void;
}
export interface FileProps {
  uri: string;
  fileName:string;
  type:string;
}
  const UploadDocumentScreen = (props:FormScreenProp) => {
    const [loading,setLoading] = useState<boolean>(false)
  const {UploadFiles,ShowMessage,CreateAccount} = useHttp();
  const [logoProps,setLogoProps] = useState<FileProps>({
    uri:"",
    fileName:"",
    type:""
  });
  const [cacCertificateProps,setCacCertificateProps] = useState<FileProps>({
    uri:"",
    fileName:"",
    type:""
  });
    useEffect(()=>{
      if(props.value?.logo)
      {
        // thisDocForm.current?.setFieldValue("logo",props.value?.logo);
        // thisDocForm.current?.setFieldValue("cacCertificate",props.value?.cacCertificate);
      }
      },[props.value?.logo])

     
  return <View 
  style={{width:DEVICE.width,height:DEVICE.height - 240,flexDirection:"column"}}
  >
   <View style={{flexDirection:"column",padding:16,paddingHorizontal:24}}>
    <BaseFilePicker
    maxFileSize={2}
     fileTypes={["png","jpeg","jpg"]}
    label='Logo (PNG, 2mb max)'
    placeholder='Tap to upload'
    onChange={(d)=>{
      if(d.data)
      {
        setLogoProps({
          uri: String(d?.data.uri),
          fileName:String(d?.data.name),
          type:String(d?.data.type),  
        });
      }
    }}
    errorMessage={""}
    />
    <BaseFilePicker
    fileTypes={["png","jpeg","jpg"]}
    maxFileSize={2}
    label='CAC Certificate  (PDF, 2mb max)'
    placeholder='Tap to upload'
    onChange={(d)=>{
      if(d.data)
        {
      setCacCertificateProps({
        uri: String(d?.data.uri),
        fileName:String(d?.data.name),
        type:String(d?.data.type),  
      });
        }
    }}
    errorMessage={""}
    />
    <BaseButton 
     onPress={()=>{
      if(logoProps.uri == "")
      {
       return ShowMessage("top").fail("Logo is reqiured")
      }
      if(cacCertificateProps.uri == "")
        {
         return ShowMessage("top").fail("CAC certificate is reqiured")
        }
        setLoading(true)
        UploadFiles({
          logo:logoProps,
          cac_certificate:cacCertificateProps,
          profileId:props.value.cacNumber!
        }).then((res)=>{
          setLoading(false);
          if(res.status === "success" && res.statusCode == 200)
          {
            DeviceEventEmitter.emit(LISTENERS.createAccountForms,{
              formData:props.value,
              createAccountFormList:{
                BusinessDetails:{status:"valid"},
                KeyContactDetails:{status:"valid"},
                UploadDocuments:{status:"valid"}
            }});
            if(props.onSuccess)
              {
              props.onSuccess(res.message)
              }
          }else{
            setLoading(false)
          }
        })
     }}
     title={"Proceed"}
     />
     </View>
     {loading && <BaseModalLoader 
     modal
     />}
 </View>
}

export default UploadDocumentScreen;
  