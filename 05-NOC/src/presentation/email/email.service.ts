import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface sendMailOptions{
    to:string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]
}

interface Attachment{
    filename:string,
    path: string
}

export class EmailService {

    constructor(){
        
    }

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: sendMailOptions):Promise<boolean>{
        const {to,subject,htmlBody,attachments = []} = options;

        console.log(options);
        try {
            const sentInformation = await this.transporter.sendMail({to:to,subject:subject,html:htmlBody,attachments:attachments});

            console.log(sentInformation);

            const log = new LogEntity({level:LogSeverityLevel.low,message:'Email Sent',origin:'email.service.ts'});

           
            
            return true;
        } catch (error) {
           
            
            const log = new LogEntity({level:LogSeverityLevel.low,message:'Email not Sent',origin:'email.service.ts'});

            
            return false;
        }
    }

    sendEmailWithLogs(to: string | string[]){
        const subject = 'Log server';
        const htmlBody = 'cuerpo';

        const attachments:Attachment[] = [
            {filename: 'logs-all.log', path:'logs/logs-all.log'},
            {filename: 'logs-mid.log', path:'logs/logs-mid.log'},
            {filename: 'logs-high.log', path:'logs/logs-high.log'},

        ];

        return this.sendEmail({to,subject,htmlBody,attachments});
        
    }

}