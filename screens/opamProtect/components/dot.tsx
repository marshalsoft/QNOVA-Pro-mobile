import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const Dot =  ({color = "#FFCD3D"}:{color?:string})=>{
    return (
      <Svg
        width={11}
        height={10}
        viewBox="0 0 11 10"
        fill="none"
      >
        <Circle cx={5.5} cy={5} r={5} fill={color} />
      </Svg>
    )
  }
  
  export default Dot;