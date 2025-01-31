import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants"

function CreditCardOutlineIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
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
        d="M.083 3.667A2.917 2.917 0 013 .75h10a2.917 2.917 0 012.917 2.917v6.666A2.917 2.917 0 0113 13.25H3a2.917 2.917 0 01-2.917-2.917V3.667zM.917 5.75v4.583c0 1.15.933 2.084 2.083 2.084h10c1.15 0 2.084-.933 2.084-2.084V5.75H.917zm14.167-.833H.917v-1.25c0-1.15.933-2.084 2.083-2.084h10c1.15 0 2.084.933 2.084 2.084v1.25zM3.417 9.5c0-.23.186-.417.417-.417h.833a.417.417 0 010 .834h-.833a.417.417 0 01-.417-.417zm4.167 0c0-.23.186-.417.416-.417h.834a.417.417 0 010 .834H8a.417.417 0 01-.417-.417z"
        fill={color}
      />
    </Svg>
  )
}

export default CreditCardOutlineIcon;
