import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';
import { Film } from '../entities/film.entity';
import { Person } from '../entities/person.entity';
import { Genre } from '../entities/genre.entity';
import { FilmCredit, CreditType } from '../entities/film-credit.entity';
import { FilmGenre } from '../entities/film-genre.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(FilmCredit)
    private filmCreditRepository: Repository<FilmCredit>,
    @InjectRepository(FilmGenre)
    private filmGenreRepository: Repository<FilmGenre>,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedAdmin();
    await this.seedFilms();
  }

  private async seedAdmin() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    const adminName = this.configService.get<string>('ADMIN_NAME');

    if (!adminEmail || !adminPassword || !adminName) {
      this.logger.warn(
        'Admin credentials (ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME) not found in env. Skipping admin seeding.',
      );
      return;
    }

    const adminCount = await this.userRepository.count({
      where: { role: UserRole.ADMIN },
    });

    if (adminCount === 0) {
      this.logger.log('No admin found. Creating default admin...');
      
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(adminPassword, salt);

      const admin = this.userRepository.create({
        name: adminName,
        email: adminEmail,
        passwordHash,
        role: UserRole.ADMIN,
      });

      await this.userRepository.save(admin);
      this.logger.log(`Admin user created: ${adminEmail}`);
    } else {
      this.logger.log('Admin user already exists. Skipping seeding.');
    }
  }

  private async seedFilms() {
    const count = await this.filmRepository.count();
    if (count > 0) {
      this.logger.log('Films already exist. Skipping film seeding.');
      return;
    }

    this.logger.log('Seeding films...');

    // 1. Create Genres
    const genresData = [
      'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
      'Drama', 'Family', 'Fantasy', 'History', 'Horror',
      'Music', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
    ];

    const genreMap = new Map<string, Genre>();
    for (const name of genresData) {
      let genre = await this.genreRepository.findOne({ where: { name } });
      if (!genre) {
        genre = this.genreRepository.create({ name });
        await this.genreRepository.save(genre);
      }
      genreMap.set(name, genre);
    }

    // 2. Define Films Data
    const filmsData = [
      {
        title: 'The Dark Knight',
        year: 2008,
        posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        director: 'Christopher Nolan',
        actors: ['Christian Bale', 'Heath Ledger'],
        genres: ['Action', 'Crime', 'Drama']
      },
      {
        title: 'The Godfather',
        year: 1972,
        posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        director: 'Francis Ford Coppola',
        actors: ['Marlon Brando', 'Al Pacino'],
        genres: ['Crime', 'Drama']
      },
      {
        title: 'Pulp Fiction',
        year: 1994,
        posterUrl: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        director: 'Quentin Tarantino',
        actors: ['John Travolta', 'Uma Thurman'],
        genres: ['Crime', 'Drama']
      },
      {
        title: 'The Shawshank Redemption',
        year: 1994,
        posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
        synopsis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        director: 'Frank Darabont',
        actors: ['Tim Robbins', 'Morgan Freeman'],
        genres: ['Drama', 'Crime']
      },
      {
        title: 'Fight Club',
        year: 1999,
        posterUrl: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        synopsis: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
        director: 'David Fincher',
        actors: ['Brad Pitt', 'Edward Norton'],
        genres: ['Drama']
      },
      {
        title: 'Forrest Gump',
        year: 1994,
        posterUrl: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
        synopsis: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
        director: 'Robert Zemeckis',
        actors: ['Tom Hanks', 'Robin Wright'],
        genres: ['Drama', 'Romance']
      },
      {
        title: 'Goodfellas',
        year: 1990,
        posterUrl: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
        synopsis: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
        director: 'Martin Scorsese',
        actors: ['Robert De Niro', 'Ray Liotta'],
        genres: ['Biography', 'Crime', 'Drama']
      },
      {
        title: 'Se7en',
        year: 1995,
        posterUrl: 'https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg',
        synopsis: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
        director: 'David Fincher',
        actors: ['Brad Pitt', 'Morgan Freeman'],
        genres: ['Crime', 'Drama', 'Mystery']
      },
      {
        title: 'The Silence of the Lambs',
        year: 1991,
        posterUrl: 'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg',
        synopsis: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
        director: 'Jonathan Demme',
        actors: ['Jodie Foster', 'Anthony Hopkins'],
        genres: ['Crime', 'Drama', 'Thriller']
      },
      {
        title: 'Life Is Beautiful',
        year: 1997,
        posterUrl: 'https://image.tmdb.org/t/p/w500/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg',
        synopsis: 'When an open-minded Jewish librarian and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.',
        director: 'Roberto Benigni',
        actors: ['Roberto Benigni', 'Nicoletta Braschi'],
        genres: ['Comedy', 'Drama', 'Romance']
      },
      {
        title: 'The Green Mile',
        year: 1999,
        posterUrl: 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        synopsis: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        director: 'Frank Darabont',
        actors: ['Tom Hanks', 'Michael Clarke Duncan'],
        genres: ['Crime', 'Drama', 'Fantasy']
      },
      {
        title: 'Saving Private Ryan',
        year: 1998,
        posterUrl: 'https://image.tmdb.org/t/p/w500/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg',
        synopsis: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
        director: 'Steven Spielberg',
        actors: ['Tom Hanks', 'Matt Damon'],
        genres: ['Drama', 'War']
      },
      {
        title: 'Parasite',
        year: 2019,
        posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
        director: 'Bong Joon Ho',
        actors: ['Song Kang-ho', 'Lee Sun-kyun'],
        genres: ['Drama', 'Thriller']
      },
      {
        title: 'Gladiator',
        year: 2000,
        posterUrl: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
        synopsis: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        director: 'Ridley Scott',
        actors: ['Russell Crowe', 'Joaquin Phoenix'],
        genres: ['Action', 'Adventure', 'Drama']
      }
    ];

    // 3. Create People
    const peopleSet = new Set<string>();
    filmsData.forEach(f => {
      if (f.director) peopleSet.add(`${f.director}|DIRECTOR`);
      if (f.actors) f.actors.forEach(a => peopleSet.add(`${a}|ACTOR`));
    });

    const personMap = new Map<string, Person>();
    for (const item of peopleSet) {
      const [name, role] = item.split('|');
      let person = await this.personRepository.findOne({ where: { fullName: name } });
      if (!person) {
        person = this.personRepository.create({
          fullName: name,
          primaryRole: role as 'ACTOR' | 'DIRECTOR',
          bio: `This is a bio for ${name}.`
        });
        await this.personRepository.save(person);
      }
      personMap.set(name, person);
    }

    // 4. Insert Films and Relations
    for (const f of filmsData) {
        const film = this.filmRepository.create({
            title: f.title,
            releaseYear: f.year,
            posterUrl: f.posterUrl,
            synopsis: f.synopsis,
        });
        await this.filmRepository.save(film);

        // Add Genres
        if (f.genres) {
            for (const gName of f.genres) {
                const genre = genreMap.get(gName);
                if (genre) {
                     const filmGenre = this.filmGenreRepository.create({ film, genre });
                     await this.filmGenreRepository.save(filmGenre);
                }
            }
        }

        // Add Director
        if (f.director) {
            const director = personMap.get(f.director);
            if (director) {
                const credit = this.filmCreditRepository.create({
                    film,
                    person: director,
                    creditType: CreditType.DIRECTOR
                });
                await this.filmCreditRepository.save(credit);
            }
        }

        // Add Actors
        if (f.actors) {
            for (const actorName of f.actors) {
                const actor = personMap.get(actorName);
                if (actor) {
                     const credit = this.filmCreditRepository.create({
                        film,
                        person: actor,
                        creditType: CreditType.ACTOR
                    });
                    await this.filmCreditRepository.save(credit);
                }
            }
        }
    }

    this.logger.log('Films seeded successfully!');
  }
}
