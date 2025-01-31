import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckedIcon({size = 20,color = "#20A100"}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
    >
     <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 9.8A4.8 4.8 0 105 .2a4.8 4.8 0 000 9.6zm2.224-5.576a.6.6 0 00-.848-.848L4.4 5.35l-.776-.775a.6.6 0 10-.848.848l1.2 1.2a.6.6 0 00.848 0l2.4-2.4z"
        fill={color}
      />
    </Svg>
  )
}

export default CheckedIcon;

export const CheckedIconAlt = ({size = 20,color = "#20A100"}:{size:number;color?:string})=> {
  return <Svg 
  fill="none" 
  viewBox="0 0 24 24"
  width={size}
  height={size}
  >
  <Path
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="m6 12 4.243 4.243 8.484-8.486"
  />
</Svg>
}
