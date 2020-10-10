import * as React from 'react';
import { Text } from 'react-native';
import STYLES from 'constants/styles';

interface ITypographyProps {
  color?: string;
  fontSize?: number;
  bold?: boolean;
  letterSpacing?: number;
  textAlign?: 'left' | 'center' | 'right';
  style?: any;
  children: any;
}

export default function Typography({
  color = STYLES.color.darkSlateBlue,
  fontSize = STYLES.fontSize.medium,
  bold = false,
  letterSpacing,
  textAlign,
  style,
  children,
  ...props
}: ITypographyProps) {
  const fontFamily = bold ? STYLES.fontFamily.bold : STYLES.fontFamily.medium;

  return (
    <Text
      style={[
        {
          color,
          fontSize,
          fontFamily,
          letterSpacing,
          textAlign,
          lineHeight: fontSize * 1.2,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
