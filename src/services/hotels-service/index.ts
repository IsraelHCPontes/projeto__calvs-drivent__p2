import hotelsRepository from "@/repositories/hotels-repository";

async function getHotels() {
      
        const hotels = await hotelsRepository.findHotels()

        const hotel = hotels.map(hotel => hotel)

        return hotel
}

async function getRooms(hotelId: number) {
      
    const hotels = await hotelsRepository.findHotelsById(hotelId)

    return hotels
}


const hotelsService = {
    getHotels,
    getRooms
  };
  
  export default hotelsService;