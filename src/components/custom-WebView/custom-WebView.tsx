import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

interface CustomWebViewProps {
  url: string;
  title?: string;
  onClose: () => void;
}

const CustomWebView: React.FC<CustomWebViewProps> = ({ url, title = 'Web Page', onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const webViewRef = useRef<WebView>(null);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    Alert.alert(
      'Error',
      'Failed to load the page. Please check your internet connection and try again.',
      [{ text: 'OK' }]
    );
  };

  const handleGoBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward && webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Image source={Icons['fi-rr-angle-left']} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={[styles.navButton, !canGoBack && styles.disabledButton]} 
            onPress={handleGoBack}
            disabled={!canGoBack}
          >
            <Image 
              source={Icons['fi-rr-angle-left']} 
              style={[styles.navIcon, !canGoBack && styles.disabledIcon]} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, !canGoForward && styles.disabledButton]} 
            onPress={handleGoForward}
            disabled={!canGoForward}
          >
            <Image 
              source={Icons['fi-rr-angle-right']} 
              style={[styles.navIcon, !canGoForward && styles.disabledIcon]} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={handleRefresh}>
            <Image source={Icons['fi-rr-refresh']} style={styles.navIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleError}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsBackForwardNavigationGestures={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginTop: statusBarHeight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: moderateScale(12),
  },
  backIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#374151',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: moderateScale(8),
    marginLeft: moderateScale(4),
  },
  disabledButton: {
    opacity: 0.5,
  },
  navIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    tintColor: '#374151',
  },
  disabledIcon: {
    tintColor: '#9CA3AF',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: moderateScale(8),
    fontSize: moderateScale(14),
    color: '#6B7280',
  },
  webview: {
    flex: 1,
  },
});

export default CustomWebView; 