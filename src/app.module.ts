import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [ProductsModule, OrdersModule],
 // controllers: [],//Nest can't resolve dependencies of the ProductsController (?).
  //providers: [],
})
export class AppModule {}
