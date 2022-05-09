import { Injectable } from '@nestjs/common';

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
