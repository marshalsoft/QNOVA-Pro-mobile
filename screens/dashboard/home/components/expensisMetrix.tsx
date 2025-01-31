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
export const ExpensisMetrixComponets = ()=>{
    const [list,setWallets] = useState<string[]>([
        ""
      ])
      const data = {
        labels: [""], // optional
        data: [0]
      };
      const chartConfig = {
        barRadius:100,
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(222, 173, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0,
        useShadowColorFromDataset: false ,
      };
    return  <View  style={{flexDirection:"column",paddingBottom:50}}>
  <Text style={{color:"rgba(255,255,255,0.5)",fontSize:14,fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:16}}>Financial Metrics</Text>
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
height:242,
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
overflow:"hidden"
}}
>
<View style={{flex:1}}>
<Text style={{color:"rgba(255,255,255,1)",fontSize:12,fontFamily:FONTFAMILY.INTER.normal}}>Expenses</Text>
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
marginTop:16,
overflow:"hidden",
height:168,
}}
>
<ProgressChart
  data={data}
  width={DEVICE.width - 50}
  height={180}
  strokeWidth={8}
  radius={65}
  chartConfig={chartConfig}
  hideLegend={true}
/>
</View>
</View>
</View>)}
</View>
</ScrollView>
</View>
}
const Wave2 = ()=> {
    return (
      <Svg
        width={53}
        height={13}
        viewBox="0 0 53 13"
        fill="none"
      >
        <Path
          d="M51.5 4.127l-6.341 6.981a1 1 0 01-1.538-.068l-5.97-7.878a1 1 0 00-1.155-.33l-6.322 2.432a1 1 0 01-.263.062l-6.649.639a1 1 0 01-.669-.176L16.117 1.26a1 1 0 00-.815-.15L8.566 2.79a1 1 0 00-.173.06L1.5 6.002"
          stroke="#00A551"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    )
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
      height:242,
    }
   })
  const CopyIcon = ()=>{
    return (
      <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
      >
        <Path
          d="M5 2h4.733c1.494 0 2.24 0 2.811.29.502.256.91.664 1.165 1.166.291.57.291 1.317.291 2.81V11m-9.867 3h5.4c.747 0 1.12 0 1.406-.145.25-.128.454-.332.582-.583.146-.285.146-.659.146-1.405v-5.4c0-.747 0-1.12-.146-1.406a1.333 1.333 0 00-.582-.582c-.286-.146-.659-.146-1.406-.146h-5.4c-.746 0-1.12 0-1.405.146-.25.127-.455.331-.583.582C2 5.347 2 5.72 2 6.467v5.4c0 .746 0 1.12.145 1.405.128.25.332.455.583.583.285.145.659.145 1.405.145z"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
  const Wave1 = ()=>{
    return (
      <Svg
        width={13}
        height={13}
        viewBox="0 0 13 13"
        fill="none"
      >
        <G clipPath="url(#clip0_2104_14782)">
          <Path
            d="M11.5 4L7.566 7.934c-.198.198-.297.297-.411.334a.5.5 0 01-.31 0c-.114-.037-.213-.136-.41-.334l-1.37-1.368c-.197-.198-.296-.297-.41-.334a.5.5 0 00-.31 0c-.114.037-.213.136-.41.334L1.5 9m10-5H8m3.5 0v3.5"
            stroke="#33B469"
            strokeWidth={1.33}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_2104_14782">
            <Path fill="#fff" transform="translate(.5 .5)" d="M0 0H12V12H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    )
  }
  const ArrowDown = ()=> {
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