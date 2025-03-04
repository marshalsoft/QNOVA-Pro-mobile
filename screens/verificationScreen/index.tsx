import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useState } from "react";
import AppContainer from "../../components/appContainer";
import AppStyles from "../../includes/styles";
import BaseInput from "../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import CaretDownIcon from "../../components/svgs/caretDown";
import BaseButton from "../../components/baseButton";
import { ReturnMobile } from "../../includes/functions";
import BaseInputMobile from "../../components/baseInputMobile";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import { BaseModalLoader } from "../../components/baseLoader";
import { usePushNotificationHook } from "../../includes/pushNotification";
const FormSchemaEmail = y.object({
    email:y.string().required('Please enter your email address.').email('A valid email address is required.').max(100)
});
const FormSchemaPhoneNumber = y.object({
    phoneNumber:y.string().min(10,"10 digits is required.").required('Phone number is required.')//.matches(ValidateNigerianMobile2, { message: 'A valid mobile number is required.'})
});
const VerificationScreen = ({ }: ScreenComponentType) => {
    const [selected,setSelected] = useState<number>(0)
    const [flag,setFlag] = useState<string>("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAMFBMVEUBh1L///8FilUAiEwqf1gCiE/l5eXv/fgIjVgAhVAAjFAug1z9/P0Fi1LZ6eLv//ciup9sAAABuklEQVR4nO3SyXECARAEweUS7AH4761ALlRoXlkedEYvj/NIz21//Qz12rfnzKrHcl7W5f9bb5f9fhrqvV9uA5s+cOchvuV2ud6PGb3jfh3kG9H745vRO52m+JYVXwlfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpfCl8KXwpf6su3jPh9+Y4ZvePLN+G3LlN86+2yj73v/eEbGfXBe5xHem7762eo1749Z1Y9fgF2nG32nRewWgAAAABJRU5ErkJggg==");
    const [otp,setCode] = useState<string>("+234");
    const {} = usePushNotificationHook();
   const {VerifyMobileNumber,VerifyEmail,loading} = useHttp()
    return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.reset({
            index:0,
            routes:[
                {name:ROUTES.introScreen}
            ]
        })
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView 
    keyboardShouldPersistTaps="always"
    >
    <View style={{flexDirection:"column",paddingHorizontal:16}}>
    <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>Let's get started</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:14,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,width:"80%"}}>Please provide your phone number or email address.</Text>
      <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
        <View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Phone number</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Email Address</Text>
            </TouchableOpacity>
        </View>
        {selected === 0?<Formik
    initialValues={{
      phoneNumber:"",
      code:"" 
    }}
    onSubmit={(values:FormikValues, actions:any) => {
    VerifyMobileNumber(values.code+parseInt(values.phoneNumber)).then((res)=>{
      if(res.errorCode === "USER_ALREADY_EXISTS" || res.message.includes("cannot"))
    {
        navigationRef.current?.reset({
            index:0,
            routes:[{
                name:ROUTES.loginScreen
            }]
            })  
    }else if(res.data)
    {
        navigationRef.current?.navigate(ROUTES.otpScreen,{
        type: "phone",
        phone:values.code+parseInt(values.phoneNumber)
        })
    }
    });
    }}
    validationSchema={FormSchemaPhoneNumber}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",marginTop:16}} >
        <BaseInputMobile
        placeholder="801 234 5678"
        onValueChange={(d)=>{
          setFieldValue("phoneNumber",d);
        }}
        onCode={(code)=>{
            setFieldValue("code",code);
        }}
        label='Phone   Number'
        value={ReturnMobile(values.phoneNumber!)}
        errorMessage={touched.phoneNumber && errors.phoneNumber}
        />
        <BaseButton 
        title="Continue"
        onPress={handleSubmit}
        />
    </View>)}
    </Formik>:<Formik 
    initialValues={{
      email:""
    }}
    onSubmit={(values:FormikValues, actions:any) => {
        VerifyEmail(String(values.email).trim()).then((res)=>{
           if(res.data)
           {
            navigationRef.current?.navigate(ROUTES.otpScreen,{
                type: "email",
                email:String(values.email).toLowerCase().trim()
          });
        }
    });
      
    }}
    validationSchema={FormSchemaEmail}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",marginTop:16}} >
        <BaseInput
        autoCapitalize="none"
        value={values.email}
        type='email-address'
        onChange={(d)=>{
          setFieldValue("email",d);
        }}
        label='Email address'
        placeholder='Email address'
        max={50}
        errorMessage={touched.email && errors.email}
        />
        <BaseButton
        title="Continue"
        onPress={handleSubmit}
        />
    </View>)}
    </Formik>}
       <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center',paddingHorizontal:20,flexWrap:"wrap",marginVertical:20}} >
        <Text style={{fontSize:12,color:COLOURS.gray64,fontFamily:FONTFAMILY.INTER.normal}}>By tapping “Continue, you agree to QNOVA PRO's </Text>
        <TouchableOpacity 
        onPress={()=>navigationRef.current?.navigate(ROUTES.policyScreen)}
        >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>Terms & Conditions</Text> 
        </TouchableOpacity> 
        <Text  style={{fontSize:12,color:COLOURS.gray64,fontFamily:FONTFAMILY.INTER.normal}}> and </Text>  
        <TouchableOpacity 
                onPress={()=>navigationRef.current?.navigate(ROUTES.policyScreen)}
                >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>Privacy Policy</Text>  
        </TouchableOpacity>
       </View>
       <TouchableOpacity
        style={{alignSelf:"center",marginVertical:20}} 
        onPress={()=>navigationRef.current?.navigate(ROUTES.loginScreen)}
         >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>Already have an account?</Text>  
     </TouchableOpacity>
     </View>
     </ScrollView>
     </View>
     {loading && <BaseModalLoader />}
    </AppContainer>
}
export default VerificationScreen;

const Style = StyleSheet.create({
    dot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:COLOURS.gray64
    }
})