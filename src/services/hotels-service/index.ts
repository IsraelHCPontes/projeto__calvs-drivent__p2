import hotelsRepository from "@/repositories/hotels-repository";
import { notFoundError } from "@/errors";
import { Response } from "express";

async function findDataById(userId:number) {
      
        const enrollment = await hotelsRepository.findEnrollment(userId)
       
        if(!enrollment){
         throw notFoundError()
        }
        const ticket = await hotelsRepository.findTikets(enrollment.id)
        
        if(!ticket){
          throw notFoundError()
         }

         if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
            throw ((res: Response)=> {
             return  res.status(404).send('payment required')
            })
         }
       
}

async function getHotel() {
    const hotels = await hotelsRepository.getHotel()
    return hotels
}


async function getRooms(hotelId: number) {
      
    const hotels = await hotelsRepository.findHotelsById(hotelId)

    return hotels
}


const hotelsService = {
    findDataById,
    getHotel,
    getRooms
  };
  
  export default hotelsService;