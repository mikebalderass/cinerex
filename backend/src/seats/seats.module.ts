import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { FunctionsModule } from 'src/functions/functions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), forwardRef(() => FunctionsModule)],
  providers: [SeatsService],
  controllers: [SeatsController],
  exports: [SeatsService],
})
export class SeatsModule {}