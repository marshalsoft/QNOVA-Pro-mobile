import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CloseIcon({size = 20,color = "#666"}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
    >
    <Path d="M1 1L16 16M1 16L16 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default CloseIcon
