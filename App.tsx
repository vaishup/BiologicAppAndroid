import React from 'react';
import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

import Root from './src/navigation';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <Root />
    </GluestackUIProvider>
  );
}

export default App;
