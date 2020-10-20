import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  Vibration,
  Alert,
} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [qrData, setQrData] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState(null);

  const onRead = (e) => {
    try {
      if (!e.data || scanning) return;
      Vibration.vibrate();
      setScanning(true);
      setQrData(e.data);
      Alert.alert('Data', e.data, [{text: 'Ok', onPress: () => onResetScan()}]);
    } catch (error) {
      console.error(error);
    }
  };

  const onResetScan = () => {
    setScanning(false);
    setQrData('');
    setScanner(null);
    // scanner.reactivate();
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>QR Code Scanning</Text>
          </View>
        }
        {
          <View style={styles.cameraContainer}>
            <Camera
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
              }}
              ratio={'1:1'}
              style={styles.cameraContainer}
              onBarCodeRead={onRead}
              vibrate={true}
              captureAudio={false}></Camera>
          </View>
        }
        {
          <View style={styles.footer}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.data}>{qrData}</Text>
            </Text>
            <Button title="Scan again" onPress={onResetScan} />
          </View>
        }
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    // flex: 1,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
