import { Injectable } from '@nestjs/common';
import { YatraService } from './yatra.service';
import { SearchHotelDto } from '../dto/search-hotel.dto';

@Injectable()
export class YatraTransformService {
  constructor(private readonly yatraService: YatraService) {}

  async transformAndFetch(body: SearchHotelDto) {
    const rawResponse = await this.yatraService.searchHotelsService(body);


    const hotels = rawResponse?.data?.hotels || [];

    const transformed = hotels.map((hotel) => {
      const rate = hotel.rates?.[0];
      const pricing = rate?.pricing;

      return {
        id: hotel.id,
        name: hotel.vendorName,
        starRating: hotel.starRating,
        image: hotel.images?.[0]?.url || null,
        pricePerNight: pricing?.perNight?.price || null,
        priceTotal: pricing?.total?.price || null,
        currency: rate?.currency || 'INR',
        freeCancellation: rate?.cancellation?.freeCancellation || false,
        roomName: rate?.roomName,
        location: `${hotel.address.area}, ${hotel.address.city}`,
        coordinates: {
          lat: hotel.address.latitude,
          lng: hotel.address.longitude
        },
        amenities: hotel.amenities?.slice(0, 5) || []
      };
    });

    return {
      status: 'success',
      count: transformed.length,
      data: transformed
    };
  }
}
