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
const FormSchema = y.object({
    corporateEmail:y.string().required('A valid email address is required.').email('A valid email address is required.').max(50),
    phoneNumber:y.string().max(11,"10 digits id required.").required('Phone number is required.').matches(ValidateNigerianMobile, { message: 'A valid mobile number is required.'}),
    natureOfBusiness:y.string().required('Nature of business is required.').max(30,"Maximum characters required is 30."),
    amountOfShareCapital:y.string().required('Share Capital is required.').max(10,"Maximum characters required is 30."),
  });
  interface CorporateInfoFormProp {
    businessName:string;
    loading?:boolean;
    resetStatus:()=>void;
    onValue:(d:BusinessRegFormProps)=>void;
  }
const CorporateInfoForm = (prop:CorporateInfoFormProp)=>{
    return <View  
    style={{width:DEVICE.width,height:DEVICE.height-235}}>
    <ScrollView 
    style={{width:DEVICE.width}}
    >
    <Formik
    initialValues={{
      businessName:prop.businessName,
      natureOfBusiness:"",
      amountOfShareCapital:"",
      corporateEmail:"",
      phoneNumber:"",
    }}
    onSubmit={(values:BusinessRegFormProps, actions:any) => {
     prop.onValue(values);
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
        <View style={{flexDirection:"column",padding:30,paddingTop:0}}>
          <Text style={[AppStyles.topSectionSubTitleText]}>Corporate Information</Text>
          <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        disabled
        autoCapitalize='none'
        onChange={handleChange("businessName")}
        label='Proposed Business Name'
        placeholder='Enter Proposed Business Name'
        max={50}
        value={prop.businessName}
        triallingIcon={<BlockedIcon size={12} />}
        />
        </Card>
          <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={(d)=>{
          setFieldValue("businessAddress",d);
        }}
        
        label='Business Address'
        placeholder='Enter your business address'
        max={30}
        value={values.businessAddress!}
        errorMessage={errors.businessAddress}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={(d)=>{
          setFieldValue("natureOfBusiness",d);
        }}
        label='Nature of Business'
        placeholder='Tell us the nature  of your business'
        max={30}
        value={values.natureOfBusiness!}
        errorMessage={errors.natureOfBusiness}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        type="number-pad"
        onChange={(d)=>{
          setFieldValue("amountOfShareCapital",d);
        }}
        
        label='Amount of Share Capital'
        placeholder='Enter the amount of share capital'
        max={10}
        value={ReturnAllNumbers(values.amountOfShareCapital!)}
        errorMessage={errors.amountOfShareCapital}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        type="email-address"
        onChange={(d)=>{
          setFieldValue("corporateEmail",d);
        }}
        
        label='Corporate Email Address'
        placeholder='Enter corporate email address'
        max={30}
        value={values.corporateEmail!}
        errorMessage={errors.corporateEmail}
        />
        </Card>
        <Card 
        style={{marginTop:10,marginBottom:40}}
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
export default CorporateInfoForm;