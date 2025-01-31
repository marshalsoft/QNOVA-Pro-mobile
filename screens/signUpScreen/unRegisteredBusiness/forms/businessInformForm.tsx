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
import ArrowRight from "../../../../components/svgs/arrowRight";
import { ReturnAllNumbers } from "../../../../includes/functions";
import BaseSelect from "../../../../components/baseSelect";
import BaseInputDate from "../../../../components/baseInputDate";
const FormSchema = y.object({
      businessName:y.string().required('Business name is required.').max(50),
      cac:y.string().required('CAC is required.').max(20),
      businessType:y.string().required('Type of business is required.'),
      businessCategory:y.string().required('Category of business is required.'),
      timeIn:y.string().required('Clock-in is required.'),
      timeOut:y.string().required('Clock-out is required.')
  });
  interface BusinessInfoFormProp {
    businessName?:string;
    loading?:boolean;
    resetStatus:()=>void;
    onValue:(d:BusinessRegFormProps)=>void;
  }
const BusinessInfoForm = (prop:BusinessInfoFormProp)=>{
    return <View  
    style={{width:DEVICE.width,height:DEVICE.height-235}}>
    <ScrollView 
    style={{width:DEVICE.width}}
    >
    <Formik
    initialValues={{
      businessName:"",
      cac:"",
      businessType:"",
      businessCategory:"",
      timeIn:"",
      timeOut:"",
    }}
    onSubmit={(values:BusinessRegFormProps, actions:any) => {
     prop.onValue(values);
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
        <View style={{flexDirection:"column",padding:30,paddingTop:0}}>
          <Text style={[AppStyles.topSectionSubTitleText]}>Business Information</Text>
          <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={handleChange("businessName")}
        label='Business Name'
        placeholder='Enter Business Name'
        max={50}
        value={""}
        />
        </Card>
          <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={(d)=>{
          setFieldValue("cac",d);
        }}
        
        label='CAC Number'
        placeholder='Enter your CAC Number '
        max={20}
        value={values.cac!}
        errorMessage={errors.cac}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={(d)=>{
          setFieldValue("businessType",d);
        }}
        label='Type of Business'
        placeholder='Enter the type of business'
        max={30}
        value={values.businessType!}
        errorMessage={errors.businessType}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseSelect
        onChange={(d)=>{
          setFieldValue("businessCategory",d);
        }}
        list={[

        ]}
        type="custom"
        label='Category'
        placeholder='Select your business category'
        errorMessage={errors.businessCategory}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <View style={{flexDirection:"row"}}>
        <View style={{flex:1}}>
        <BaseInputDate
        type="time"
        onChange={(d)=>{
          setFieldValue("timeIn",d);
        }}
        limit={18}
        label='Clock-in time'
        placeholder='Select time'
        value={values.timeIn!}
        errorMessage={errors.timeIn}
        />
        </View>
        <View style={{flex:1}}>
        <BaseInputDate
        type="time"
        onChange={(d)=>{
          setFieldValue("timeOut",d);
        }}
        limit={18}
        label='Clock-out time'
        placeholder='Select time'
        value={values.timeOut!}
        errorMessage={errors.timeOut}
        />
        </View>
        </View>
        </Card>
        
        <BaseButton 
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
export default BusinessInfoForm;