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
  directorEmail:y.string().required('A valid email address is required.').email('A valid email address is required.').max(20),
  directorPhoneNumber:y.string().max(11,"10 digits id required.").required('Phone number is required.').matches(ValidateNigerianMobile, { message: 'A valid mobile number is required.'}),
  directorName:y.string().required("Director's name is required.'").max(30,"30 characters is required."),
  directorGender:y.string().required("Director's gender is required.'"),
  directorDateOfBirth:y.string().required("Director's Date of birth is required."),
  directorResidentialAddress:y.string().required("Director' address is required.").max(50,"50 characters is required."),
  directorGovtId:y.string().required("Director's ID is required."),
  directorSignature:y.string().required("Director's signature is required."),
  });
  interface CorporateInfoFormProp {
    businessName:string;
    loading?:boolean;
    resetStatus:()=>void;
    onValue:(d:BusinessRegFormProps)=>void;
  }
const ShareHolderForm = (prop:CorporateInfoFormProp)=>{
   const {ShowMessage} = useHttp();
  return <View  
    style={{width:DEVICE.width,height:DEVICE.height-235}}>
    <ScrollView 
    style={{width:DEVICE.width}}
    >
    <Formik
    initialValues={{
      directorName:"",
      directorGender:"",
      directorDateOfBirth:"",
      directorResidentialAddress:"",
      directorEmail:"",
      directorPhoneNumber:"",
      directorGovtId:"",
      directorSignature:"",
    }}
    onSubmit={(values:BusinessRegFormProps, actions:any) => {
      prop.onValue(values);
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
        <View style={{flexDirection:"column",padding:30,paddingTop:0}}>
          <Text style={[AppStyles.topSectionSubTitleText]}>Shareholder Information</Text>
          <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={handleChange("directorName")}
        label="Shareholder's Name"
        placeholder="Enter shareholder's name"
        max={50}
        value={values.directorName!}
        errorMessage={errors.directorName}
        />
        </Card>
          <Card 
          style={{marginTop:10}}
          >
        <BaseSelect
        type="custom"
        list={[
          {title:"Male",value:"male"},
          {title:"Female",value:"female"}
        ]}
        onChange={(d)=>{
          setFieldValue("directorGender",d.title);
        }}
        label='Gender'
        placeholder='Select option'
        errorMessage={errors.directorGender}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInputDate
        limit={18}
        onChange={(d)=>{
          setFieldValue("directorDateOfBirth",d);
        }}
        label='Date of Birth'
        placeholder='Select date'
        value={values.directorDateOfBirth!}
        errorMessage={errors.directorDateOfBirth}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        type="default"
        onChange={handleChange("directorResidentialAddress")}
        label='Residential Address'
        placeholder='Enter residential address'
        max={30}
        value={values.directorResidentialAddress!}
        errorMessage={errors.directorResidentialAddress}
        />
        </Card>
        <Card 
          style={{marginTop:10}}
          >
        <BaseInput
        autoCapitalize='none'
        onChange={handleChange("directorEmail")}
        label='Email Address'
        placeholder='Enter email address'
        max={30}
        value={values.directorEmail!}
        errorMessage={errors.directorEmail}
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
          setFieldValue("directorPhoneNumber",d);
          if(d.length == 11)
          {
            
          }
        }}
        label='Phone Number'
        placeholder='Phone Number'
        max={11}
        value={values.directorPhoneNumber!}
        errorMessage={errors.directorPhoneNumber}
        
        />
        </Card>
        <Card 
        style={{marginTop:10}}
        >
        <BaseInput
        type='number-pad'
        onChange={(d)=>{
          if(parseInt(d) > 100)
          {
            setFieldValue("directorPhoneNumber","");
            return ShowMessage("bottom").fail("1% - 100% is required.");
          }
          setFieldValue("directorPhoneNumber",d);
          if(d.length == 11)
          {
            
          }
        }}
        label='Amount of Ownership (%)'
        placeholder='Enter amount of ownership'
        max={3}
        value={values.directorPhoneNumber!}
        errorMessage={errors.directorPhoneNumber}
        
        />
        </Card>
        <Card 
        style={{marginTop:10}}
        >
        <BaseFilePicker
        maxFileSize={5}
        fileTypes={[]}
        onChange={(d)=>{
          if(d.data)
            {
          setFieldValue("directorGovtId",d.data.path);
            }
        }}
        label='Govt Issued ID'
        errorMessage={errors.directorGovtId}
        />
        </Card>
        <Card 
        style={{marginTop:10,marginBottom:40}}
        >
        <BaseFilePicker
        maxFileSize={5}
        fileTypes={[]}
        onChange={(d)=>{
          if(d.data)
            {
          setFieldValue("directorSignature",d.data.path);
            }
        }}
        label='Signature'
        errorMessage={errors.directorSignature}
        
        />
        </Card>
        <View style={{marginBottom:30,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <View >
          <PlusIcon
          size={18}
          />
          </View>
          <TouchableOpacity style={{flex:1,paddingLeft:10}}>
            <Text style={{color:COLOURS.purple,fontSize:14,fontFamily:FONTFAMILY.Baloo.medium}}>ADD ANOTHER SHAREHOLDER</Text>
          </TouchableOpacity>
        </View>
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
export default ShareHolderForm;

