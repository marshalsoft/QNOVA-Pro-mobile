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
const FormSchema = y.object({
      fullName:y.string().required('full Name is required.'),
      email:y.string().required('A valid email is required.').email('A valid email address is required.').max(20),
      phoneNumber:y.string().max(11,"10 digits id required.").required('Phone number is required.').matches(ValidateNigerianMobile, { message: 'A valid mobile number is required.'}),
      residentialAddress:y.string().required("Residential address is required.'").max(30,"30 characters is required."),
      dateOfBirth:y.string().required("Date of birth is required."),
  });
  interface CorporateInfoFormProp {
    businessName?:string;
    loading?:boolean;
    resetStatus:()=>void;
    onValue:(d:BusinessRegFormProps)=>void;
  }
const PersonalForm = (prop:CorporateInfoFormProp)=>{
    return <View  
    style={{width:DEVICE.width,height:DEVICE.height-235}}>
    <ScrollView 
    style={{width:DEVICE.width}}
    >
    <Formik
    initialValues={{
      fullName:"",
      residentialAddress:"",
      phoneNumber:"",
      email:"",
      dateOfBirth:"",
    }}
    onSubmit={(values:BusinessRegFormProps, actions:any) => {
      prop.onValue(values);
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
        <View style={{flexDirection:"column",padding:30,paddingTop:0}}>
          <Text style={[AppStyles.topSectionSubTitleText]}>Personal Information</Text>
          <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={handleChange("fullName")}
        label="Full Name"
        placeholder="Enter your full name"
        max={50}
        value={values.fullName!}
        errorMessage={errors.fullName}
        />
        </Card>
          <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={handleChange("residentialAddress")}
        label="Residential Address"
        placeholder="Enter residential address"
        max={50}
        value={values.residentialAddress!}
        errorMessage={errors.residentialAddress}
        />
        </Card>
        <Card 
        style={{marginTop:10}}
        >
        <BaseInput
        leadingIcon={<View style={{height:40,width:60,justifyContent:"center",alignItems:"center",borderRightWidth:1,borderRightColor:COLOURS.inActive}}>
          <Text style={{fontSize:16,color:COLOURS.gray64}}>+234</Text>
        </View>}
        type='number-pad'
        onChange={(d)=>{
          setFieldValue("phoneNumber",d);
          if(d.length == 11)
          {
            
          }
        }}
        label='Phone Number'
        placeholder='Phone Number'
        max={11}
        value={values.phoneNumber!}
        errorMessage={errors.phoneNumber}
        
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={handleChange("email")}
        label='Email Address'
        placeholder='Enter email address'
        max={30}
        value={values.email!}
        errorMessage={errors.email}
        />
        </Card>
        <Card 
          style={{marginTop:10,marginBottom:40}}
          >
        <BaseInputDate
        limit={18}
        onChange={(d)=>{
          setFieldValue("dateOfBirth",d);
        }}
        label='Date of Birth'
        placeholder='Select date'
        value={values.dateOfBirth!}
        errorMessage={errors.dateOfBirth}
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
export default PersonalForm;