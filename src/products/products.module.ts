import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCT_SERVICE, // se ocupa para inyectar los MS en los controladores o en otras partes
        // Tiene que tener el mismo protocolo que en el servicio (TCP en MS products) eso se ve en el main del MS
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort
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
