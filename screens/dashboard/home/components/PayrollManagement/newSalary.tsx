import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler, Share, Switch, Linking, Alert, ActivityIndicator } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppStyles from "../../../../../includes/styles";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import BaseSelect from "../../../../../components/baseSelect";
import BaseButton from "../../../../../components/baseButton";
import { CopyText, FileExplorer, ReturnAllNumbers, ReturnComma, SaveStaffTemplateFile, SaveTemplateFile } from "../../../../../includes/functions";
const FormSchema = y.object({
  payrollName: y.string().required('Payroll name is required.'),
  payrollFrequency:y.string().required('Payroll frequency is required.'),
  dayOfMonth:y.string().required('Day of the month is required.'),
  timeOfDay:y.string().required('Time of the day is required.'),
  beneficiaries:y.string().required('Beneficiaries is required')
 });
import styled from "styled-components/native";
import { SearchIcon } from "../userStaffManagement";
import ShareIcon from "../../../../../components/svgs/shareIcon";
import { CallIcon, CopyIcon, WhatAppIcon } from "../../../../signUpScreen/unRegisteredBusiness";
import useHttp from "../../../../../includes/http.hooks";
import { DownloadIcon } from "../BulkTransfer/editBeneficiaryDetails";
import BaseFilePicker from "../../../../../components/baseFilePicker";
import moment from "moment";
const NewSalaryComponent = ({route,goBack,onSuccess}: ScreenComponentType) => {
const handleBack = ()=>{
    if(goBack)
    {
    goBack();
    }
    return true;
}
const thisForm = useRef<FormikProps<FormikValues>>(null);
const [building,setBuilding] = useState<boolean>(false)
const {ShowMessage} = useHttp();
    useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",handleBack);
    return ()=>{
    BackHandler.removeEventListener("hardwareBackPress",handleBack);
    }
    },[])
const dayList:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
return <Formik
innerRef={thisForm}
initialValues={{
    payrollName: "",
    payrollFrequency: "",
    dayOfMonth: "",
    timeOfDay: "", 
    beneficiaries: null 
}}
onSubmit={(values:any, actions:any) => {
  // if(values.beneficiaries === null)
  // {
  // thisForm.current?.setFieldError("beneficiaries","")
  // return ShowMessage("top").fail(`Please upload template.`)
  // }
  const data = {
    ...values,
    beneficiaries:JSON.parse(values.beneficiaries).map((a:any,i:number)=>{
      return {
        ...a,
        amount:JSON.parse(a.amount)
      }
    })
  }
  delete data.dayOfMonthValue;
  if(onSuccess)
   {
    onSuccess({data:data})
   }
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{paddingHorizontal:16,flexDirection:"column"}}>
<Text style={{fontSize:14,marginBottom:30,color:"rgba(123, 127, 153, 1)",textAlign:"center",width:"85%",alignSelf:"center"}}>Efficient Payroll Management at Your Fingertips</Text>
<BaseInput
label="Payrol Name"
placeholder="Enter payrol name"
max={50}
onChange={(d)=>{
setFieldValue("payrollName",d);
}}
value={values.payrollName}
errorMessage={touched.payrollName && errors.payrollName}
/>
<BaseSelect 
style={{marginTop:-5}}
 label="Payroll Frequency"
 placeholder="Please Select"
 list={[
  {title:"Weekly",value:"weekly"},
  {title:"Monthly",value:"monthly"}
 ]}
 onChange={(data)=>{
    setFieldValue("payrollFrequency",data.value)
 }}
 type="custom"
 errorMessage={touched.payrollFrequency && errors.payrollFrequency}
 />
  <BaseSelect 
style={{marginTop:-5}}
 label="Day Of Month"
 placeholder="Please Select"
 list={Array.from({length:31}).map((a,i)=>{
  return {title:`${i+1}`,value:`${i+1}`}
 })}
 onChange={(data)=>{
    setFieldValue("dayOfMonth",data.value);
 }}
 type="custom"
 errorMessage={touched.dayOfMonth && errors.dayOfMonth}
 />
 <BaseSelect 
style={{marginTop:-5}}
 label="Time Of Day"
 placeholder="Please Select"
 list={Array.from({length:24}).map((a,i)=>{
  const paddedNumbers = String(i+1).padStart(2, '0');
  const mins = parseInt(paddedNumbers) < 12?paddedNumbers +":00 PM":String(parseInt(paddedNumbers) % 12).padStart(2, '0').replace("00","12")+":00 AM";
  return {title:mins,value:mins}
 })}
 onChange={(data)=>{
    setFieldValue("timeOfDay",data.value)
 }}
 type="custom"
 errorMessage={touched.timeOfDay && errors.timeOfDay}
 />
 <BaseButton 
 title=""
 onPress={()=>{
  setBuilding(true);
  SaveStaffTemplateFile('staff_template').then((path)=>{
  setTimeout(()=>{
  setBuilding(false);
  ShowMessage("top").success("`QNova-Pro-staff-template.csv file saved to download folder.")
},1000)
  })
  
 }}
 style={{marginBottom:10}}
 >
<View style={{flex:1,flexDirection:"row",gap:5,alignItems:"center",justifyContent:"center"}}>
    {building ?<ActivityIndicator color={"white"} size={"small"}/>:<DownloadIcon />}
    <Text style={{color:COLOURS.white}}>Download Staff List Template</Text>
</View>
 </BaseButton>
 <Text style={[AppStyles.subTitle,{fontSize:12,alignSelf:"center",marginVertical:10}]}>or</Text>

  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10,marginHorizontal:20,marginBottom:20}} >
    <TouchableOpacity 
    onPress={()=>{
      Linking.openURL("mailto:")
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1,gap:5}}
    >
      <Envelope />
      <Text style={[AppStyles.subTitle,{fontSize:12}]}>Email</Text>
    </TouchableOpacity>
    <TouchableOpacity 
     onPress={()=>{
      Linking.openURL(`whatsapp://send?phone=080383839393&text=Hi there!`);
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1,gap:5}}
    >
      <WhatAppIcon />
      <Text style={[AppStyles.subTitle,{fontSize:12}]}>WhatsApp</Text>
    </TouchableOpacity>
    <TouchableOpacity 
     onPress={()=>{
      CopyText("080839399393")
      ShowMessage("top").success(`Text copied`);
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1,gap:5}}
    >
      <CopyIcon />
      <Text style={[AppStyles.subTitle,{fontSize:12}]}>Copy</Text>
    </TouchableOpacity>
    <TouchableOpacity 
     onPress={()=>{
      Share.share({message:"slslslsl"})
    }}
    style={{flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1,gap:5}}
    >
      <ShareIcon size={25} color={COLOURS.purple} />
      <Text style={[AppStyles.subTitle,{fontSize:14}]}>Share</Text>
    </TouchableOpacity>
   </View>
   <BaseFilePicker
   upload
   label="Staff List (.csv, 2mb max)" 
   fileTypes={["csv"]}
   maxFileSize={2}
   onChange={(d)=>{
    if(!Object.keys(d.data[0]).includes("staffId"))
    {
      return ShowMessage("top").fail("staffId is missing.")
    }

    if(!Object.keys(d.data[0]).includes("amount"))
      {
        return ShowMessage("top").fail("amount is missing.")
      }
      setFieldValue("beneficiaries",JSON.stringify(d.data));
   }}
   errorMessage={touched.beneficiaries && errors.beneficiaries}
   />
   <BaseButton
   title="Continue"
   onPress={handleSubmit}
  />
</View>
</View>)}
 </Formik>
}
export default NewSalaryComponent;
const SearchContainer = styled.View`
height: 56px;
align-items: center;
flex: 1 0 0;
border-radius: 12px;
background: #FFF;`

const Text1 = styled.Text`
color: rgba(123, 127, 153, 0.50);
text-align: center;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 12px;
font-style: normal;
font-weight: 600;
`;
export const ItemView = styled.TouchableOpacity`
border-radius: 12px;
background: #FFF;
display: flex;
height: 72px;
padding: 16px 12px;
justify-content: space-between;
align-items: center;
flex-direction:row;
`;

const Envelope = ()=>{
 return (
    <Svg
      width={19}
      height={16}
      viewBox="0 0 19 16"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.304 4.353C.024 6.956.036 9.958.426 12.55a3.138 3.138 0 002.832 2.66l1.51.131c3.149.274 6.316.274 9.465 0l1.51-.13a3.138 3.138 0 002.832-2.66c.39-2.593.402-5.595.122-8.198a30.68 30.68 0 00-.122-.904A3.138 3.138 0 0015.742.79l-1.51-.13a54.646 54.646 0 00-9.465 0l-1.51.13A3.138 3.138 0 00.426 3.45c-.045.301-.086.603-.122.904zm4.594-2.2a53.146 53.146 0 019.205 0l1.51.131c.755.066 1.366.64 1.478 1.389l.034.233-5.56 3.09a4.25 4.25 0 01-4.129 0l-5.56-3.09c.01-.078.022-.156.034-.233a1.638 1.638 0 011.478-1.389l1.51-.131zm12.41 3.367a29.099 29.099 0 01-.217 6.807 1.638 1.638 0 01-1.478 1.389l-1.51.131a53.152 53.152 0 01-9.205 0l-1.51-.131a1.638 1.638 0 01-1.478-1.389 29.1 29.1 0 01-.218-6.807l5.016 2.787a5.75 5.75 0 005.585 0l5.016-2.787z"
        fill="#8B1D41"
      />
    </Svg>
  )
}
