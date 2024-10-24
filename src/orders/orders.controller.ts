import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDTO, StatusDTO } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common';



@Controller('orders')
export class OrdersController {
  constructor(
    //se inyecta el servicio de Producto, por ende ya se tiene acesso a todo los metodos del SV
      @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ){}

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.ordersClient.send('createOrder', createOrderDto);
  // }

  @Post()
  create(@Body() createOrderDTO: CreateOrderDto){
    
    return this.client.send('createOrder', createOrderDTO)
    .pipe(
      catchError( err => {throw new RpcException(err)})
    );
  }

  @Get()
  findAll(@Query() orderPaginationDTO: OrderPaginationDTO) {
    
    return this.client.send('findAllOrders', orderPaginationDTO)
    .pipe(
      catchError( err => { throw new RpcException(err)})
    );
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', {id})
      );

      return order;

    } catch (error) {
      throw new RpcException(error);
    }
    
  }


  @Get(':status')
  async findByStatus(
    @Param() statusDTO: StatusDTO,
    @Query() paginationDTO: PaginationDTO  
  ) {
    
    try {
      return this.client.send('findAllOrders', {
        ...paginationDTO, 
        status: statusDTO.status,
      });
    


    } catch (error) {
      throw new RpcException(error);
    }
    
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDTO: StatusDTO,
  ){
      try {
        return this.client.send('changeOrderStatus', { id, status: statusDTO.status });
      } catch (error) {
        throw new RpcException(error);
      }



    
  }

}
