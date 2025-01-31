import * as React from "react"
import Svg, { Path} from "react-native-svg"

function BillsIcon({size = 20,color = "#841743"}:{size:number;color?:string;}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 18"
      fill="none"
    >
    <Path
      fill={color}
      d="M17.624.01a.996.996 0 0 0-.396.022L1.99 4h7.938l5.956-1.551a1.496 1.496 0 0 0 1.109.65l.235.9h2.067L18.448.75a1.001 1.001 0 0 0-.824-.738ZM1 6a1 1 0 0 0-1 1v10.001A1 1 0 0 0 1 18h18a1 1 0 0 0 1-.999v-10a1 1 0 0 0-1-1H1Zm1.913 2.001h14.174a1.5 1.5 0 0 0 .912.912v6.175a1.5 1.5 0 0 0-.912.912H2.913A1.5 1.5 0 0 0 2 15.088V8.913a1.5 1.5 0 0 0 .912-.912Zm7.087 1A3 3 0 1 0 10 15a3 3 0 0 0 0-6Zm-5 2a1 1 0 1 0 .001 2.001 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2.001 1 1 0 0 0 0-2Z"
    />
    </Svg>
  )
}

export default BillsIcon;
