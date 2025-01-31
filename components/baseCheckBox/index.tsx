import { useEffect, useState } from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { COLOURS } from "../../includes/constants";
import { CheckIcon } from "../../screens/dashboard/home/components/walletTransfer";
interface BaseCheckBoxProp {
    onValueChange:(value: boolean) => Promise<void> | void;
    value:boolean;
}
const BaseCheckBox = (prop:BaseCheckBoxProp)=>{
const [checked,setChecked] = useState<boolean>(false);
const color = useSharedValue(0);
useEffect(()=>{
  color.value = prop.value?1:0;
  setChecked(prop.value);
},[prop.value]);
const AnimateColor = useAnimatedStyle(()=>{
    return {
        borderColor:interpolateColor(
            color.value,
            [0, 1],
            [COLOURS.gray64, COLOURS.yellow]
          ),
          borderWidth:interpolate(
            color.value,
            [0, 1],
            [1, 5]
          )
    }
})
return <TouchableOpacity 
onPress={()=>{
    prop.onValueChange(!prop.value);  
}}
>
<Animated.View 
style={[{
    height:24,
    justifyContent:"center",
    alignItems:"center",
    width:24,
    borderRadius:24,
    borderWidth:1
    },AnimateColor]}
>
{checked && <CheckIcon  />}
</Animated.View>
</TouchableOpacity>
}
export default BaseCheckBox;