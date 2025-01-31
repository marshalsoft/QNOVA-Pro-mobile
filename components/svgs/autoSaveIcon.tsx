import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants"

function AutoSaveIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
     
     <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 12.167c0 1.15.933 2.083 2.083 2.083h8.334c1.15 0 2.083-.933 2.083-2.083v-.834a.417.417 0 11.833 0v.834a2.917 2.917 0 01-2.917 2.916H3.833a2.917 2.917 0 01-2.916-2.916v-.834a.417.417 0 11.833 0v.834zm2.622-4.462a.417.417 0 01.59 0l2.621 2.622V1.333a.417.417 0 01.833 0v8.994l2.623-2.622a.417.417 0 01.589.59l-3.334 3.333a.417.417 0 01-.589 0L4.372 8.295a.417.417 0 010-.59z"
        fill={color}
      />
    </Svg>
  )
}

export default AutoSaveIcon;
