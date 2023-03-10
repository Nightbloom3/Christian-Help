import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // we are changing the predefined values from username to email
    // Because it fits our schema for a profile/user
    super({ usernameField: 'email' })
  }

  // Validating the input from the body ( Frontend )
  async validate(email: string, password: string): Promise<any> {
    // Returns the profile found in the database
    const profile = await this.authService.validateProfile(email, password);
    console.log("local.strategy - Validate", profile);
    console.log(password)

    if (!profile) {
      console.log("you do not have access to this");
      //throw new UnauthorizedException();
      throw new UnauthorizedException('The password is incorrect');
    }

    console.log("you do have access");
    // Saved as request object by passport
    return profile;
  }
}
