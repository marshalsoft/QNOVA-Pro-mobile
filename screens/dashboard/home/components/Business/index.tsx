import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { COLOURS, FONTFAMILY } from "../../../../../includes/constants";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { BusinessProfileProps, ItemProps } from "../../../../../includes/types";
import BaseButton from "../../../../../components/baseButton";
import useHttp from "../../../../../includes/http.hooks";
import BaseInnerLoader from "../../../../../components/baseLoader";
import { useDispatch } from "react-redux";
interface BusinessListProps {
    onClose:()=>void;
    onValue:(data:string)=>void;
    list:BusinessProfileProps[];
    selectedBusiness:BusinessProfileProps
}
const BusinessList = (prop:BusinessListProps)=>{
    const [selectedBusinesses,setSelectedBusinesses] = useState<ItemProps | null>(null);
    const [listOfBusinesses,setListOfBusinesses] = useState<BusinessProfileProps[]>([])
    const {GetBusinesses,loading} = useHttp();
    const handleGoBack = ()=>{
    prop.onClose();
    return true;
  }
  useEffect(()=>{
    if(prop.list.length !== 0)
    {
        setListOfBusinesses(prop.list);
    }else{

    }
  },[prop.list])
    useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",handleGoBack)
   return ()=>{
    BackHandler.removeEventListener("hardwareBackPress",handleGoBack)
   }
},[])
const dispatch = useDispatch()
    return <View 
    style={{...StyleSheet.absoluteFillObject,backgroundColor:COLOURS.modalBackground,flexDirection:"column"}}
    >
     <TouchableOpacity 
     onPress={()=>{
        prop.onClose();
     }}
     style={{flex:1}} />
    <Card >
        <Text1 style={{paddingVertical:20}}>Businesses</Text1>
        <Divider />
        {loading?<View style={{flexDirection:"column",alignItems:"center",marginVertical:20,
            paddingTop: 0,
            paddingBottom:20,
            paddingLeft:20,
            paddingRight:20,
        }}>
         <BaseInnerLoader
        text="Fetching businesses"
        />
        </View>:<View style={{flexDirection:"column",gap:30,marginVertical:20,
            paddingTop: 0,
            paddingBottom:20,
            paddingLeft:20,
            paddingRight:20
        }}>
        {listOfBusinesses.map((item,index)=><View key={index}
        style={{flexDirection:"row",alignItems:"center",gap:10}}
        >
            <CheckBox 
            style={{borderWidth:prop.selectedBusiness === item?6:1,borderColor:prop.selectedBusiness === item?"#FFCD3D":"rgba(123, 127, 153, 0.50)"}}
            onPress={()=>{
            dispatch({type:"update",payload:{selectedBusiness:item}})
            }}
            />
            <Image 
            source={{uri:item.companyLogo}}
            style={{width:48,height:48,borderRadius:48,backgroundColor:"#D9D9D9"}} />
            <View style={{flex:1}}>
              <Text2 >{item.companyName}</Text2>
            </View>
        </View>)}
        <BaseButton 
        onPress={()=>{
        if(selectedBusinesses === null)
        {
            prop.onClose()
        }else{
            prop.onValue(selectedBusinesses.title!);
        }
        }}
        title={selectedBusinesses === null?"Cancel":"Add Business"}
        />
        </View>}
    </Card>
    </View>
}
export default BusinessList;
const CheckBox = styled.TouchableOpacity`
border:1px solid rgba(123, 127, 153, 0.50);
width: 24px;
height: 24px;
border-radius: 24px;
`
export const Divider = styled.View`
height:1px;
background-color:rgba(123, 127, 153, 0.10);
width:100%;
`;
const Card = styled.View`
border-radius:20px 20px 0px 0px;
flex-direction: column;
min-height:200px;
background-color:white;
width:100%;
`;

const Text1 = styled.Text`
color: #000;
text-align: center;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 20px;
font-style: normal;
font-weight: 600;
`;
const Text2 = styled.Text`
color: #000;
font-family: ${FONTFAMILY.INTER.normal};
font-size: 16px;
font-style: normal;
font-weight:500;
`;