import { ScrollView,Image, StyleSheet, Text, View } from "react-native";
import { FormProps } from "./businessDetails"
import { COLOURS, FONTFAMILY, NigerianFlag } from "../../includes/constants";
import { MockInput } from "../dashboard/home/components/walletTransfer/preview";
import BaseButton from "../../components/baseButton";
import { useEffect } from "react";
interface ConfirmDetailsScreenProps {
data:FormProps;
Submit:()=>void;
}
const ConfirmDetailsScreen = ({data,Submit}:ConfirmDetailsScreenProps) => {
const GetFileName = (filePath:string)=>{
    const path = String(filePath).split("/");
    const name = path[path.length - 1];
    return name
}
return <View style={{width:"100%",height:"100%",position:"absolute",zIndex:999,backgroundColor:COLOURS.white}}>
     <View style={{flexDirection:"column"}}>
      <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium,paddingTop:16,paddingHorizontal:24}}>Confirm Details</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:24}}>Please review the information below to ensure everything is correct. Accurate details help us keep your account secure and provide a better experience</Text>
  <View style={{height:2,backgroundColor:COLOURS.purple}} />
  <ScrollView 
  
  >
  <View style={{flexDirection:"column",padding:16,paddingHorizontal:36}}>
   <Text style={{color:COLOURS.purple,fontSize:14,fontFamily:FONTFAMILY.INTER.medium,marginBottom:36}}>Business Details</Text>
    <MockInput 
     label="CAC Number"
     value={data.cacNumber!}
     component={<View style={{flexDirection:"row",alignItems:"center"}}>
      <Text style={{marginRight:4,fontFamily:FONTFAMILY.INTER.normal,color:"rgba(123, 127, 153, 0.50)"}}>RC</Text>
      <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:"#000"}}>{data.cacNumber!}</Text>
      </View>}
    />
      <MockInput 
     label="Business Name"
     value={data.companyName!}
    />
    <MockInput 
     label="Country"
     value={"Nigeria"}
     component={<View 
     style={{flexDirection:"row",marginTop:8,alignItems:"center"}}
     >
    <Image 
    style={{width:25,borderRadius:2,height:18,backgroundColor:COLOURS.gray100}}
    source={{uri:NigerianFlag}}
    />
    <Text style={{marginLeft:10,color:COLOURS.black,fontSize:14,fontFamily:FONTFAMILY.INTER.normal}}>Nigeria</Text>
     </View>}
    />
    <MockInput 
     label="City"
     value={data.city!}
    />
      <MockInput 
     label="Type of business"
     value={data.companyType!}
    />
   <Text style={{color:COLOURS.purple,fontSize:14,fontFamily:FONTFAMILY.INTER.medium,marginBottom:36}}>Key Contact Details</Text>
      <MockInput 
     label="BVN"
     value={data.bvn!}
    />
      <MockInput 
     label="Gender"
     value={data.gender!}
    />
      <MockInput 
     label="Date of birth"
     value={data.dob!}
    />
     <Text style={{color:COLOURS.purple,fontSize:14,fontFamily:FONTFAMILY.INTER.medium,marginBottom:36}}>Upload Documents</Text>
      <MockInput 
     label="Logo"
     value={GetFileName(data.logo!)}
    />
      <MockInput 
     label="CAC Certificate"
     value={GetFileName(data.cacCertificate!)}
    />
     <BaseButton
     onPress={Submit}
     title={"Proceed"}
     style={{marginTop:20}}
     />
     <View style={{height:240}} />
  </View>
  </ScrollView>
  </View>
</View>
}
export default ConfirmDetailsScreen;
