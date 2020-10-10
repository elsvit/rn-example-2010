import * as React from 'react';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { SafeAreaBackground, ScreenHeader, IScreenHeaderProps } from 'components/blocks';
import STYLES from 'constants/styles';


interface IOwnProps {
  screenHeaderProps?: Maybe<IScreenHeaderProps>;
  children: any;
  bgColor?: string;
  bgImg?: any;
}

type ISafeScrollViewProps = IOwnProps;

const SafeScrollView = ({
  screenHeaderProps,
  bgColor = STYLES.color.paleGrey,
  bgImg,
  children,
}: ISafeScrollViewProps): JSX.Element => {
  return (
    <SafeAreaBackground bgColor={bgColor} bgImg={bgImg}>
      {Boolean(screenHeaderProps) && <ScreenHeader {...screenHeaderProps} />}
      <WrapperScrollable
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingHorizontal: 0,
          paddingTop: 0,
          minHeight: 200,
          paddingBottom: STYLES.size.bottomTabsHeight,
        }}
        style={{
          backgroundColor: bgColor,
        }}
        keyboardShouldPersistTaps={'always'}
      >
        {children}
      </WrapperScrollable>
    </SafeAreaBackground>
  );
};

const WrapperScrollable = styled(KeyboardAwareScrollView)`
  flex: 1;
  padding-bottom: ${STYLES.size.bottomTabsHeight + 16}px;
`;

export default SafeScrollView;
