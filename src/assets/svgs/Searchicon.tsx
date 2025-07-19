import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SearchIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#000'}
      d="M10.333 9.333h-.526l-.187-.18a4.334 4.334 0 0 0 .987-3.56c-.314-1.853-1.86-3.333-3.727-3.56A4.337 4.337 0 0 0 2.033 6.88c.227 1.867 1.707 3.413 3.56 3.727a4.333 4.333 0 0 0 3.56-.987l.18.187v.526l2.834 2.834c.273.273.72.273.993 0a.704.704 0 0 0 0-.994l-2.827-2.84Zm-4 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Z"
    />
  </Svg>
);
export default SearchIcon;
