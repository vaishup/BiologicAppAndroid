import React from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root, {AuthProvider} from './src/navigation';
import {ModalProvider} from './src/components/Modal/GlobalModal';


function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <GluestackUIProvider config={config}>
          <ModalProvider>
            <AuthProvider>
              <Root />
            </AuthProvider>
          </ModalProvider>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
export default App;