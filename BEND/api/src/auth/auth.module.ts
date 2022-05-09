import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PlayersModule } from 'src/players/players.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';


@Module({
  imports: [ 
    PlayersModule,
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '30d'} // Le token est aussi long, car l'application n'ayant aucune données sensibles et se veut être une application de logistique, il n'y a donc pas besoin de le raccourcir afin d'éviter à l'utilisateur de devoir se reconnecter à chaque fois.
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthController],
  exports : [AuthService],
})
export class AuthModule {}
