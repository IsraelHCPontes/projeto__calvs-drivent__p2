import { prisma } from "@/config";

async function findEnrollment(userId:number){
    return prisma.enrollment.findFirst({
        where:{
            userId
        },
        include:{
            Address: true
        }
    })
}

async function findTikets(enrollmentId:number){
    
    return prisma.ticket.findFirst({
        where:{
            enrollmentId
        },
        include:{
            TicketType: true
        }
    })
}

async function getHotel(){
    return prisma.hotel.findMany()
}

async function findHotelsById(hotelId: number){
    return prisma.hotel.findUnique({
        where: { 
            id : hotelId
        },
        include:{
            Rooms: true,
        },
    })
}


const hotelsRepository = {
    findEnrollment,
    findTikets,
    getHotel,
    findHotelsById
  };
  
  export default hotelsRepository;