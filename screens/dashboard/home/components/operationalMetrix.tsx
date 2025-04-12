import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ScreenComponentType } from '../../../../includes/types';
import AppContainer from '../../../../components/appContainer';
import AppStyles from '../../../../includes/styles';
import { ReactNode, useState } from 'react';
import { COLOURS, DEVICE, FONTFAMILY } from '../../../../includes/constants';
import LinearGradient from 'react-native-linear-gradient';
import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
export const OperationalMetrixComponets = ()=>{
    const [list,setWallets] = useState<string[]>([
        ""
      ])
      const data = {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      };
      const chartConfig:AbstractChartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1,index = 0) => {
          console.log(index);
          return index / 2 === 0?`#DEAD00`:`#8B1D41`
        },
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.7,
        useShadowColorFromDataset: false // optional
      };
    return  <View  style={{flexDirection:"column"}}>
      <View  style={{flexDirection:"row"}}>
   <View style={{flex:1}}>
  <Text style={{color:"rgba(255,255,255,0.5)",fontSize:14,fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:16}}>Operational Metrics</Text>
  </View>
  <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end"}}>
    <ExclamationIcon />
  <Text style={{color:"rgba(255,255,255,0.5)",fontSize:12,marginLeft:5,paddingRight:20,fontFamily:FONTFAMILY.INTER.normal,textAlign:"right"}}>No data available yet</Text>
  </View>
  </View>
  <ScrollView 
    horizontal
    pagingEnabled
    >
<View style={{padding:16,flexDirection:"row",gap:20}}>
{list.map((item,index)=><View key={index}  
style={{width:DEVICE.width-32,justifyContent:"center",alignItems:"center"}} >
<LinearGradient 
colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
width:DEVICE.width - 35,
height:260,
borderRadius:8,
borderColor:"rgba(255, 255, 255, 0.25)",
borderWidth:1,
justifyContent:"center",
alignItems:"center",
flexDirection:"row",
paddingHorizontal:16,
paddingVertical:8,
position:"absolute",
left:0,
top:0
}}
/>
<View 
style={{
padding:8,
paddingHorizontal:12
}}
>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
}}
>
<View style={{flex:1}}>
<Text style={{color:"rgba(255,255,255,1)",fontSize:12,fontFamily:FONTFAMILY.INTER.normal}}>Cash Flow</Text>
</View>
<TouchableOpacity style={{width:121}}>
<LinearGradient 
colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0)']} style={{
width:121,
height:32,
borderRadius:20,
borderColor:"rgba(255, 255, 255, 0.25)",
borderWidth:1,
justifyContent:"center",
alignItems:"center",
flexDirection:"row",
paddingHorizontal:12
}}
> 
<Text style={{color:"rgba(255,255,255,1)",flex:1,fontSize:12,fontFamily:FONTFAMILY.INTER.normal,}}>This Month</Text>
<ArrowDown />
</LinearGradient>
</TouchableOpacity>
</View>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:25,
height:140
}}
>
<BarChart
  style={{
    width:DEVICE.width - 60
  }}
  data={data}
  width={DEVICE.width - 60}
  height={160}
  yAxisLabel=""
  yAxisSuffix='k'
  chartConfig={chartConfig}
  verticalLabelRotation={0}
  withInnerLines={false}

/>
</View>
<View 
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:25,
gap:10
}}
>
{["Income","Expenses"].map((a,i)=><View style={{flexDirection:"row",alignItems:"center",gap:10}}>
<View key={i} style={{width:8,height:8,borderRadius:8,backgroundColor:i === 0?"rgba(222, 173, 0, 1)":"rgba(139, 29, 65, 1)"}}></View>
<Text style={{color:"white",fontWeight:"700",fontSize:10,fontFamily:FONTFAMILY.INTER.normal,marginRight:16}}>{a}</Text>
</View>
)}
</View>
</View>
</View>)}
</View>
</ScrollView>
</View>
}

  const Styles = StyleSheet.create({
    avatar:{
      backgroundColor: "rgba(217, 217, 217, 1)",
      borderRadius:36,
      width:36,
      height:36,
      borderColor:"rgba(80, 80, 80, 1)",
      borderWidth:1,
      position:"absolute",
      top:6
    },
    card:{
      flexDirection:"column",
      width:DEVICE.width - 50,
      height:260,
    }
   })

  export const ArrowDown = ()=> {
    return (
      <Svg
        width={11}
        height={6}
        viewBox="0 0 11 6"
        fill="none"
      >
        <Path
          d="M1.5 1l4 4 4-4"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }


export const ExclamationIcon=()=>{
  return (
    <Svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
    >
      <Path
        d="M9.5 12.333h.007M9.5 5.666v4.167m8.334-.834A8.333 8.333 0 101.167 9a8.333 8.333 0 0016.667 0z"
        stroke="#FFCD3D"
        strokeOpacity={0.5}
        strokeWidth={1.25}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

