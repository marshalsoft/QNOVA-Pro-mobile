import React, { RefObject, useRef } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, FONTFAMILY, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import AppStyles from '../../includes/styles';
import CheckedIcon from '../../components/svgs/checkedIcon';
import { useState } from 'react';
import CloseIcon from '../../components/svgs/closeIcon';
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { ReturnBusinessName } from '../../includes/functions';
import BaseSelect from '../../components/baseSelect';
const FormSchema = y.object({
  businessType:y.string().required('Registration type is required.')
});

  const NameVerificationScreen = ({route}:ScreenComponentType) => {
  const {loading,VerifiyBusinessName} = useHttp();
  const thisForm = useRef() as RefObject<FormikProps<FormikValues>>;
  return <AppContainer 
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    title=''
    backgroundColor={COLOURS.defaultWhite}
    >
 <Formik
innerRef={thisForm}
initialValues={{
    businessType:""
}}
onSubmit={(values:FormikValues, actions:any) => {
   navigationRef.current?.navigate(ROUTES.registeredBusiness,{...values,...route?.params});
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column",padding:30}}>
      <TopSection 
      title='Business Registration'
      sub=''
      />
    <View style={{marginTop:-25,marginBottom:10,flexDirection:"row",flexWrap:"wrap"}}>
    <Text style={[AppStyles.blackText,{fontSize:12,fontFamily:FONTFAMILY.MONTSERRAT.normal}]}>Choose the registration that suits your business.</Text>
    <Text style={[AppStyles.blackText,{fontSize:12,fontFamily:FONTFAMILY.MONTSERRAT.bold,marginTop:10}]}>ENTERPRISE/BUSINESS NAME:</Text>
    <Text style={[AppStyles.blackText,{fontSize:12,fontFamily:FONTFAMILY.MONTSERRAT.normal}]}>This type of business registration is most suitable for sole proprietors or small partnerships.</Text> 
    <Text style={[AppStyles.blackText,{fontSize:12,fontFamily:FONTFAMILY.MONTSERRAT.bold,marginTop:10}]}>COMPANY LIMITED BY SHARES: </Text>
    <Text style={[AppStyles.blackText,{fontSize:12,fontFamily:FONTFAMILY.MONTSERRAT.normal}]}>This type of registration is where the liability of the members is limited to their subscription/share in the company.</Text>
    </View>
      <Text style={[AppStyles.topSectionTitleText,{fontFamily:FONTFAMILY.MONTSERRAT.bold,fontSize:16,width:"90%",marginTop:40}]}>Choose the registration type</Text>
      <Card 
      style={{marginTop:10,marginBottom:140}}
      >
    <BaseSelect
    title="Choose Regsitration Type"
    list={[
        {title:"ENTERPRISE/BUSINESS NAME",value:"ENTERPRISE"},
        {title:"LIMITED COMPANY BY SHARES",value:"LIMITED"}
        ]}
        onChange={(d)=>{
        setFieldValue("businessType",d.value);
        }}
        label='Select Registration Type'
        placeholder='Select option'
        type='custom'
        errorMessage={errors.businessType}
    />
    </Card>
    <View style={{width:"100%",flexDirection:"column",marginBottom:50}}>
    <BaseButton 
    loading={loading}
    title='Continue'
    onPress={handleSubmit}
    />
    </View>
</View>)}
</Formik>
</AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(NameVerificationScreen);
  