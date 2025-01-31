import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Arrow = ({color = "#FFCD3D"}:{color?:string})=>{
    return  (
        <Svg
          width={49}
          height={48}
          viewBox="0 0 49 48"
          fill="none"
        >
          <Path
            d="M23.378 4.282L9.607 9.512l5.23 13.772"
            stroke={color}
            strokeWidth={4.16667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M9.607 9.512l15.202 6.832c10.495 4.717 15.179 17.048 10.462 27.543l-.854 1.9"
            stroke={color}
            strokeWidth={4.16667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )
}
export default Arrow;