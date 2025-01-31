
import React from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, FONTFAMILY, ROUTES, ValidateNigerianMobile } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import { usePushNotificationHook } from '../../includes/pushNotification';

const FormSchema = y.object({
  phoneNumber:y.string().max(11,"10 digits id required.").required('Phone number is required.').matches(ValidateNigerianMobile, { message: 'A valid mobile number is required.'})
});
  const MobileNumberScreen = ({route}:ScreenComponentType) => {
  const {UserLogin,loading} = useHttp();
 
    return <AppContainer 
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    backgroundColor={COLOURS.defaultWhite}
    >
<Formik
initialValues={{
  phoneNumber:"",
}}
onSubmit={(values:FormikValues, actions:any) => {
// UserLogin(values);
navigationRef.current?.navigate(ROUTES.verifyMobileIndividualAccount,values);
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",padding:30}}>
      <TopSection 
      title='Enter Your Phone Number'
      sub='For enhanced security, verify phone number'
      />
      <Card 
      style={{marginTop:40,marginBottom:120,paddingBottom:0}}
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
     placeholder='XXXX XXXX XXX'
     max={11}
     value={values.phoneNumber!}
     errorMessage={errors.phoneNumber}
     />
    </Card>
    <BaseButton 
    loading={loading}
    title='Continue'
    onPress={handleSubmit}
    />
    </View>)}
    </Formik>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(MobileNumberScreen);
  