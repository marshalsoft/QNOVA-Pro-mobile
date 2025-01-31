import * as React from "react"
import Svg, { Path} from "react-native-svg"

function AccountIcon({size = 20,color = "#841743"}:{size:number;color?:string;}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 19 22"
      fill="none"
    >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9.5 0 0 5.238v2.095h19V5.238m-5 4.19v7.334h3V9.429M0 22h19v-3.143H0M8 9.43v7.333h3V9.429m-9 0v7.333h3V9.429H2Z"
      clipRule="evenodd"
    />
    </Svg>
  )
}

export default AccountIcon;
