import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export class CameraAdapter {
  static async takePicture(): Promise<string[]> {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        quality: 0.7,
        cameraType: 'back',
      });

      if (response.assets && response.assets[0].uri) {
        return [response.assets[0].uri];
      }
    } catch (error) {
      console.warn('Error tomando foto:', error);
    }
    return [];
  }

  static async getPicturesFromLibrary(): Promise<string[]> {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        selectionLimit: 10,
      });

      if (response.assets && response.assets.length > 0) {
        return response.assets.map(asset => asset.uri!);
      }
    } catch (error) {
      console.warn('Error seleccionando imagen:', error);
    }
    return [];
  }

  static async pickImageFromUser(): Promise<string[]> {
    return new Promise(resolve => {
      const handleCamera = async () => {
        const result = await CameraAdapter.takePicture();
        resolve(result);
      };

      const handleGallery = async () => {
        const result = await CameraAdapter.getPicturesFromLibrary();
        resolve(result);
      };

      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Tomar foto', 'Elegir de galería', 'Cancelar'],
            cancelButtonIndex: 0,
          },
          async buttonIndex => {
            if (buttonIndex === 1) await handleCamera();
            else if (buttonIndex === 2) await handleGallery();
            else resolve([]);
          },
        );
      } else {
        Alert.alert(
          'Seleccionar imagen',
          '',
          [
            { text: 'Tomar foto', onPress: handleCamera },
            { text: 'Elegir de galería', onPress: handleGallery },
            { text: 'Cancelar', style: 'cancel', onPress: () => resolve([]) },
          ],
          { cancelable: true },
        );
      }
    });
  }
}
