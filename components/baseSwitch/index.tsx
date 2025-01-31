import { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { COLOURS } from "../../includes/constants";
interface BaseSwitchProp {
    onValueChange?:(value: boolean) => Promise<void> | void;
    value:boolean;
    disabled?:boolean;
}
const BaseSwitch = (prop:BaseSwitchProp)=>{
const color = useSharedValue(0);
const [value,setValue] = useState(false)
useEffect(()=>{
  color.value = prop.disabled?0:prop.value?1:0;
  if(prop.disabled)
  {
    setValue(false)
  }else{
    setValue(prop.value)
  }
},[prop.value,prop.disabled]);
const AnimateColor = useAnimatedStyle(()=>{
    return {
        backgroundColor:interpolateColor(
            color.value,
            [0, 1],
            [COLOURS.gray, '#8B1D41']
          )
    }
})
return <Animated.View 
style={[{
    height:25,
    justifyContent:"center",
    alignItems:"center",
    width:44,
    borderRadius:50,
    overflow:"hidden"
    },AnimateColor]}
>
<Switch
disabled={prop.disabled}
onValueChange={prop.onValueChange}
value={value}
thumbColor={"white"}
trackColor={{
    true:"#8B1D41",
    false:COLOURS.gray
}}
/>
</Animated.View>
}
export default BaseSwitch;