import hotelsRepository from "@/repositories/hotels-repository";
import { notFoundError } from "@/errors";
import { Response } from "express";
import { ApplicationError} from "@/protocols";


async function getHotel(userId: number) {

    const enrollment = await hotelsRepository.findEnrollment(userId)
       
    if(!enrollment){
     throw notFoundError()
    }
    const ticket = await hotelsRepository.findTikets(enrollment.id)
    
    if(!ticket){
      throw notFoundError()
     }

     if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
        throw (():ApplicationError=> {
         return {
            name: 'payment required',   
            message: "No result for this search!",
            }
        })
    }

    const hotels = await hotelsRepository.getHotel()
    return hotels
}


async function getRooms(hotelId: number) {
      
    const hotels = await hotelsRepository.findHotelsById(hotelId)

    return hotels
}


const hotelsService = {
    getHotel,
    getRooms
  };
  
  export default hotelsService;