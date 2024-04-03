const {locationRepository} = require('../repository/location.repository');

const LocationService = {
    async createLocation(locationRequest){
        return locationRepository.create(locationRequest);
    },
    async getLocationByLatLng(lat,lng){
        return locationRepository.findOne({lat:lat,lng:lng});
    }
}

module.exports=LocationService;