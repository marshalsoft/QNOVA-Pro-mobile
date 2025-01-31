import * as React from "react"
import Svg, { SvgProps, G, Path, Rect, Defs, ClipPath } from "react-native-svg"

function InflowIcon({size = 20,color = "#841743"}:{size:number;color?:string;}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
     <G clipPath="url(#a)">
      <Path
        fill={color}
        d="m13.335 7.845-7.172 7.173-1.179-1.179 7.172-7.172h-6.32V5h9.166v9.167h-1.667V7.845Z"
      />
    </G>
    <Rect
      width={19.4}
      height={19.4}
      x={0.3}
      y={0.3}
      stroke={color}
      strokeWidth={0.6}
      rx={4.7}
    />
    <Defs>
      <ClipPath id="a">
        <Rect width={20} height={20} fill="#fff" rx={5} />
      </ClipPath>
    </Defs>
  
    </Svg>
  )
}

export default InflowIcon;
