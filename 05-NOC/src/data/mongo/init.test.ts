import mongoose from "mongoose";
import { MongoDataBase } from "./init";

describe('init mongoDB', ()=>{
    afterAll(() => {mongoose.connection.close();})
    test('connection', async ()=>{
        //console.log(process.env);
        const connected = await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
            
        });
        //console.log(connected);
        expect(connected).toBe(true);
    });

    test('should error',async()=>{
        try {
            const connect = await MongoDataBase.connect({
                mongoUrl: process.env.MONGO_URL!,
                dbName: 'asdasdasd',
            });

            expect(true).toBe(false);
        } catch (error) {
            
        }
    });
});