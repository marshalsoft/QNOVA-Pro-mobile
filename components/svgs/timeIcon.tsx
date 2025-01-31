import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TimeIcon({size = 20}:{size:number}) {
  return (<Svg
     width={size}
      height={size}
     fill="none"
     viewBox="0 0 18 18"
   >
     <Path
       fill="#616161"
       d="M9 18A9 9 0 1 1 9 .001 9 9 0 0 1 9 18ZM9 1.286a7.714 7.714 0 1 0 0 15.428A7.714 7.714 0 0 0 9 1.286Z"
     />
     <Path
       fill="#616161"
       d="M11.953 12.858 8.359 9.264v-6.05h1.286v5.517l3.214 3.22-.906.907Z"
     />
   </Svg>
  )
}

export default TimeIcon;
