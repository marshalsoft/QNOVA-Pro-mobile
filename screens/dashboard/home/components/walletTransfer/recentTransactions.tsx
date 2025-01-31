import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, FONTFAMILY } from '../../../../../includes/constants'
import BaseInnerLoader from '../../../../../components/baseLoader'
import { BeneficiariesProp, CheckIcon, RecentTransactionsProp } from '.'

export interface RecentTransactionsComponentProps {
onValue:(listOfBeneficiaries:BeneficiariesProp[])=>void;
list:BeneficiariesProp[];
loading?:boolean;
selectedTab?:"Wallet"|"Bank"
}
type ItemProps = {item: BeneficiariesProp;index:number};
const RecentTransactionsComponent = (props:RecentTransactionsComponentProps) => {
    
    const _Item = ({item,index}:ItemProps)=>{
        return <TouchableOpacity
            activeOpacity={0.3}
            onPress={()=>{
             const list = props.list.map((a,i)=>{
                if(i === index)
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
             <View style={{alignItems:"flex-start",flex:1,justifyContent:"center",paddingBottom:5}}>
                {props.selectedTab !== "Wallet"?<Image 
                source={{uri:item?.meta?.bank.logo_url}}
                style={{
                    width: 18.125,
                    height: 20,
                    backgroundColor:"#ddd"
                }}
                resizeMode='cover'
                />:
                <Image 
                source={require("../../../../../images/logo_1x.png")}
                style={{
                    width: 18.125,
                    height: 20,
                    backgroundColor:"#ddd"
                }}
                resizeMode='cover'
                />}
                <View style={{width:20,borderColor:item.selected?COLOURS.purple:"rgba(0,0,0,0.05)",borderRadius:20,height:20,borderWidth:2,position:"absolute",top:0,right:0,justifyContent:"center",alignItems:"center"}}>
                {item.selected && <CheckIcon />}
                </View>
             </View>   
             <Text numberOfLines={1} style={{color:COLOURS.black,fontSize:11,fontFamily:FONTFAMILY.INTER.normal,fontWeight:"600",lineHeight:13.5}}>{props.selectedTab === "Wallet"?item?.meta?.accountName:item?.meta?.bank?.name}</Text>
            </View> 
             </TouchableOpacity>
        }
        return (<View style={{flexDirection:"column"}}>
            <Text style={{fontSize:12,marginTop:20,fontFamily:FONTFAMILY.INTER.normal,fontWeight:"bold",color:COLOURS.black}}>Recent Beneficiaries</Text>
            {props.loading?<View style={{flexDirection:"row",marginBottom:10}}>
            <BaseInnerLoader text='Fetching banks...'/>
        </View>:null}
        <FlatList
        horizontal
        style={{flexDirection:"row",marginBottom:20}}
        data={props.list}
        renderItem={_Item}
        />
        </View>
        )
}

export default RecentTransactionsComponent;

const Styles = StyleSheet.create({
    smallcard:{
        width:100,
        height:84,
        borderRadius:8,
        backgroundColor:COLOURS.white,
        marginHorizontal:5,
        marginVertical:5,
        padding:10
    }
})