import * as React from "react"
import Svg, { Path} from "react-native-svg"

function BankIcon({size = 32}:{size?:number}) {
    return   <Svg width={size} height={size} fill="none">
    <Path
      fill="#F28815"
      fillRule="evenodd"
      d="M15.22 3.193a2.655 2.655 0 0 1 1.56 0l3.981 1.224a22.296 22.296 0 0 1 5.855 2.786c1.404.94.738 3.13-.952 3.13H6.336c-1.69 0-2.355-2.19-.951-3.13a22.295 22.295 0 0 1 5.854-2.786l3.981-1.224Zm.972 1.912a.654.654 0 0 0-.384 0L11.827 6.33a20.295 20.295 0 0 0-4.493 2.004h17.332a20.295 20.295 0 0 0-4.493-2.004l-3.98-1.224Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F28815"
      d="M5.667 28a1 1 0 0 1 1-1h18.666a1 1 0 1 1 0 2H6.668a1 1 0 0 1-1-1ZM8.334 22.666a1 1 0 0 0 2 0v-8a1 1 0 1 0-2 0v8ZM16 23.666a1 1 0 0 1-1-1v-8a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1ZM21.667 22.666a1 1 0 0 0 2 0v-8a1 1 0 1 0-2 0v8Z"
    />
  </Svg>
}
export default BankIcon;