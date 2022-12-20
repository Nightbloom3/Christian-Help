import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EnsemblesModule } from './ensembles/ensembles.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
    imports: [
      ProfilesModule,
      EnsemblesModule,
      AuthModule,
      // Test DB
      MongooseModule.forRoot('mongodb://localhost:27017/daostest'),
    ],
  })
export class TestModule {}