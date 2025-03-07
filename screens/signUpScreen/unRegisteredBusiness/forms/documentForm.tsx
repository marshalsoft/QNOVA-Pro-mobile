import React from "react";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile } from "../../../../includes/constants";
import { navigationRef } from "../../../../App";
import BaseButton from "../../../../components/baseButton";
import { BusinessRegFormProps, SignUpFormProps } from "../../../../includes/types";
import AppStyles from "../../../../includes/styles";
import Card from "../../../../components/card";
import BaseInput from "../../../../components/baseInput";
import BlockedIcon from "../../../../components/svgs/blockedIcon";
import BaseSelect from "../../../../components/baseSelect";
import BaseInputDate from "../../../../components/baseInputDate";
import BaseFilePicker from "../../../../components/baseFilePicker";
import ArrowRight from "../../../../components/svgs/arrowRight";
import useHttp from "../../../../includes/http.hooks";
import PlusIcon from "../../../../components/svgs/plusIcon";
const FormSchema = y.object({
      businessLogoFile:y.string().required('Logo is required.'),
      businessCACFile:y.string().required('CAC upload is required.'),
      businessProofOfAddressFile:y.string().required("Proof of address is required."),
      businessProofOfIdFile:y.string().required("Proof of ID is required."),
  });
  interface CorporateInfoFormProp {
    businessName?:string;
    loading?:boolean;
    resetStatus:()=>void;
    onValue:(d:BusinessRegFormProps)=>void;
  }
const DocumentForm = (prop:CorporateInfoFormProp)=>{
   const {ShowMessage} = useHttp();
  return <View  
    style={{width:DEVICE.width,height:DEVICE.height-235}}>
    <ScrollView 
    style={{width:DEVICE.width}}
    >
    <Formik
    initialValues={{
      businessLogoFile:"",
      businessCACFile:"",
      businessProofOfAddressFile:"",
      businessProofOfIdFile:"",
    }}
    onSubmit={(values:BusinessRegFormProps, actions:any) => {
      prop.onValue(values);
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
        <View style={{flexDirection:"column",padding:30,paddingTop:0}}>
          <Text style={[AppStyles.topSectionSubTitleText]}>Document Uploads</Text>
          <Card 
          style={{marginTop:10}}
          >
        <BaseFilePicker
        maxFileSize={2}
        fileTypes={[]}
        onChange={(d)=>{
          if(d.data)
            {
          setFieldValue("businessLogoFile",d.data.path);
            }
        }}
        label='Business logo'
        errorMessage={errors.businessLogoFile}
        
        />
        </Card>
          <Card 
          style={{marginTop:10}}
          >
         <BaseFilePicker
         maxFileSize={2}
         fileTypes={[]}
        onChange={(d)=>{
          if(d.data)
            {
          setFieldValue("businessCACFile",d.data.path);
            }
        }}
        label='CAC Document'
        errorMessage={errors.businessCACFile}
        
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseFilePicker
        maxFileSize={2}
        fileTypes={[]}
        onChange={(d)=>{
          if(d.data)
            {
          setFieldValue("businessProofOfAddressFile",d.data.path);
            }
        }}
        label='Proof of Business Address (Utility bill, etc.)'
        errorMessage={errors.businessProofOfAddressFile}
        
        />
        </Card>
        <Card 
          style={{marginTop:10,marginBottom:40}}
          >
        <BaseFilePicker
        maxFileSize={2}
        fileTypes={[]}
        onChange={(d)=>{
          if(d.data)
            {
          setFieldValue("businessProofOfIdFile",d.data.path);
            }
        }}
        label='Proof of Identity (NIN slip, Intl. passport, etc)'
        errorMessage={errors.businessProofOfIdFile}
        
        />
        </Card>
        
        <BaseButton 
        disabled={!isValid}
        loading={prop.loading}
        onPress={handleSubmit}
        title=""
        >
          <Text style={[AppStyles.whiteText,{fontFamily:FONTFAMILY.Baloo.bold,marginRight:5}]}>Next</Text>
         <ArrowRight size={20} color={COLOURS.white} /> 
        </BaseButton>
        </View>)}
    </Formik>
    </ScrollView>
    </View>
}
export default DocumentForm;

