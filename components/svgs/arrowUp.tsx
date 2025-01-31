import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowUpIcon({size = 20,color = "#20A100"}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 8 6"
      fill="none"
    >
     <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.766 5.166a.8.8 0 01-1.132 0L4 2.53 1.366 5.166A.8.8 0 01.234 4.034l3.2-3.2a.8.8 0 011.132 0l3.2 3.2a.8.8 0 010 1.132z"
        fill={color}
      />
    </Svg>
  )
}

export default ArrowUpIcon;
