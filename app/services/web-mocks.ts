// Web-compatible mocks for native-only packages
import React from 'react';
import { Image, ImageProps } from 'react-native';

// Mock FastImage for web
export const FastImage = (props: ImageProps) => {
  return React.createElement(Image, props);
};

FastImage.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
};

// Mock MMKV storage for web
const webStorage = {
  data: new Map(),
  listeners: new Map(),
};

export const MMKV = {
  set: (key: string, value: string | number | boolean) => {
    webStorage.data.set(key, String(value));
    // Trigger listeners
    const listeners = webStorage.listeners.get(key) || [];
    listeners.forEach((callback: Function) => callback(String(value)));
  },
  getString: (key: string) => webStorage.data.get(key) || undefined,
  getNumber: (key: string) => {
    const value = webStorage.data.get(key);
    return value ? parseFloat(value) : undefined;
  },
  getBoolean: (key: string) => {
    const value = webStorage.data.get(key);
    return value === 'true';
  },
  delete: (key: string) => {
    webStorage.data.delete(key);
  },
  clearAll: () => {
    webStorage.data.clear();
  },
  addOnValueChangedListener: (callback: Function) => {
    // Mock implementation
    return () => {}; // unsubscribe function
  }
};

export const useMMKVString = (key: string, defaultValue?: string): [string | undefined, (value: string) => void] => {
  const [value, setValue] = React.useState<string | undefined>(
    webStorage.data.get(key) || defaultValue
  );

  const setStorageValue = React.useCallback((newValue: string) => {
    webStorage.data.set(key, newValue);
    setValue(newValue);
    // Trigger listeners
    const listeners = webStorage.listeners.get(key) || [];
    listeners.forEach((callback: Function) => callback(newValue));
  }, [key]);

  React.useEffect(() => {
    // Add listener for this key
    if (!webStorage.listeners.has(key)) {
      webStorage.listeners.set(key, []);
    }
    const listeners = webStorage.listeners.get(key);
    listeners.push(setValue);

    return () => {
      // Remove listener
      const index = listeners.indexOf(setValue);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [key]);

  return [value, setStorageValue];
};

export const useMMKVListener = (callback: Function, key?: string) => {
  React.useEffect(() => {
    if (key) {
      // Add listener for specific key
      if (!webStorage.listeners.has(key)) {
        webStorage.listeners.set(key, []);
      }
      const listeners = webStorage.listeners.get(key);
      listeners.push(callback);

      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    }
  }, [callback, key]);
};

// Mock Apple Authentication
export const appleAuth = {
  isAvailableAsync: async () => false,
  requestAsync: async () => {
    throw new Error('Apple authentication not available on web');
  },
};

export const appleAuthAndroid = {
  isAvailableAsync: async () => false,
  configure: () => {},
  signIn: async () => {
    throw new Error('Apple authentication not available on web');
  },
};

// Mock Google SignIn
export const GoogleSignin = {
  configure: (config: any) => {},
  hasPlayServices: async () => false,
  signIn: async () => {
    throw new Error('Google SignIn not available on web');
  },
  signOut: async () => {},
  revokeAccess: async () => {},
  getCurrentUser: async () => null,
};

// Mock react-native-config
export const Config = {
  API_URL: 'https://api.example.com',
  // Add other config values as needed
};

// Mock ImageStyle type for FastImage
export interface ImageStyle {
  width?: number | string;
  height?: number | string;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  borderRadius?: number;
  // Add other image style properties as needed
}

// Mock react-native-restart
export const RNRestart = {
  Restart: () => {
    // For web, just reload the page
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  },
};

// Mock react-native-live-transcription
export const eventListener = (event: string, callback: Function) => {
  // Mock implementation - return unsubscribe function
  return () => {};
};

export const startTranscription = async (language: string = 'en') => {
  console.warn('Live transcription not available on web');
};

export const stopTranscription = async () => {
  console.warn('Live transcription not available on web');
};

// Mock react-native-image-picker
export const launchImageLibrary = async (options: any, callback?: Function) => {
  const mockResponse = {
    didCancel: false,
    assets: [
      {
        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        width: 100,
        height: 100,
        type: 'image/png',
        fileName: 'mock-image.png',
        fileSize: 1024,
      }
    ]
  };
  
  if (callback) {
    callback(mockResponse);
  }
  return mockResponse;
};

// Mock permissions for web
export const PERMISSIONS = {
  ANDROID: {
    RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
    CAMERA: 'android.permission.CAMERA',
    READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
    WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
  },
  IOS: {
    MICROPHONE: 'ios.permission.MICROPHONE',
    CAMERA: 'ios.permission.CAMERA',
    PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
  }
};

export const RESULTS = {
  GRANTED: 'granted',
  DENIED: 'denied',
  BLOCKED: 'blocked',
  UNAVAILABLE: 'unavailable',
};

export type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'unavailable';

export const request = async (permission: string) => {
  // On web, we'll assume permissions are granted for development
  return RESULTS.GRANTED;
};

export const check = async (permission: string) => {
  // On web, we'll assume permissions are granted for development
  return RESULTS.GRANTED;
};

export const requestMultiple = async (permissions: string[]) => {
  const result: Record<string, string> = {};
  permissions.forEach(permission => {
    result[permission] = RESULTS.GRANTED;
  });
  return result;
};

// Mock InCallManager for web
export const InCallManager = {
  start: () => {},
  stop: () => {},
  setKeepScreenOn: (keepOn: boolean) => {},
  setSpeakerphoneOn: (speakerOn: boolean) => {},
  setMicrophoneMute: (mute: boolean) => {},
  getAudioUriJS: () => null,
  Busytone: 'busytone',
  Ringtone: 'ringtone',
  Ringback: 'ringback',
};

// Mock WebRTC for web
export const RTCPeerConnection = class {
  constructor(config?: any) {}
  createOffer() { return Promise.resolve({}); }
  createAnswer() { return Promise.resolve({}); }
  setLocalDescription(desc: any) { return Promise.resolve(); }
  setRemoteDescription(desc: any) { return Promise.resolve(); }
  addIceCandidate(candidate: any) { return Promise.resolve(); }
  close() {}
  addEventListener() {}
  removeEventListener() {}
};

export const RTCSessionDescription = class {
  constructor(init?: any) {}
};

export const RTCIceCandidate = class {
  constructor(init?: any) {}
};

export const MediaStream = class {
  constructor() {}
  getTracks() { return []; }
  getVideoTracks() { return []; }
  getAudioTracks() { return []; }
};

export const mediaDevices = {
  getUserMedia: (constraints: any) => Promise.resolve(new MediaStream()),
  enumerateDevices: () => Promise.resolve([]),
};

export const RTCView = ({ style, ...props }: any) => null;

// Mock Skia for web
export const Skia = {
  Paint: () => ({}),
  Path: () => ({}),
  Data: () => ({}),
};

export const Canvas = ({ children, ...props }: any) => null;
export const Circle = ({ ...props }: any) => null;
export const Group = ({ children, ...props }: any) => null;

// Mock better-sqlite3 for web  
export default class Database {
  constructor(filename?: string, options?: any) {}
  prepare(sql: string) {
    return {
      run: (...params: any[]) => ({ changes: 0, lastInsertRowid: 0 }),
      get: (...params: any[]) => ({}),
      all: (...params: any[]) => ([]),
      finalize: () => {},
    };
  }
  exec(sql: string) {}
  close() {}
  pragma(pragma: string) { return []; }
}


