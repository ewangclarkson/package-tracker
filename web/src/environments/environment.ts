const apiHost='http://localhost:8000';

export const environment = {
  apiHost:apiHost,
  userApiUrl:`${apiHost}/user-service`,
  packageApiUrl:`${apiHost}/package-service`,
  deliveryApiUrl:`${apiHost}/delivery-service`,
  wsHost:'wss://localhost:8000',
  googleMapApiKey:"AIzaSyCbbqBUVGdfxZ7okId4BVM_Dyc2jePnyRk"
};
