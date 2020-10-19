import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

const App = () => {
  const [qr, setQr] = useState('');
  const [scanner, setScanner] = useState(null);

  const onRead = (e) => {
    setQr(e.data);
  };

  const onResetScan = () => {
    setQr('');
    scanner.reactivate();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>QR code scanning</Text>
          </View>
          {<QRCodeScanner ref={(node) => setScanner(node)} onRead={onRead} />}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Wearable: <Text style={styles.data}>{qr}</Text>
              </Text>
              <Button title="Scan again" onPress={onResetScan} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
  },
  titleContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  data: {
    fontWeight: '300',
  },
});

export default App;
