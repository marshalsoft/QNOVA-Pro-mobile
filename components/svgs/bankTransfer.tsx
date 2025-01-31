import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CONSTANTS from "../../includes/constants"

function BankTransferIcon({size = 20,color = CONSTANTS.Colors.black}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
     <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.83 2.12a.417.417 0 01.339 0l7.5 3.333a.417.417 0 11-.338.761L10 2.956 2.669 6.214a.417.417 0 11-.338-.761l7.5-3.334zM2.084 8.332c0-.23.187-.416.417-.416h15a.417.417 0 010 .833h-.417v8.334h.417a.417.417 0 110 .833h-15a.417.417 0 110-.834h.416V8.75H2.5a.417.417 0 01-.417-.416zm1.667.417v8.334h12.5V8.75H3.75zm2.916 2.5c.23 0 .417.187.417.417v2.5a.417.417 0 01-.833 0v-2.5c0-.23.186-.417.416-.417zm3.334 0c.23 0 .416.187.416.417v2.5a.417.417 0 11-.833 0v-2.5c0-.23.187-.417.417-.417zm3.333 0c.23 0 .417.187.417.417v2.5a.417.417 0 01-.834 0v-2.5c0-.23.187-.417.417-.417z"
        fill={color}
      />
    </Svg>
  )
}

export default BankTransferIcon;
