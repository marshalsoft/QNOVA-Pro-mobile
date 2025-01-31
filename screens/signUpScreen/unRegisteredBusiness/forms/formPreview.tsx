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
import AppContainer from "../../../../components/appContainer";
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
const FormPreviewScreen = (prop:CorporateInfoFormProp)=>{
    return <AppContainer 
    disableScrol
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    title={<Text style={[AppStyles.topSectionSubTitleText]}>Review  Details</Text>}
    backgroundColor={COLOURS.defaultWhite}
    >
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:10,width:"80%",alignSelf:"center",height:50}}>
      </View>
    </AppContainer>
}
export default FormPreviewScreen;