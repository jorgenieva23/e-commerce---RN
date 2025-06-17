import React from 'react';
import {
  Text,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyIcon } from '../components/ui/MyIcon';
import { View } from 'react-native';

interface Props {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;

  children?: React.ReactNode;
}

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightAction = () => {
    if (!rightAction || !rightActionIcon) return null;

    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<MyIcon name={rightActionIcon} color="#000" />}
      />
    );
  };

  return (
    <Layout style={{}}>
      <TopNavigation
        title={() => (
          <View style={{ paddingHorizontal: 35 }}>
            <Text
              category="h6"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ textAlign: 'center' }}>
              {title}
            </Text>
          </View>
        )}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />

      <Layout style={{ height: '100%' }}>{children}</Layout>
    </Layout>
  );
};
