import { Controller, Param, Post, Get, Patch, Delete, Body, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(
    //se inyecta el servicio de Producto, por ende ya se tiene acesso a todo los metodos del SV
    @Inject(PRODUCT_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){

    return this.client.send({ cmd: 'create_product' }, createProductDto );

  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string){

    //opcion 1 para atrapar el error (observable)
    return this.client.send({ cmd: 'find_one_product'}, { id })
    .pipe(
      catchError( err => {throw new RpcException(err)})
    );

  //Opcion 2 con promesa

    //  try {
    
  //   const product = await firstValueFrom(
  //     this.productsClient.send({ cmd: 'find_one_product'}, { id })
  //   );
    
  //   return product;

  //  } catch (error) {
  //   throw new RpcException(error); // de aqui el error se va al main
  //  }
   
  }

  @Get()
  findAllProducts(@Query() paginationDTO: PaginationDTO){
    return this.client.send({ cmd: 'find_all_product '}, paginationDTO);
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ){
    
    return this.client.send({ cmd: 'update_product'}, {
      id,
      ...updateProductDto
    }).pipe(
      catchError( err => { throw new RpcException(err) })
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    //Si se manda el id sin las {} se envia como String, al enviarlo{id} se envia como propiedad de objeto
    return this.client.send({ cmd: 'delete_product'}, { id }) 
    .pipe(
      catchError( err => {throw new RpcException(err)})
    );
  }
  
  
}
