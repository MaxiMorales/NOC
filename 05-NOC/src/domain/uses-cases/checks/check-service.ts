import { LogEntity, LogEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
const path = require('path');
interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
}


type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;


export class CheckService implements CheckServiceUseCase{


    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallback
    ){}

    public async execute(url:string): Promise<boolean>{

        let msg = '';
        try {
            
            const req = await fetch(url);

            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
                
            }
             msg = `Service ${url} funcionando.`;
            const options:LogEntityOptions = {message: msg,level:LogSeverityLevel.low,origin: path.basename(__filename)};

            const log = new LogEntity(options);
            this.logRepository.saveLog(log);

            this.successCallback();
            return true;
        } catch (error) {
             msg = `${url} is not ok. ${error}`;
             const options:LogEntityOptions = {message: msg,level:LogSeverityLevel.high,origin: path.basename(__filename)};
             
            const log = new LogEntity(options);
            console.log(log);
            this.logRepository.saveLog(log);
            this.errorCallback(msg);

            return false;
        }
        
    }
}