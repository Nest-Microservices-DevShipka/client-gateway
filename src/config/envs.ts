// Esto se guardo en un snippet con el comando: micro-envs

import 'dotenv/config';
import * as joi from 'joi';

//valida que el puerto sea un numero
interface EnvVars{
    PORT: number;
    // NATS_SERVERS: string[];

    PRODUCTS_MICROSERVICE_HOST: string;
    PRODUCTS_MICROSERVICE_PORT: number;
  
    ORDERS_MICROSERVICE_HOST: string;
    ORDERS_MICROSERVICE_PORT: number;
}

// El puerto tiene que ser obligatorio

const envSchema = joi.object({

    PORT: joi.number().required(),

    // NATS_SERVERS: joi.array().items( joi.string() ).required(),

    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true);

// desestructura esas variables del .env
// const { error, value } = envSchema.validate( {
//     ...process.env,
//     NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
// });

const { error, value } = envSchema.validate( process.env );


//creacion del mensaje de error
if(error){
    throw new Error(`Config validation error: ${error.message}`);
}

//cambia tipo de dato de any a number
const envVars: EnvVars = value;

//variables globales del puerto y db
export const envs ={
    port: envVars.PORT,

    productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
  
    ordersMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
    ordersMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,
    
    // natsServers: envVars.NATS_SERVERS,

}