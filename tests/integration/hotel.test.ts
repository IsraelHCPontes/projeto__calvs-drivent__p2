import app, { init } from "@/app";
import supertest from "supertest";
import httpStatus from "http-status";
import { prisma } from "@/config";
import { cleanDb, generateValidToken } from "../helpers";
import { createEnrollmentWithAddress, createUser, createTicketType, createTicket,createPayment } from "../factories";
import { TicketStatus } from "@prisma/client";

beforeAll(async () => {
    await init();
  });


const server = supertest(app)

describe("GET /hotels",  () =>{

    it("should respond with status 401 if no token", async () => {
        const result = await server.get("/hotels");
        expect(result.status).toBe(httpStatus.UNAUTHORIZED);
      })

      it("should respond with status 401 if invalid token", async () => {
        const result = await server.get("/hotels").set("Authorization", "Bearer xxxx")
        expect(result.status).toBe(httpStatus.UNAUTHORIZED);
      })

      describe("when token is valid", () => {
        it("should respond with status 404 when no enrollment", async () => {
          const token = await generateValidToken();
    
          const result = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
         
          expect(result.status).toBe(404)});

        it("should respond with status 404 when no ticket", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            await createEnrollmentWithAddress(user);

            const result = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
           
            expect(result.status).toBe(404)}); 
        })

          it("should respond with status 404 when payment required", async () => {
             const user = await createUser();
             const token = await generateValidToken(user);
              await createEnrollmentWithAddress(user);
            
             const result = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
             console.log('a seguir result e outros =>', result.status)
             expect(result.status).toBe(404)});
        
    })



    describe("GET /hotels/:hotelId",  () =>{

        it("should respond with status 401 if no token", async () => {
            const result = await server.get("/hotels");
            expect(result.status).toBe(httpStatus.UNAUTHORIZED);
          })
    
          it("should respond with status 401 if invalid token", async () => {
            const result = await server.get("/hotels").set("Authorization", "Bearer xxxx")
            expect(result.status).toBe(httpStatus.UNAUTHORIZED);
          })
    
          describe("when token is valid", () => {
            it("should respond with status 404 when no enrollment", async () => {
              const token = await generateValidToken();
        
              const result = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
             
              expect(result.status).toBe(404)});
    
            it("should respond with status 404 when no ticket", async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                await createEnrollmentWithAddress(user);
    
                const result = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
               
                expect(result.status).toBe(404)}); 
            })
    
              it("should respond with status 404 when payment required", async () => {
                 const user = await createUser();
                 const token = await generateValidToken(user);
                 const enrollment = await createEnrollmentWithAddress(user);
                
                 const result = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
                 console.log('a seguir result e outros =>', result.status)
                 expect(result.status).toBe(404)});