import { Injectable } from '@nestjs/common';
import { ProfilesService } from 'src/profiles/profiles.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly jwtService: JwtService
) {}

  async validateProfile(email: string, password: string): Promise<any> {
    // Calling the findOne function from profileService - based on the Email form body
    const profile = await this.profilesService.findOne(email);
    const validPassword = await bcrypt.compare(password, profile.password);
      
    if (profile && validPassword === true) {
      console.log(" ValidateProfile - Auth Service - True",profile);
    return profile;

        //TODO: Follow up on why this happens - and solve it by mongo Doc as Christian talked about
    // if this becomes an spread operator
    // So we can exclud password being send
    // It fucks up something els becoming undefined

    // if (profile && profile.password === password) {
    //   const { password, ...result } = profile;
    //   return result;
    // }
  }
  return null;
}

  async login(profile: any) {
    console.log("Profiles email for sign - payload is", profile.email)
    const payload = { email: profile.email, password: profile.password };
    return {
      // will sign the payload with the choosen key in jwt.Strategy
      access_token: this.jwtService.sign(payload),
      profileId: profile._id.toString()
    };
  }
}
