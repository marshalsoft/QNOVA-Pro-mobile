import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"
const TrashIcon = ({size = 20,color = "red"}:{size:number;color?:string;})=>{
    return   <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M10 2.25a.75.75 0 00-.75.75v.75H5a.75.75 0 000 1.5h14a.75.75 0 000-1.5h-4.25V3a.75.75 0 00-.75-.75h-4zM10 10.65a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75zM14.75 11.4a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7z"
      fill="#000"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.991 7.917a.75.75 0 01.746-.667h10.526a.75.75 0 01.746.667l.2 1.802c.363 3.265.363 6.56 0 9.826l-.02.177a2.853 2.853 0 01-2.44 2.51 27.04 27.04 0 01-7.498 0 2.853 2.853 0 01-2.44-2.51l-.02-.177a44.489 44.489 0 010-9.826l.2-1.802zm1.417.833l-.126 1.134a42.99 42.99 0 000 9.495l.02.177a1.353 1.353 0 001.157 1.191c2.35.329 4.733.329 7.082 0a1.353 1.353 0 001.157-1.19l.02-.178c.35-3.155.35-6.34 0-9.495l-.126-1.134H7.408z"
      fill="#000"
    />
  </Svg>
}
export default TrashIcon;