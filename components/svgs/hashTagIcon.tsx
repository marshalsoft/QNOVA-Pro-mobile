import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants"

function HashtagIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
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
        d="M7.268.929a.417.417 0 01.303.505l-.913 3.65H10.8l.963-3.852a.417.417 0 11.809.202l-.912 3.65h3.007a.417.417 0 010 .833H11.45l-1.041 4.166h2.59a.417.417 0 110 .834H10.2l-.963 3.85a.417.417 0 01-.808-.201l.912-3.65h-4.14l-.964 3.852a.417.417 0 01-.808-.203l.912-3.648H1.333a.417.417 0 110-.834H4.55L5.59 5.917H3a.417.417 0 110-.834h2.8l.962-3.85a.417.417 0 01.506-.304zM6.45 5.917l-1.042 4.166H9.55l1.041-4.166h-4.14z"
        fill={color}
      />
    </Svg>
  )
}

export default HashtagIcon;
