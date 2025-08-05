import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomWebView from '../../components/custom-WebView/custom-WebView';

interface WebViewScreenRouteParams {
  url: string;
  title?: string;
}

const WebViewScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { url, title } = route.params as WebViewScreenRouteParams;

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <CustomWebView
      url={url}
      title={title || 'Web Page'}
      onClose={handleClose}
    />
  );
};

export default WebViewScreen; 