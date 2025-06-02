import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FunctionsModule } from "./functions/functions.module";
import { TheatersModule } from "./theaters/theaters.module";
import { TicketsModule } from "./tickets/tickets.module";
import {ConfigModule} from "@nestjs/config"
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: +(process.env.port || 5432),
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    FunctionsModule,
    TheatersModule,
    TicketsModule,
    UsersModule,
    MoviesModule,
    SeatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
