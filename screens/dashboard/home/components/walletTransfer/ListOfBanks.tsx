import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, FONTFAMILY } from '../../../../../includes/constants'
import BaseInnerLoader from '../../../../../components/baseLoader'
import { CheckIcon } from '.'
export interface ListOfBanksComponentProps {
onValue:(listOfBanks:BankProp[])=>void;
list:BankProp[];
loading?:boolean;
}
export interface BankProp {
    bank_code:string;
    bankCode:string;
    accountNumber?:string;
    bankName:string;
    bank_name:string;
    country:string;
    logo_svg:string;
    logo_url:string;
    selected?:boolean;
    name?:string;
}
type ItemProps = {item: BankProp;index:number};

const ListOfBanksComponent = (props:ListOfBanksComponentProps) => {
    const _Item = ({item,index}:ItemProps)=>{
    return <TouchableOpacity
        activeOpacity={0.3}
        onPress={()=>{
         const list = props.list.map((a,i)=>{
            if(a.bankCode === item.bankCode)
            {
            a.selected = !a.selected;
            }
            return a;
         });
        props.onValue(list); 
        }} 
        key={index} 
        style={Styles.smallcard}>
             <View style={{flexDirection:"column",flex:1}}>
         <View style={{flex:1,alignItems:"flex-start",justifyContent:"center",paddingBottom:5}}>
            <Image 
            source={{uri:item.logo_url}}
            style={{width:40,height:40,backgroundColor:"#ddd"}}
            resizeMode='contain'
            />
            <View style={{width:20,borderColor:item.selected?COLOURS.purple:"rgba(0,0,0,0.05)",borderRadius:20,height:20,borderWidth:2,position:"absolute",top:5,right:5,justifyContent:"center",alignItems:"center"}}>
            {item.selected && <CheckIcon />}
            </View>
         </View>   
         <Text numberOfLines={2} style={{color:COLOURS.black,fontSize:11,fontFamily:FONTFAMILY.INTER.normal,fontWeight:"600",lineHeight:13.5}}>{item.bankName}</Text>
        </View> 
         </TouchableOpacity>
    }
    return (<View style={{flexDirection:"column"}}>
        <View style={{flexDirection:"row",marginVertical:20}}>
        <Text style={{fontSize:12,fontFamily:FONTFAMILY.INTER.normal,fontWeight:"bold",color:COLOURS.black}}>Banks</Text>
        </View>
        {props.loading?<View style={{flexDirection:"row",marginBottom:10}}>
        <BaseInnerLoader text='Fetching banks...'/>
    </View>:null}
    <FlatList
    horizontal
    style={{gap:10,flexDirection:"row",marginBottom:20}}
    data={props.list}
    renderItem={_Item}
    />
    </View>
    )
}

export default ListOfBanksComponent;

const Styles = StyleSheet.create({
    smallcard:{
        width:100,
        height:84,
        borderRadius:8,
        backgroundColor:COLOURS.white,
        padding:8,
        marginHorizontal:5
    }
})