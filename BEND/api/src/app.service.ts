import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './teams/models/teams.entity';
import { Tournament } from './tournaments/models/tournaments.entity';

@Injectable()
export class AppService {

  constructor(
 
  ){}

  seed() {
     
  }
  getHello(): string {
    return 'Hello World!';
  }
  
}
