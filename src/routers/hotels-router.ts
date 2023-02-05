import { Router } from "express";

import { getHotels, getRooms} from "@/controllers";


const hotelsRouter = Router();

hotelsRouter.get("/", getHotels)
hotelsRouter.get("/:hotelId", getRooms)
  
  
export { hotelsRouter };