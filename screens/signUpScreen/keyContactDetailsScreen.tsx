import React, { RefObject, useEffect, useRef } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image, Keyboard } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ItemProps, ScreenComponentType, UserLoginProps } from '../../includes/types';
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
import { ReturnAllNumbers, ReturnBusinessName } from '../../includes/functions';
import BaseSelect, { SelectModal } from '../../components/baseSelect';
import BaseInputDate from '../../components/baseInputDate';
import { FormProps } from './businessDetails';
import { BaseModalLoader } from '../../components/baseLoader';
const FormSchema = y.object({
  bvn:y.string().required('BVN is required.').min(11,'Mimimum of 11 characters is required.'),
  gender:y.string().required('Gender is required.'),
  dob:y.string().required('Date of Birth is required.')
});
export interface FormScreenProp {
  onValues:(formData:FormProps)=>void;
  value:FormProps;
  index?:number;
  onSuccess?:(message:string)=>void;
}
  const KeyContactDetailsScreen = (props:FormScreenProp) => {
  const {loading,VerifyBVN,ShowMessage} = useHttp();
  const [showSuggections,setShowSuggestions] = useState<boolean>(false);
  const [suggestionList,setSuggestionList] = useState<ItemProps[] | null>([]);
  const thisKeyCForm = useRef() as RefObject<FormikProps<FormikValues>>;
  useEffect(()=>{
  if(props.value?.bvn)
  {
    thisKeyCForm.current?.setFieldValue("bvn",props.value?.bvn);
    thisKeyCForm.current?.setFieldValue("verified",true);
    thisKeyCForm.current?.setFieldValue("gender",props.value?.gender);
    thisKeyCForm.current?.setFieldValue("dob",props.value?.dob);
  }
  },[props.value?.bvn])
  const dispatch = useDispatch();
  return <View 
  style={{width:DEVICE.width,height:DEVICE.height - 240}}
  >
    <Formik
    innerRef={thisKeyCForm}
       initialValues={{
         bvn:"",
         verified:false,
         gender:"",
         dob:""
       }}
 onSubmit={(values:FormProps, actions:any) => {
  if(!values.verified)
  {
  VerifyBVN({
    bvn:values.bvn!,
    dob:values.dob!
  }).then((res)=>{
  if(res.data)
  {
    if(props.index && props.onSuccess)
    {
      ShowMessage("top").success(res.message);
      dispatch({type:"update",payload:{isBvnVerified:true}})
      navigationRef.current?.goBack()
      // props.onSuccess(res.message);
    }else{
        props.onValues({
          bvn:values.bvn!,
          dob:values.dob!,
          gender:values.gender!
        })
      }
  }
  })
  }else{
    
  }
 }}
 validationSchema={FormSchema}
 >
 {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
     <View style={{flexDirection:"column",padding:16,paddingHorizontal:24}}>
        <BaseInput 
      type='phone-pad'
      label='BVN'
      placeholder='12345678901'
      max={11}
      onChange={(d)=>{
        setFieldValue("bvn",d);
      }}
      value={ReturnAllNumbers(values.bvn!)}
      errorMessage={touched.bvn && errors.bvn}
      />
      <BaseSelect 
      label='Gender'
      value={values.gender}
      placeholder='Please Select'
      onChange={(d)=>{
        setFieldValue("gender",d.value);
      }}
      list={[
       {title:"Male",value:"male"},
       {title:"Female",value:"female"}
      ]}
      type='custom'
      errorMessage={touched.gender && errors.gender}
      />
      <BaseInputDate 
      label='DOB'
      placeholder='DD/MM/YYYY'
      onChange={(d)=>{
        setFieldValue("dob",d);
      }}
     value={values.dob!}
     limit={16}
      errorMessage={touched.dob && errors.dob}
      />
      <BaseButton 
      style={{marginTop:20}}
     disabled={!isValid}
     onPress={handleSubmit}
     title={values.verified?"Proceed":'Verify your BVN'}
     />
     </View>)}
  </Formik>
  {loading ?<BaseModalLoader modal />:null}
 </View>
}

export default KeyContactDetailsScreen;
  