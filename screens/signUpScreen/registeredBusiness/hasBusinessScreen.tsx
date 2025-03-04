import { Image, Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ScreenComponentType } from "../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { useEffect, useRef, useState } from "react";
import AppContainer from "../../../components/appContainer";
import AppStyles from "../../../includes/styles";
import BaseInput from "../../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import CaretDownIcon from "../../../components/svgs/caretDown";
import BaseButton from "../../../components/baseButton";
import { ReturnMobile } from "../../../includes/functions";
import BaseInputMobile from "../../../components/baseInputMobile";
import useHttp from "../../../includes/http.hooks";
import { navigationRef } from "../../../App";
const FormSchemaEmail = y.object({
    email:y.string().required('A valid email is required.').email('A valid email address is required.').max(20)
});

interface FormsProp {
   cacNo?:string;
   businessAddress?:string;
   businessName?:string;
   employees?:string;
   country?:string;
   type?:string;
   category?:string;
   bvn?:string;
   gender?:string;
   dob?:string;
   phoneNumber?:string;
   email?:string;
   logo?:string;
   cacCertificate?:string;
   pin?:string;
   selected?:boolean;
}
const HasBusinessScreen = ({}: ScreenComponentType) => {
    const [selectedForm,setSelectedForm] = useState<FormsProp[]>([
        {
         selected:true   
        },
        {
            selected:true   
        },
        {
            selected:true   
        },
        {
            selected:false   
        },
    ])
    const [formValues,setFormValues] = useState<FormsProp>({
        cacNo:"",
        businessAddress:"",
        businessName:"",
        employees:"",
        country:"",
        type:"",
        category:"",
        bvn:"",
        gender:"",
        dob:"",
        phoneNumber:"",
        email:"",
        logo:"",
        cacCertificate:"",
        pin:"",
        selected:false 
    })
    const {loading} = useHttp();
    return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.goBack()
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Business details</Text>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Please insert your body copy here. </Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{height:1,flexDirection:"row"}}>
        {selectedForm.map((a,i)=><View key={i} style={{backgroundColor:a.selected?COLOURS.purple:"transparent",flex:1}} />)}
    </View>
    <ScrollView 
    horizontal
    style={{width:DEVICE.width,height:DEVICE.height - 270}}
    >
    <FormOne 
    handleForm={(d:FormsProp)=>{
        setFormValues({...formValues,...d})
    }}
    values={formValues!}
    />
     <FormTwo 
    handleForm={(d:FormsProp)=>{
        setFormValues({...formValues,...d})
    }}
    values={formValues!}
    />
     <FormThree
    handleForm={(d:FormsProp)=>{
        setFormValues({...formValues,...d})
    }}
    values={formValues!}
    />
    </ScrollView>
     </View>
     </View>
    </AppContainer>
}
export default HasBusinessScreen;

const Style = StyleSheet.create({
    dot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:COLOURS.gray64
    }
})
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import BaseInputDate from "../../../components/baseInputDate";
import BaseSelect from "../../../components/baseSelect";
import BaseFilePicker from "../../../components/baseFilePicker";


const FormOne = ({handleForm,values}:{handleForm:(data:FormsProp)=>void;values:FormsProp})=>{
    const [selected,setSelected] = useState<string>("")
    return <View
    style={{width:DEVICE.width,height:DEVICE.height - 270}}
    >
    <ScrollView >
     <View
    style={{width:DEVICE.width,padding:15,paddingBottom:50}}
    >
   <BaseInput 
   label="CAC Number"
   onChange={(d)=>{
    handleForm({cacNo:d})
   }}
   value={values.cacNo!}
   max={10}
   placeholder="Enter CAC number"
   />
    <BaseInput 
   label="Business name"
   placeholder="Enter business name"
   onChange={(d)=>{
    handleForm({businessName:d})
   }}
   value={values.businessName!}
   max={10}
   />
    <BaseInput 
   label="Business Address"
   placeholder="Enter business address"
   onChange={(d)=>{
    handleForm({businessAddress:d})
   }}
   value={values.businessAddress!}
   max={10}
   />
    <BaseInput 
   label="Country of Registration"
   placeholder="Enter country"
   onChange={(d)=>{
    handleForm({country:d})
   }}
   value={values.country!}
   max={10}
   />
    <BaseInput 
   label="Type of Business"
   onChange={(d)=>{
    handleForm({type:d})
   }}
   value={values.type!}
   max={10}
   />
       <BaseInput 
   label="Business of category"
   onChange={(d)=>{
    handleForm({category:d})
   }}
   value={values.category!}
   max={10}
   />
   <BaseInput 
   label="Number of Employees"
   onChange={(d)=>{
    handleForm({employees:d})
   }}
   value={values.employees!}
   max={10}
   />
   <BaseButton 
   onPress={()=>{}}
   title="Continue"
   />
   </View>  
   </ScrollView> 
     </View>
}
const FormTwo = ({handleForm,values}:{handleForm:(data:FormsProp)=>void;values:FormsProp})=>{
    const [selected,setSelected] = useState<string>("")
    return <View
    style={{width:DEVICE.width,height:DEVICE.height - 270}}
    >
    <ScrollView >
     <View
    style={{width:DEVICE.width,padding:15,paddingBottom:50}}
    >
   <BaseInput 
   label="BVN"
   onChange={(d)=>{
    handleForm({bvn:d})
   }}
   value={values.bvn!}
   max={11}
   />
    <BaseSelect
    type="custom"
    placeholder="Select your gender"
    list={[
        {title:"Male"},
        {title:"Female"}
    ]} 
   label="Gender"
   onChange={(d)=>{
    handleForm({gender:d.title})
   }}
   />
 <BaseInputDate 
   label="DOB"
   onChange={(d)=>{
    handleForm({dob:d})
   }}
   value={values.dob!}
   limit={18}
   />
    
   <BaseButton 
   onPress={()=>{}}
   title="Continue"
   />
   </View>  
   </ScrollView> 
     </View>
}

const FormThree = ({handleForm,values}:{handleForm:(data:FormsProp)=>void;values:FormsProp})=>{
    const [selected,setSelected] = useState<string>("")
    return <View
    style={{width:DEVICE.width,height:DEVICE.height - 270}}
    >
    <ScrollView >
     <View
    style={{width:DEVICE.width,padding:15,paddingBottom:50}}
    >
   <BaseFilePicker
        onChange={(d)=>{
            if(d.data)
           {
          handleForm({gender:d.data.path})
          }
        }}
        label='Signature'
        errorMessage={""}
        maxFileSize={5}
      fileTypes={[]}
    />
     <BaseFilePicker
      maxFileSize={5}
      fileTypes={[]}
        onChange={(d)=>{
            if(d.data)
                {
          handleForm({gender:d.data.path})
                }
        }}
        label='Signature'
        errorMessage={false}
       
    />
   <BaseButton 
   onPress={()=>{
    navigationRef.current?.navigate(ROUTES.createPINScreen)
   }}
   title="Continue"
   />
   </View>  
   </ScrollView> 
     </View>
}
