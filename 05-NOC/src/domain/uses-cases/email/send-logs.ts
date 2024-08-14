import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase{
    execute: (to:string | string[]) => Promise<Boolean>
}

export class SendMailLogs implements SendLogEmailUseCase{
    
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute(to: string | string[]){
        
        try {
            
            const sent = await this.emailService.sendEmailWithLogs(to);

            if(!sent) throw new Error('Fallo en el envío');

        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts'
            });

            this.logRepository.saveLog(log);
        }

        return true;
    }
}