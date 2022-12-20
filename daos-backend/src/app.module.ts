import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesModule } from './profiles/profiles.module';
import { EnsemblesModule } from './ensembles/ensembles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProfilesModule,
    EnsemblesModule,
    AuthModule,
    // Test DB
    //MongooseModule.forRoot('mongodb://localhost:27017/daostest'),
    // Production DB
    MongooseModule.forRoot('mongodb://localhost:27017/daos'),
    // DB connection for atlas 
    //MongooseModule.forRoot('mongodb+srv://NewTestUser:newtestuser1234@kvalifik.tjk5bqh.mongodb.net/test'),
  ],
})
export class AppModule {}