import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { YatraService } from '../service/yatra.service';
  import { SearchHotelDto } from '../dto/search-hotel.dto';
  import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { YatraTransformService } from 'src/service/yatra.transform.service';
  
  @ApiTags('Yatra')
  @Controller('hotel-services/v1/hotels')
  export class YatraController {
    [x: string]: any;
    constructor(private readonly yatraService: YatraService) {}
  
    @Post('search')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @ApiResponse({ status: 200, description: 'Hotel search success' })
    async searchHotels(@Body() body: SearchHotelDto) {
      return this.yatraService.searchHotelsService(body);
    }

  //   @ApiTags('Yatra')
  // @Controller('hotel-services/v1/hotels')
  // export class YatraController {
  // constructor(
  //   private readonly transformService: YatraTransformService,
  // ) {}
  
  //   @Post('search')
  //   @UsePipes(new ValidationPipe({ whitelist: true }))
  //   @ApiResponse({ status: 200, description: 'Transformed hotel search result' })
  //   async getHotels(@Body() body: SearchHotelDto) {
  //   return this.transformService.transformAndFetch(body);
  // }
  }
  