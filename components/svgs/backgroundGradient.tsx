import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const GradientComponent = () => (
  <Svg 
  width={"100%"} 
  height={"100%"} 
  style={{position:"absolute",width:"100%",height:"100%",left:0,top:0}}
  fill="none">
    <Path
      fill="url(#a)"
      d="M0 0h359v800H0z"
      
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={179.5}
        x2={179.5}
        y1={35}
        y2={800}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.529} stopColor="#D6BE5E" stopOpacity={0} />
        <Stop offset={0.948} stopColor="#BE970B" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default GradientComponent;
