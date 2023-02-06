import { Request, Response} from "express";
import { AuthenticatedRequest } from "@/middlewares";

import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";
import { number } from "joi";

export async function getHotels(req: AuthenticatedRequest, res:Response){
    const userId =  Number(req.userId);
    
    try{
        await hotelsService.findDataById(userId)
        const hotels = await hotelsService.getHotel()

        const listHotels = hotels.map(hotel => hotel)
        console.log('hoteis a seguir => ', hotels, listHotels)
        return res.status(httpStatus.OK).send(listHotels)

    }catch(error){
         console.log(error)
        if(error.name ==='NotFoundError'){
            return res.sendStatus(404)
        }
        if(error.name ==='payment required'){
            return res.sendStatus(402)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

}


export async function getRooms(req: AuthenticatedRequest, res:Response){
    const hotelId = Number(req.params.hotelId)
    const userId =  Number(req.userId);

    try{

        await hotelsService.findDataById(userId)
       
        const hotels = await hotelsService.getRooms(hotelId)


        return res.status(httpStatus.OK).send(hotels)

    }catch(error){
        console.log(error)
        if(error.name ==='NotFoundError'){
            return res.sendStatus(404)
        }
        if(error.name ==='payment required'){
            return res.sendStatus(402)
        }


        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

}


