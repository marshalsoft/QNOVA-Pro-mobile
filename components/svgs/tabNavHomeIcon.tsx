import * as React from "react"
import Svg, { Path} from "react-native-svg"

function TabNavHomeIcon({size = 20,color = "#0D2A9E"}:{size:number,color:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 23"
      fill="none"
    >
       <Path
      fill={color}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20.912 9.687v9.67c0 .968-.846 1.814-1.813 1.814h-3.627c-.967 0-1.813-.846-1.813-1.813v-3.506c0-1.45-1.21-2.66-2.66-2.66-1.45 0-2.66 1.21-2.66 2.66v3.506c0 .967-.846 1.813-1.813 1.813H2.899c-.967 0-1.813-.846-1.813-1.813V9.687c0-.605.242-1.088.725-1.451l8.22-6.286c.605-.484 1.572-.484 2.177 0l8.22 6.286c.121.363.484.846.484 1.45Z"
    />
    </Svg>
  )
}

export default TabNavHomeIcon;
