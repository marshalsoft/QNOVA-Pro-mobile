import { DeviceEventEmitter, Text, View } from "react-native";
import { COLOURS, FONTFAMILY, LISTENERS, passwordRules } from "../../includes/constants";
import { CreatePINComponent } from "./createPINScreen";
import { FormProps } from "./businessDetails";
import BaseInput from "../../components/baseInput";
import BaseButton from "../../components/baseButton";
interface CreateNewPINComponentProp {
    onClose:()=>void;
    formData:FormProps;
    onValue:(d:string)=>void;
    loading:boolean;
}
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
const FormSchema = y.object({
    confirmPassword:y.string().oneOf([y.ref('password')], 'Passwords must match'),
    password:y.string().required('New password is required.').required('A strong password is required').matches(passwordRules, { message: 'Please create a stronger password.'})
});
const CreateNewPasswordComponent = (prop:CreateNewPINComponentProp)=>{
    return <View style={{width:"100%",left:0,height:"100%",position:"absolute",zIndex:9999,backgroundColor:COLOURS.defaultWhite,flexDirection:"column"}}>
    <Formik 
    initialValues={{
      password:"",
      confirmPassword:""
    }}
    onSubmit={(values:FormikValues, actions:any) => {
      prop.onValue(values.confirmPassword);
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{flexDirection:"column",paddingTop:16}}>
   <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Create your password</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:50}}>Enter your password and confirm password. </Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{padding:16,paddingHorizontal:24,flexDirection:"column"}} >
     <BaseInput 
  type="visible-password"
 label="Password"
 placeholder="Qwerty$123"
 value={values.password}
 onChange={(data)=>{
    setFieldValue("password",data)
 }}
 max={30}
 errorMessage={touched.password && errors.password}
 />
    <BaseInput 
  type="visible-password"
 label="Confirm Password"
 placeholder="**********"
 value={values.confirmPassword}
 onChange={(data)=>{
    setFieldValue("confirmPassword",data)
 }}
 max={30}
 errorMessage={touched.confirmPassword && errors.confirmPassword}
 />
 <BaseButton 
 disabled={!isValid}
title="Proceed"
onPress={handleSubmit}
 />
 </View>
  </View>)}
  </Formik>
  </View>
}
export default CreateNewPasswordComponent;