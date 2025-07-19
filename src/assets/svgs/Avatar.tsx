import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Avataricon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#000'}
      d="M4.023 10h4.954c1.645 0 2.973 1.34 2.973 3v2H1.05v-2c0-1.66 1.328-3 2.973-3Zm0-6h4.954v2.5c0 .663-.26 1.299-.725 1.768A2.466 2.466 0 0 1 6.5 9a2.466 2.466 0 0 1-1.752-.732A2.512 2.512 0 0 1 4.023 6.5V4Zm4.954 0c.545 0 .991.45.991 1s-.446 1-.99 1V4ZM4.023 6a.998.998 0 0 1-.991-1c0-.55.446-1 .99-1v2Z"
    />
    <Path
      fill={props.color || '#000'}
      d="M4.142 4.12h-.496c-.743-.62-.614-1.57-.614-2.37s.495-.26.99-.26c.496 0 .992.5.992.5-.872 0-.991-1-.991-1h2.972c1.09 0 1.982.9 1.982 2h.496s.247.75-.12 1.25l-5.201-.12h-.01Z"
    />
  </Svg>
);
export default Avataricon;
