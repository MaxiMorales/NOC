import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel,  } from "../../domain/entities/log.entity";


export class MongoLogDataSource implements LogDataSource{

    async saveLog(log: LogEntity): Promise<void> {
        
        const newLog = await LogModel.create(log);
        newLog.save();
        console.log('mongo log created');
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        console.log('Entra acá');
        const logs = await LogModel.find({level: severityLevel});
        return logs.map( LogEntity.fromObject);
    }


}