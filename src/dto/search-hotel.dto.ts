import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class RoomGuestDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  @Max(5)
  noOfAdults: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  @Max(4)
  noOfChildren: number;
}

export class SearchHotelDto {
  @ApiProperty({ example: 'Mumbai' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: '2025-04-28' })
  @IsDateString()
  checkInDate: string;

  @ApiProperty({ example: '2025-05-01' })
  @IsDateString()
  checkOutDate: string;

  @ApiProperty({
    type: [RoomGuestDto],
    example: [{ noOfAdults: 2, noOfChildren: 1 }],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RoomGuestDto)
  rooms: RoomGuestDto[];

  @ApiPropertyOptional({ example: 'vendor1,vendor2' })
  @IsOptional()
  @IsString()
  vendorIds?: string;
}
