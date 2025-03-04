import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, Switch } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, NigerianFlag, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import * as y  from 'yup';
const FormSchema = y.object({
    accountType:y.string().required('Account type is required.'),
    accountNumber:y.string().required('Account Number is required.').min(10,'Account Number must be 10 digits.'),
    accountName:y.string().required('Account Name is required.'),
    amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
    narration:y.string().required('Narration is required.')
});
import styled from "styled-components/native";
import { MockInput } from "../walletTransfer/preview";
import BaseInput from "../../../../../components/baseInput";
import BaseSelect from "../../../../../components/baseSelect";
import BaseInputDate from "../../../../../components/baseInputDate";
import BaseButton from "../../../../../components/baseButton";
import BaseFilePicker from "../../../../../components/baseFilePicker";
import BaseSwitch from "../../../../../components/baseSwitch";
import { connect, useDispatch } from "react-redux";
import { CheckIcon } from "../walletTransfer";
import useHttp from "../../../../../includes/http.hooks";
import { navigationRef } from "../../../../../App";
import { Formik, FormikProps, FormikValues } from "formik";
import BaseInputMobile from "../../../../../components/baseInputMobile";
import BaseInnerLoader, { BaseModalLoader } from "../../../../../components/baseLoader";
const EmailSchema = y.object({
  email:y.string().required('Email is required.').email("Must be a valid email address.")
})
type SectionProp = "Business Profile" | "Request Details" | "New Request" | "pin" | "success";
const BusinessProfileScreen = ({route,goBack,onSuccess,Reducer}: ScreenComponentType) => {
   const {GetCurrentUserDetails,loading,UpdateProfile,UploadFiles} = useHttp()
  const [cacCert,setCACCert] = useState<any>();
    const [selected,setSelected] = useState<number>(0)
    const [section,setSection] = useState<SectionProp>("Business Profile");
    const tabs:string[] = [
        "All",
        "Pending",
        "Paid",
        "Expired"
    ];
    const [list,setList] = useState<any[]>([
        {},
        {},
        {},
        {},
        {},
        {}
    ])
const dispatch = useDispatch();

const thisKeyContactForm = useRef<FormikProps<FormikValues>>(null)
const GetUserInfo = ()=>{
  GetCurrentUserDetails().then((res)=>{
    if(res.data)
    {
      dispatch({ type: "update", payload: res.data});
    }
    console.log("BVN:",Reducer?.isBvnVerified)
  })
}
    useEffect(()=>{
      GetUserInfo();
      // alert (JSON.stringify())
    },[])
   const ReturnFlag = (phoneNumber:string,flagOnly = false)=>{
    var mobileNumber = String(phoneNumber).split("").reverse().filter((a,i)=>i < 10).reverse().join("")
    const dailCode = String(phoneNumber).replace(mobileNumber,"");
    const name = "Nigeria"
    // check countrys flag
    return <View 
    style={{flexDirection:"row",marginTop:8,alignItems:"center"}}
    >
   <Image 
    style={{width:25,borderRadius:2,height:18,backgroundColor:COLOURS.gray100}}
    source={{uri:NigerianFlag}}
    />
    <Text style={{marginLeft:10,color:COLOURS.black,fontSize:14,fontFamily:FONTFAMILY.INTER.normal}}>{flagOnly?name:`+${dailCode+mobileNumber}`}</Text>
    </View>
   }
     return <AppContainer
    showNavBar
    white
    goBack={()=>{
        if(section === "Business Profile")
        {
            if(goBack)
            {
            goBack();
            }
        }else{
            setSection("Business Profile")
        }
    }}
    title={section}
    footer={section === "Business Profile" ?<TouchableOpacity 
        onPress={()=>{
            if(goBack)
            {
            goBack();
            }
        }}
      style={{position:"absolute",bottom:50,right:20}}
      >
        <Image 
        source={require("../../../../../images/menubtn.png")}
        style={{width:84,height:84}}
        resizeMode='contain'
        />
      </TouchableOpacity>:<></>}
    >

{section === "Business Profile"?<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{flexDirection:"row",height:50,padding:4,backgroundColor:"#7B7F991A",borderRadius:16}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 1?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 1?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Key Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(2)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 2?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 2?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Documents</Text>
            </TouchableOpacity>
</View>
{loading && <View 
style={{marginTop:10}}
>
  <BaseInnerLoader text="Please wait while we fetching your business data..."/>
  </View>
  }
{selected === 0?<View style={{flexDirection:"column",gap:10,marginTop:20,height:DEVICE.height - 230}}>
<ScrollView 
nestedScrollEnabled
showsVerticalScrollIndicator={false}
>
{Reducer?.businessProfile.map((a,i)=><View 
key={i} 
style={{flexDirection:"column",gap:10}} >
<MockInput 
     label="CAC Number"
     value={""}
     component={<View style={{flexDirection:"row",alignItems:"center"}}>
      <Text style={{marginRight:4,fontFamily:FONTFAMILY.INTER.normal,color:"rgba(123, 127, 153, 0.50)"}}>RC</Text>
      <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:"#000"}}>{a.regNumber}</Text>
      </View>}
    />
      <MockInput 
     label="Business Name"
     value={a.companyName!}
    />
      <MockInput 
     label="Operating Address"
     value={a.headOfficeAddress!}
    />
    {/* <View style={{flexDirection:"row",alignItems:"center",marginBottom:10}}>
      <View style={{flex:1,justifyContent:"flex-start"}}>
        <Text1 style={{textAlign:"left",color:COLOURS.black,fontFamily:FONTFAMILY.INTER.normal}}>Same as Registered Address</Text1>
      </View>
      <BaseSwitch
    onValueChange={()=>{}}
    value={false}
    />
    </View> */}
    <MockInput 
     label="Country Of Registration"
     value={a.country!}
    />
   <MockInput 
     label="Type of Company"
     value={a.companyType!}
    />
<MockInput 
     label="Company Email"
     value={a.companyEmail!}
/>
<MockInput 
     label="Company verified"
     value={a.isRVerified?"Yes":"No"}
/>
<MockInput 
     label="No. of Employees"
     value={a.numberOfEmployees!}
/>
</View>)}

</ScrollView>
</View>:null}
{selected === 1?<View style={{flexDirection:"column",marginTop:20}}>
<MockInput 
 label="BVN"
 value={"xxxxxxxxxxx"}
 component={Reducer?.isBvnVerified?<View style={{flexDirection:"row",alignItems:"center",gap:10}}>
  <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.INTER.normal}}>Verified</Text>
  <CheckIcon />
 </View>:<View style={{flexDirection:"row",alignItems:"center",gap:10}}>
  <BaseButton 
  style={{width:120,padding:0,height:30}}
  title="Verify now"
  onPress={()=>navigationRef.current?.navigate(ROUTES.businessDetails,{index:1})}
  />
  </View>}
/>
<MockInput 
 label="Gender"
 value={"Male"}
 component={<View style={{flexDirection:"row",alignItems:"center",gap:10}}>
  <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.INTER.normal}}>{Reducer?.gender}</Text>
  <CheckIcon />
 </View>}
/>
  <MockInput 
 label="Date Of Birth"
 value={Reducer?.dateOfBirth!}
 component={<View style={{flexDirection:"row",alignItems:"center",gap:10}}>
  <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.INTER.normal}}>{Reducer?.dateOfBirth}</Text>
  <CheckIcon />
 </View>}
/>
<MockInput 
  label="Full Name"
  value={""}
  component={<View style={{flexDirection:"row",alignItems:"center",gap:10}}>
  <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.INTER.normal}}>{Reducer?.firstName} {Reducer?.lastName}</Text>
  <CheckIcon />
 </View>}
/>
<Formik
   initialValues={{
      email: Reducer?.email,
      phone:Reducer?.phone,
      dialCode:""
   }}
   innerRef={thisKeyContactForm}
   onSubmit={(values:any, actions:any) => {
    const data = values;
    delete data.dailCode;
    if(values.phone === "")
    {
      thisKeyContactForm.current?.setFieldError("phone","Phone number is required");
      return ;
    }
    if(values.dialCode !== "")
    {
      data.phone = values.dialCode+parseInt(values.phone);
    }
      UpdateProfile(values)
   }}
   validationSchema={EmailSchema} 
   >
   {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View  style={{flexDirection:"column"}}>
{Reducer?.phone?<MockInput 
     label="Phone Number"
     value={Reducer?.phone}
     component={<View style={{flexDirection:"row",alignItems:"center",gap:5}}>
      {ReturnFlag(Reducer.phone)}
      <CheckIcon />
      </View>}
    />:<BaseInputMobile 
    onCode={(code)=>{
      setFieldValue("dialCode",code)
    }}
    value={values.phone}
    onValueChange={(d)=>{
     setFieldValue("phone",d)
    }}
    errorMessage={touched.phone && errors.phone}
    />}
  {Reducer?.email?<MockInput 
  label="Email Address"
  value={Reducer?.email!}
/>:<BaseInput
    autoCapitalize='none'
     label="Email address"
     placeholder="Enter your email."
     value={values.email}
     onChange={(d)=>{
      setFieldValue("email",d)
     }}
     max={120}
     errorMessage={touched.email && errors.email}
    />}
<BaseButton
style={{marginTop:20}}
onPress={handleSubmit}
title="Save Changes"
/>
</View>)}
</Formik>
</View>
:null}
{selected === 2?<View style={{flexDirection:"column",gap:10,marginTop:20}}>
{Reducer?.selectedBusiness?.documents?.length == 0 ?<BaseFilePicker
     label="CAC Certificate"
     fileTypes={["png","pdf"]}
     onChange={(d)=>{
      if(d.data)
      setCACCert({
        uri: String(d?.data.uri),
        name:String(d?.data.name),
        type:String(d?.data.type),
      })
     }}
     maxFileSize={5}
    />:Reducer?.selectedBusiness?.documents?.map((a,i)=><View >
    <MockInput 
    label={i == 0?"Logo":"CAC Certificate"}
    value={a.fileName}
    />
    </View>)}
{Reducer?.selectedBusiness?.documents?.length == 0 ?<BaseButton
style={{marginTop:20}}
onPress={()=>{
  // alert (JSON.stringify(cacCert))
  // return;

  UploadFiles({
    cac_certificate:cacCert,
    profileId:Reducer?.selectedBusiness?.regNumber
  })
}}
title="Save Changes"
/>:null}
</View>:null}
</View>:null}
{loading && <BaseModalLoader modal />}
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(BusinessProfileScreen);

