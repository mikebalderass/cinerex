import { forwardRef, Module } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { TheatersController } from './theaters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theater } from './entities/theater.entity';
import { FunctionsModule } from 'src/functions/functions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Theater]), forwardRef(() => FunctionsModule)],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
