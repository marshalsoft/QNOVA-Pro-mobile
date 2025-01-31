import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { COLOURS } from "../../includes/constants";

function ArrowRight({size = 20,color = COLOURS.black}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
    <Path stroke={color} strokeWidth={2} d="M0 8h14m0 0L7.7 1.5M14 8l-6.3 6.5" />
    </Svg>
  )
}

export default ArrowRight;
