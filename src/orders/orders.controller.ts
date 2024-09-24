import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { catchError } from 'rxjs';


@Controller('orders')
export class OrdersController {
  constructor(
    //se inyecta el servicio de Producto, por ende ya se tiene acesso a todo los metodos del SV
      @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
    ){}

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.ordersClient.send('createOrder', createOrderDto);
  // }

  @Post()
  create(@Body() createOrderDTO: CreateOrderDto){
    console.log('paso por aca');
    return this.ordersClient.send('createOrder', createOrderDTO)
    .pipe(
      catchError( err => {throw new RpcException(err)})
    );
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {})
    .pipe(
      catchError( err => { throw new RpcException(err)})
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', {});
  }


}
