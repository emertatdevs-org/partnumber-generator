import { Controller, Get } from '@nestjs/common';
import { PartNumberService } from './part-number.service';

@Controller('part-number')
export class PartNumberController {
  constructor(private readonly partNumberService: PartNumberService) {}

  // یک روت برای تولید و ذخیره پارت‌نامبرها در فایل JSON
  @Get('generate')
  generatePartNumbers() {
    const filename = 'part-numbers.json';
    this.partNumberService.savePartNumbersToJson(filename);
    return { message: 'Part numbers generated and saved to ' + filename };
  }
}
