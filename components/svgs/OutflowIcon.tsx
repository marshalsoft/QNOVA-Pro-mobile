import * as React from "react"
import Svg, { SvgProps, G, Path, Rect, Defs, ClipPath } from "react-native-svg"

function OutflowIcon({size = 20,color = "#841743"}:{size:number;color?:string;}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
     <Rect
      width={19.4}
      height={19.4}
      x={19.7}
      y={0.3}
      stroke={color}
      strokeWidth={0.6}
      rx={4.7}
      transform="rotate(90 19.7 .3)"
    />
    <Path
      fill={color}
      d="M12.155 13.335 4.983 6.163 6.16 4.984l7.172 7.172v-6.32H15v9.166H5.833v-1.667h6.322Z"
    />
    </Svg>
  )
}

export default OutflowIcon;
