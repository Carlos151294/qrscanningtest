import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  Vibration,
  Alert,
} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';

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
          <View style={styles.overlay}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>QR Code Scanning</Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.headerTitle}></Text>
            </View>
          </View>
        }
        {
          <Camera
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'App needs your permission to use your camera',
              buttonPositive: 'Ok',
            }}
            style={styles.cameraContainer}
            onBarCodeRead={onRead}
            vibrate={true}
            captureAudio={false}
          />
        }
        {}
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    position: 'relative',
    backgroundColor: 'gray',
  },
  cameraContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'green',
    zIndex: -1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  header: {
    height: Dimensions.get('window').height / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: 24, 
    fontWeight: '600'
  },
  footer: {
    height: Dimensions.get('window').height / 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
