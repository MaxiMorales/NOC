import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";


describe('LogModel',() => {

    beforeAll(async()=>{
        await MongoDataBase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    });

    afterAll(()=>{
        mongoose.connection.close();
    })

    test('return LogModel',async() => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }

        const log = await LogModel.create(logData);

       // console.log(log);

        expect(log).toEqual(expect.objectContaining({
            ...logData, 
            id:expect.any(String),
            createdAt: expect.any(Date)
        }));


    });
});