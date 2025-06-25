import React from 'react';
import { View, Text, Platform } from 'react-native';

// Mock components that commonly cause requireNativeComponent errors

// Safe SVG component for web
export const SafeSVG = ({ children, ...props }: any) => {
  if (Platform.OS === 'web') {
    return (
      <View style={{ width: 24, height: 24, ...props.style }}>
        <Text style={{ fontSize: 16 }}>📄</Text>
      </View>
    );
  }
  // On native, try to use the real SVG
  try {
    const Svg = require('react-native-svg');
    return <Svg.Svg {...props}>{children}</Svg.Svg>;
  } catch {
    return <View style={{ width: 24, height: 24, ...props.style }} />;
  }
};

// Safe LinearGradient for web
export const SafeLinearGradient = ({ children, style, colors, ...props }: any) => {
  if (Platform.OS === 'web') {
    const gradient = colors ? `linear-gradient(45deg, ${colors.join(', ')})` : 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
    return (
      <View style={[style, { background: gradient }]} {...props}>
        {children}
      </View>
    );
  }
  // On native, try to use the real LinearGradient
  try {
    const LinearGradient = require('react-native-linear-gradient').default;
    return <LinearGradient colors={colors} style={style} {...props}>{children}</LinearGradient>;
  } catch {
    return <View style={style} {...props}>{children}</View>;
  }
};

// Safe FastImage for web
export const SafeFastImage = ({ source, style, ...props }: any) => {
  if (Platform.OS === 'web') {
    return (
      <img 
        src={typeof source === 'object' ? source.uri : source}
        style={{
          width: style?.width || 100,
          height: style?.height || 100,
          objectFit: 'cover',
          borderRadius: style?.borderRadius || 0,
          ...style
        }}
        {...props}
      />
    );
  }
  // On native, try to use FastImage
  try {
    const FastImage = require('react-native-fast-image').default;
    return <FastImage source={source} style={style} {...props} />;
  } catch {
    const { Image } = require('react-native');
    return <Image source={source} style={style} {...props} />;
  }
};

// Safe Video component for web
export const SafeVideo = ({ source, style, ...props }: any) => {
  if (Platform.OS === 'web') {
    return (
      <video 
        src={typeof source === 'object' ? source.uri : source}
        style={{
          width: style?.width || 300,
          height: style?.height || 200,
          ...style
        }}
        controls
        {...props}
      />
    );
  }
  // On native, try to use react-native-video
  try {
    const Video = require('react-native-video').default;
    return <Video source={source} style={style} {...props} />;
  } catch {
    return <View style={style}><Text>Video not available</Text></View>;
  }
};

// Safe WebView for web
export const SafeWebView = ({ source, style, ...props }: any) => {
  if (Platform.OS === 'web') {
    return (
      <iframe 
        src={typeof source === 'object' ? source.uri : source}
        style={{
          width: '100%',
          height: 400,
          border: 'none',
          ...style
        }}
        {...props}
      />
    );
  }
  // On native, try to use WebView
  try {
    const { WebView } = require('react-native-webview');
    return <WebView source={source} style={style} {...props} />;
  } catch {
    return <View style={style}><Text>WebView not available</Text></View>;
  }
};
