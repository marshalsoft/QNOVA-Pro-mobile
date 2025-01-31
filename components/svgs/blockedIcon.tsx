import * as React from "react"
import Svg, { G, Defs, Circle, Path } from "react-native-svg"

function BlockedIcon({size = 32}:{size?:number}) {
    return   <Svg width={size} height={size} 
    fill="transparent"
    stroke="red"
    viewBox="0 0 24 24"
  >
    <G id="SVGRepo_iconCarrier">
      <Defs></Defs>
      <Circle cx={12} cy={12} r={10.5}  />
      <Path d="M19.64 4.36 4.36 19.64"  />
    </G>
  </Svg>
}
export default BlockedIcon;