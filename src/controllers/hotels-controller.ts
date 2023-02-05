import { Request, Response} from "express";
import { AuthenticatedRequest } from "@/middlewares";

import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res:Response){

    try{

        const hotels = await hotelsService.getHotels()

        return res.status(httpStatus.OK).send(hotels)

    }catch(error){
        console.log(error)
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

}