import { Controller, Get } from '@nestjs/common';

@Controller('races') // Dit stelt de route '/api/races' in
export class AppController {
  @Get()
  getRaces() {
    return [
      { name: 'Grand Prix Monaco', date: '2024-05-26' },
      { name: 'Grand Prix Silverstone', date: '2024-07-07' },
    ];
  }
}