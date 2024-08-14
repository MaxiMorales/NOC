import { SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/uses-cases/checks/check-service";
import { SendMailLogs } from "../domain/uses-cases/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const logRepository = new LogRepositoryImp(
    //new FileSystemDataSource(),
    //new MongoLogDataSource()
    new PostgresLogDataSource()
);
const emailService = new EmailService();
export class Server {

    public static async start(){

        console.log('Server started...');
        //new SendMailLogs(emailService, fileSysRepository).execute('maximiliano.morales@grupofava.com.ar');
        //emailService.sendEmail({to:'maximiliano.morales@grupofava.com.ar',subject:'Mail de prueba desde NODE',htmlBody:'Este es el cuerpo del correo.'});
        
/*         const logs = await logRepository.getLogs(LogSeverityLevel.medium);
        console.log(logs); */
        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        console.log(logs);

/*         const entidad = new LogEntity({message:'TST server',origin:'server.ts',level: LogSeverityLevel.low,createdAt: new Date()});
        await logRepository.saveLog(entidad); */
       

    // CronService.createJob(
    //    '*/5 * * * * *',
    //    () => {
    //      const url = 'https://google.com';


    //         new CheckService(
    //             logRepository,
    //             () => {console.log(`${url} is ok`);},
    //             (error) => {console.log(`${error}`);}
    //         ).execute(url);
        
    //    }
    //  ); 
    
    }

}
