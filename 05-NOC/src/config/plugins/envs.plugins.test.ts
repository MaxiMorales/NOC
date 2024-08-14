import { envs } from "./envs.plugin";


describe('Envs', ()=>{

    test('Return env opt',()=>{
        
        expect(envs).toEqual(
            {
                PORT: 3000,
                MAILER_EMAIL: 'maxuu1999@gmail.com',
                PROD: false,
                MAILER_SECRET_KEY: 'aiqforsxiuhznyzp',
                MAILER_SERVICE: 'gmail',
                MONGO_URL: 'mongodb://Maximiliano:123456789@localhost:27017/',
                MONGO_DB_NAME: 'NOC-TEST',
                MONGO_USER: 'Maximiliano',
                MONGO_PASS: '123456789'
              }
        )
    });

    test('return err if not env',async()=>{
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });

});