import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from 'dotenv';
import { SearchHotelDto } from '../dto/search-hotel.dto';

config();

@Injectable()
export class YatraService {
  [x: string]: any;
  async searchHotelsService(body: SearchHotelDto) {
    const { city, checkInDate, checkOutDate, rooms, vendorIds } = body;

    if (!process.env.YATRA_BASE_URL || !process.env.YATRA_API_KEY) {
      throw new Error('Missing required Yatra API environment variables');
    }

    const roomQueryParams = rooms
      .map((room, index) => {
        const base = `rooms[${index}].noOfAdults=${room.noOfAdults}&rooms[${index}].noOfChildren=${room.noOfChildren}`;
        const childrenAges = room.noOfChildren > 0
          ? `&${Array.from({ length: room.noOfChildren })
              .map((_, ageIndex) => `rooms[${index}].childrenAge[${ageIndex}]=10`)
              .join('&')}`
          : '';
        return base + childrenAges;
      })
      .join('&');

    // const url = `${process.env.YATRA_BASE_URL}?city=${city}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&${roomQueryParams}&vendorIds=${vendorIds}`;
    let url = `${process.env.YATRA_BASE_URL}?city=${city}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&${roomQueryParams}`;

    if (vendorIds) {
      url += `&vendorIds=${vendorIds}`;
    }
    
    const headers = {
      'X-Api-Key': process.env.YATRA_API_KEY,
      'X-Correlation-Id': 'your_correlation_id_here',
    };


    //error log 
    console.log('Final Yatra API URL:', url);
    // console.log('Yatra API Headers:', headers);
    // console.log('Yatra API Body:', body);
    // console.log('Yatra API Request:', {
    //   method: 'GET',
    //   // url,
    //   headers,
    //   data: body,
    // });

//////upto here

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error('Error calling Yatra API:', error?.response?.data || error.message);
      throw new Error(error?.response?.data?.message || 'Yatra API failed');
    }
  }
}
