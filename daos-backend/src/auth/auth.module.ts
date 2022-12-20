import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ProfilesController } from 'src/profiles/profiles.controller';
//import { ProfilesModule } from './../../src/profiles/profiles.module';
//import { ProfilesController } from './../../src/profiles/profiles.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';




@Module({
  imports: [
    ProfilesModule,
    PassportModule,
    JwtModule.register({
      // Key to sign payload / lock it
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30s' },
    }),
  ],
  controllers: [ProfilesController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
