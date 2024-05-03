const apiHost='http://api-gateway:8000';

export const environment = {
  apiHost:apiHost,
  userApiUrl:`${apiHost}/user-service`,
  packageApiUrl:`${apiHost}/package-service`,
  deliveryApiUrl:`${apiHost}/delivery-service`,
  wsHost:'http://delivery-service:8002',
  googleMapApiKey:"AIzaSyCbbqBUVGdfxZ7okId4BVM_Dyc2jePnyRk"
};
