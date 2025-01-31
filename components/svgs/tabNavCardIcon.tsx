import * as React from "react"
import Svg, { Path} from "react-native-svg"

function TabNavCardIcon({size = 20,color = "#B8B8B8"}:{size:number;color:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 20"
      fill="none"
    >
      <Path
      fill={color}
      d="M20.447.167a3.6 3.6 0 0 1 3.6 3.6v12a3.6 3.6 0 0 1-3.6 3.6h-16.8a3.6 3.6 0 0 1-3.6-3.6v-12a3.6 3.6 0 0 1 3.6-3.6h16.8Zm1.2 7.2h-19.2v8.4a1.2 1.2 0 0 0 1.06 1.192l.14.008h16.8a1.2 1.2 0 0 0 1.192-1.06l.008-.14v-8.4Zm-3.6 3.6a1.2 1.2 0 0 1 .14 2.392l-.14.008h-3.6a1.2 1.2 0 0 1-.14-2.392l.14-.008h3.6Zm2.4-8.4h-16.8a1.2 1.2 0 0 0-1.2 1.2v1.2h19.2v-1.2a1.2 1.2 0 0 0-1.2-1.2Z"
    />  
    </Svg>
  )
}

export default TabNavCardIcon;
