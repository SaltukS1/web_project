import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from './seed.service';
import { User } from '../entities/user.entity';
import { Film } from '../entities/film.entity';
import { Person } from '../entities/person.entity';
import { Genre } from '../entities/genre.entity';
import { FilmCredit } from '../entities/film-credit.entity';
import { FilmGenre } from '../entities/film-genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Film,
      Person,
      Genre,
      FilmCredit,
      FilmGenre,
    ]),
    ConfigModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
