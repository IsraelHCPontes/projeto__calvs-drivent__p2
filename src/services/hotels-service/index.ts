import hotelsRepository from "@/repositories/hotels-repository";

async function getHotels() {
      
        const hotels = await hotelsRepository.findHotels()

        const hotel = hotels.map(hotel => hotel)

        return hotel
}


const hotelsService = {
    getHotels
  };
  
  export default hotelsService;