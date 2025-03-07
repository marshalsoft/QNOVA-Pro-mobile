import React, { RefObject, useEffect, useRef } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { ItemProps, ScreenComponentType, UserDataModel, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from '../../includes/constants';
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
const FormSchema = y.object({
  logo:y.string().required('Logo is required.'),
  cacCertificate:y.string().required('CAC certificate is required.')
});
export interface FormScreenProp {
  onValues:(formData:FormProps)=>void;
  value:FormProps;
  Reducer:UserDataModel;
}
interface FileProps {
  uri: string;
  name: string;
  type: string;
  error?: string;
}
  const UploadDocumentScreen = (props:FormScreenProp) => {
  const {UploadFiles,loading,ShowMessage} = useHttp();
  const [logoProps,setLogoProps] = useState<FileProps>({
    uri:"",
    name:"",
    type:""
  });
  const [cacCertificateProps,setCacCertificateProps] = useState<FileProps>({
    uri:"",
    name:"",
    type:""
  });
  const thisDocForm = useRef() as RefObject<FormikProps<FormikValues>>;
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
          name:String(d?.data.name),
          type:String(d?.data.type),  
        });
      }
    }}
    errorMessage={logoProps.error}
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
        name:String(d?.data.name),
        type:String(d?.data.type),  
      });
        }
    }}
    errorMessage={cacCertificateProps.error}
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
        UploadFiles({
          logo:logoProps,
          cac_certificate:cacCertificateProps,
          profileId:props.value.cacNumber
        }).then((res)=>{
          if(res.data)
          {
            props.onValues({
              logo:logoProps.name,
              cacCertificate:cacCertificateProps.name,
            })
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
  