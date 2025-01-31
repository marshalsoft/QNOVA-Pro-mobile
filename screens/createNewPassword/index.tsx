/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ForgotPasswordProps, ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';

const FormSchema = y.object({
  password:y.string().required('New password is required.').required('A strong password is required').matches(passwordRules, { message: 'Please create a stronger password.'}),
  confirmPassword:y.string().oneOf([y.ref('password')], 'Passwords must match')
});

  const CreateNewUserPaswordScreen = ({route}:ScreenComponentType) => {
  const {UserCreateNewPassword,loading} = useHttp();
    return <AppContainer
    showNavBar
    goBack={()=>navigationRef.current?.goBack()}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
    <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Create New Password</Text>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Please provide your new password.</Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    </View>
    <Formik
    initialValues={{
      password:"",
      confirmPassword:""
    }}
    onSubmit={(values:any, actions:any) => {
    UserCreateNewPassword({
      password:String(values.password).trim(),
      confirmPassword:String(values.confirmPassword).trim()
    });
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
        <View style={{flexDirection:"column",padding:30}}>
        <BaseInput 
        label='Password'
        placeholder="Enter new password"
        max={80}
        onChange={(d)=>setFieldValue("password",String(d).trim())}
        value={values.password}
        errorMessage={touched.password && errors.password}
        />
         <BaseInput 
        label='Confirm Password'
        placeholder="Confirm your password"
        max={80}
        onChange={(d)=>setFieldValue("confirmPassword",String(d).trim())}
        value={values.confirmPassword}
        errorMessage={touched.confirmPassword && errors.confirmPassword}
        />
        <BaseButton 
        disabled={!isValid}
        loading={loading}
        title="Submit"
        onPress={handleSubmit}
        />
        </View>)}
    </Formik>
    </View>
    </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(CreateNewUserPaswordScreen);
  