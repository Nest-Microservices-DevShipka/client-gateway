import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE, // se ocupa para inyectar los MS en los controladores o en otras partes
        // Tiene que tener el mismo protocolo que en el servicio (TCP en MS products) eso se ve en el main del MS
        transport: Transport.NATS,
        

        options: {
          servers: envs.natsServers, 

        // host: envs.productsMicroserviceHost,
        // port: envs.productsMicroservicePort
        }

      },

    ]),
  ]
})
export class ProductsModule {

  /* 
  constructor(){
    console.log(envs); // asi se pueden revisar las variables globales del envs
  }
    */
}
