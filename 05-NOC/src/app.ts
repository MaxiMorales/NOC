import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDataBase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(
    async()=>{
        await main();
    }
)();

async function main(){
    
     await MongoDataBase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    });

/*     const prisma = new PrismaClient();
    const newLog = await prisma.logModel.create({
        data:{
            level:'LOW',
            origin: 'app.ts',
            message: 'Test msg'
        }
    }); */

    //console.log(newLog);
    /*const newLog = await LogModel.create({
        message: 'test msj',
        origin: 'App.ts',
        level: 'low'
    }); */

    //await newLog.save();
    //console.log(newLog);
    Server.start();
    //console.log(envs.MAILER_SECRET_KEY);


/*     const logs = await LogModel.find();
    console.log(logs); */
}