import axios from 'axios';

async function fetchBarcodeData(barcode) {
  try {

    const apiUrl = 'https://api.example.com/barcode';

    // Configura la solicitud POST con el código de barras como cuerpo
    const data = {
      barcode: barcode,
    };

    // Realiza la solicitud a la API
    const response = await axios.post(apiUrl, data);

    // Procesa la respuesta de la API
    if (response.status === 200) {
      console.log('Datos del código de barras:', response.data);
    } else {
      console.error('Error al obtener los datos del código de barras:', response.statusText);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error);
  }
}

export default fetchBarcodeData;