import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartNumberService } from './part-number/part-number.service';
import { PartNumberController } from './part-number/part-number.controller';

@Module({
  imports: [],
  controllers: [AppController, PartNumberController],
  providers: [AppService, PartNumberService],
})
export class AppModule {}
