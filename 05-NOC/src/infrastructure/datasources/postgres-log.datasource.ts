import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity,LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();

export class PostgresLogDataSource implements LogDataSource{

    getLevel(level:string | LogSeverityLevel):SeverityLevel {
        if(level == 'high' || level == 'HIGH' || level == LogSeverityLevel.high) return SeverityLevel.HIGH;
        if(level == 'medium' || level == 'MEDIUM'|| level == LogSeverityLevel.medium) return SeverityLevel.MEDIUM;
        return SeverityLevel.LOW;
    }

    async saveLog(log: LogEntity): Promise<void> {

        const {message,origin,level,createdAt} = log;

        console.log(log);
        const nivel = this.getLevel(level);
        console.log(nivel);
        await prismaClient.logModel.create({data: {message:message,origin:origin,level:'LOW'}});
        
        //console.log(pris);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const nivel = this.getLevel(severityLevel);
        const logs = prismaClient.logModel.findMany({ where:{ level: nivel } });
        return (await logs).map(LogEntity.fromObject);
    }

}