import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChatIcon({size = 20,color = "#231F20"}:{size:number;color?:string}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 15"
      fill="none"
    >
     <Path
        d="M5.5 5.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM9.5 5.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12.25 6.75a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6.593a50.577 50.577 0 00-8.098-.04l-.193.015A4.93 4.93 0 00.75 5.483V14a.75.75 0 001.105.66l3.91-2.1a1.25 1.25 0 01.593-.15h8.976c1.132 0 2.102-.81 2.305-1.923.412-2.257.444-4.567.096-6.835l-.102-.668A2.666 2.666 0 0015.225.732L13.6.593zM5.616 2.05a49.076 49.076 0 017.858.039l1.624.138c.536.046.972.453 1.053.985l.103.668a19.165 19.165 0 01-.09 6.34.843.843 0 01-.829.691H6.358a2.75 2.75 0 00-1.302.328L2.25 12.746V5.483a3.43 3.43 0 013.171-3.42l.194-.014z"
        fill={color}
      />
    </Svg>
  )
}

export default ChatIcon;
