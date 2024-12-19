import axios from 'axios';
import { Alert } from 'react-native';



export const login = async (email, password,navigation,setEmail,setPassword) => {


  try {

    const response = await axios.post(
      'http://apidev.wogom.com/v1/retailer/login',
      {
        emailid: email,
        password: password,
      },
      {
        headers: {
          'x-random': 'xyz',
          'x-userid': '7185',
          'xyz': '754ad38082d761943b6c95670a38c6ca',
          'x-deviceinfo': 'postmen',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {

    if (error.request) {
      // Check if the error request contains "Unable to resolve host"
      if (error.request._response && error.request._response.includes("Unable to resolve host")) {
        Alert.alert(
          'Network Error',
          error.request._response,
          [
          
            {
              text: 'Anyway, Visit Products Screen', // Button to inspect products
              onPress: () => {navigation.navigate('ProductList');
              setEmail('');
              setPassword('');
              }
            },
          ],
          { cancelable: false }
        );
      }
    } else {
      // Handle other types of errors
      Alert.alert('Error', 'An unexpected error occurred');
    }


  }
  
};

export const fetchProducts = async () => {
  try {
    const response = await axios.post(
      'https://api-dev.wogom.com/v1/retailer/fresharrivals',
      {
        retailerid: 349,
        categoryid: 0,
      },
      {
        headers: {
          'x-userid': '7185',
          'x-random': 'xyz',
          'xyz': '754ad38082d761943b6c95670a38c6ca',
          'x-deviceinfo': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
};