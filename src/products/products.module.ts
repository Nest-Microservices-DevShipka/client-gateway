import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [

    NatsModule
    // ClientsModule.register([
    //   {
    //     name: NATS_SERVICE, // se ocupa para inyectar los MS en los controladores o en otras partes
    //     // Tiene que tener el mismo protocolo que en el servicio (TCP en MS products) eso se ve en el main del MS
    //     transport: Transport.NATS,
        

    //     options: {
    //       servers: envs.natsServers, 

    //     // host: envs.productsMicroserviceHost,
    //     // port: envs.productsMicroservicePort
    //     }

    //   },

    // ]),
  ]
})
export class ProductsModule {

  /* 
  constructor(){
    console.log(envs); // asi se pueden revisar las variables globales del envs
  }
    */
}
