import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GenresModule } from './genres/genres.module';
import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommentsModule } from './comments/comments.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('SQLITE_PATH', './data/app.sqlite'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Local development only
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GenresModule,
    PeopleModule,
    FilmsModule,
    ReviewsModule,
    CommentsModule,
    SeedModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
