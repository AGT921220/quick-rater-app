const axios = require('axios'); // Importa la biblioteca axios

const sendNotification = async () => {
  const token = 'cPY-evDNT1KpI6joVpkmBK:APA91bHuDD0X5fFlgcYC-GpfC4YP8d6nEvP8GNbW9dzcPpwMLDa0sjrAX585pY-lZwHoXpW3U1fUncJIcmXf8jb5m-T0__QrRQ5mW9tykfPm-TBkh_VyT9Z5-sOsMw-jpY2S_hA_Llr9'; // Reemplaza con el token adecuado
  const msj = 'Gracias por tu amable participación';

  try {
    const response = await axios.post('https://fcm.googleapis.com/fcm/send', {
      to: token,
      priority: 'normal',
      data: {
        experienceId: '@agt921220/quick-rater-multi-app',
        title: 'Hola Dish Hermoso',
        message: msj
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=AAAA7hTvJEQ:APA91bFnn_ybjAgrrdAHvoudqcnRW1Ohtdi00WB45sNUeqkFm5pJ_6mnTwKugIc7fnX03tXWDYHNgqsY7_saVIYAreEpU2f9yqj0rbk4DE5XujVkrBF3ujgkIhX4XcUn2NLGUMmiHNKB'
        
      }
    });

    console.log('Notificación enviada con éxito:', response.data);
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
  }
}

sendNotification();
