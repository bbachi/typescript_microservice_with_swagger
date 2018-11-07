const fs = require('fs');
import * as path from 'path';

//This class is created to replace runtime environment properties and to keep file changes to minimum
export class EnvironmentConfig {

      public static NODE_ENV = EnvironmentConfig.getEnvironment();
      public static ENVIRONMENT: any = undefined;

      public static getEnvConfig(): any {
        
        let configBuffer = null;
        if(EnvironmentConfig.ENVIRONMENT != undefined){
            return EnvironmentConfig.ENVIRONMENT;
        }else{
            switch (this.NODE_ENV) {
                
            case 'TEST':
                configBuffer = fs.readFileSync(path.resolve(process.cwd()+'/config/test.json'), 'utf-8');
                break;
            case 'DEVELOPMENT':
                configBuffer = fs.readFileSync(path.resolve(process.cwd()+'/config/development.json'), 'utf-8');
                break;
            case 'PRODUCTION':
                configBuffer = fs.readFileSync(path.resolve(process.cwd()+'/config/production.json'), 'utf-8');
                break;
            default:
                configBuffer = fs.readFileSync(path.resolve(process.cwd()+'/config/development.json'), 'utf-8');
        }
        EnvironmentConfig.ENVIRONMENT = JSON.parse(configBuffer);
        return JSON.parse(configBuffer);
      }
    }

    
    public static getEnvironment(): string {
        
        let envVar: string = "test";
        try{
            const argsArray = process.argv.slice(2);
            const envIndex = argsArray.findIndex((value) => value === "--env");
            envVar = argsArray[envIndex+1];
        }catch(err){
            console.log("ERROR READING ENVIRONMENT::::::"+err.message)
        }
        console.log("READING AND BUILDING FOR THE ENVIRONMENT::::::"+envVar)
        return envVar.toUpperCase();
    }
}