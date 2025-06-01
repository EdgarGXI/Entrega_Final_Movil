import { Text as RNText } from 'react-native';

export default function Text({ children, style, ...props }) {
  
  return <RNText style={[
    props.className?.includes('font-semibold') & props.className?.includes('font-bold')  ? { } : { fontFamily: 'Nunito_400Regular' }, 
    style]} {...props}>{children}</RNText>;
}
