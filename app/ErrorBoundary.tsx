import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🚨 ErrorBoundary caught an error:', error);
    console.error('🚨 Error info:', errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 20,
          backgroundColor: '#f8f9fa'
        }}>
          <ScrollView style={{ maxWidth: 600 }}>
            <View style={{
              backgroundColor: '#fff',
              padding: 30,
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold',
                color: '#e74c3c',
                textAlign: 'center',
                marginBottom: 15
              }}>
                🚨 App Error
              </Text>
              
              <Text style={{ 
                fontSize: 16,
                color: '#2c3e50',
                textAlign: 'center',
                marginBottom: 20,
                lineHeight: 24
              }}>
                The Wellbeing app encountered an error while loading.
              </Text>

              <View style={{
                backgroundColor: '#f8f9fa',
                padding: 15,
                borderRadius: 8,
                marginBottom: 20
              }}>
                <Text style={{ 
                  fontSize: 14,
                  color: '#495057',
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                  Error Details:
                </Text>
                <Text style={{ 
                  fontSize: 12,
                  color: '#6c757d',
                  fontFamily: 'monospace'
                }}>
                  {this.state.error?.message || 'Unknown error'}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: '#007bff',
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginBottom: 15
                }}
                onPress={this.handleReload}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                  🔄 Reload App
                </Text>
              </TouchableOpacity>

              <View style={{
                backgroundColor: '#e9ecef',
                padding: 15,
                borderRadius: 8
              }}>
                <Text style={{ 
                  fontSize: 14,
                  color: '#495057',
                  textAlign: 'center',
                  lineHeight: 20
                }}>
                  💡 This error has been logged. Try reloading the app or check the browser console for more details.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}
