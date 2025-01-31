import * as React from "react"
import Svg, { Path ,G} from "react-native-svg"

function CreditCardIcon({size = 20,color = "#20A100"}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
     <Path fill="#196394" d="M2 20H62V28H2z" />
      <G fill="#b3bfcb">
        <Path d="M2 52a2 2 0 002 2h56a2 2 0 002-2V30H2v22zM60 10H4a2 2 0 00-2 2v6h60v-6a2 2 0 00-2-2z" />
      </G>
      <Path
        fill="#394240"
        d="M60 8H4c-2.211 0-4 1.789-4 4v40c0 2.211 1.789 4 4 4h56c2.211 0 4-1.789 4-4V12c0-2.211-1.789-4-4-4zm2 44a2 2 0 01-2 2H4a2 2 0 01-2-2V30h60v22zm0-24H2v-8h60v8zm0-10H2v-6a2 2 0 012-2h56a2 2 0 012 2v6z"
      />
      <Path
        fill="#394240"
        d="M11 40h14a1 1 0 100-2H11a1 1 0 100 2zM29 40h6a1 1 0 100-2h-6a1 1 0 100 2zM11 46h10a1 1 0 100-2H11a1 1 0 100 2zM45 46h8a1 1 0 001-1v-6a1 1 0 00-1-1h-8a1 1 0 00-1 1v6a1 1 0 001 1zm1-6h6v4h-6v-4z"
      />
      <Path fill="#f9b3b3" d="M46 40H52V44H46z" />
    </Svg>
  )
}

export default CreditCardIcon;
