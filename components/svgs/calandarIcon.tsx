import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CalendarIcon({size = 20}:{size:number}) {
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
        d="M6.667 2.083c.23 0 .416.187.416.417v1.25h5.834V2.5a.417.417 0 11.833 0v1.25h2.083c1.15 0 2.084.933 2.084 2.083v10c0 1.15-.933 2.084-2.084 2.084H4.167a2.083 2.083 0 01-2.084-2.084v-10c0-1.15.933-2.083 2.084-2.083H6.25V2.5c0-.23.186-.417.417-.417zm-.417 2.5H4.167c-.69 0-1.25.56-1.25 1.25v10c0 .69.56 1.25 1.25 1.25h11.666c.69 0 1.25-.56 1.25-1.25v-10c0-.69-.56-1.25-1.25-1.25H13.75v1.25a.417.417 0 11-.833 0v-1.25H7.083v1.25a.417.417 0 01-.833 0v-1.25zm-.833 4.584c0-.23.186-.417.416-.417h8.334a.417.417 0 010 .833H5.833a.417.417 0 01-.416-.416z"
        fill="#231F20"
      />
    </Svg>
  )
}

export default CalendarIcon;
