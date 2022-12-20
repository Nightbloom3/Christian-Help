import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './../../src/auth/auth.service';
import { JwtAuthGuard } from './../../src/auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../../src/auth/guards/local-auth.guard';
// import { AuthService } from 'src/auth/auth.service';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
// import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

import { CreateProfileDTO } from './dtos/create-profile.dto';
import { InstrumentDTO } from './dtos/instrument-profile.dto';
import { UpdateNewsletterProfileDTO } from './dtos/update-newsletter-profile.dto';
import { UpdatePasswordProfileDTO } from './dtos/update-password-profile.dto';
import { UpdateProfileDTO } from './dtos/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { Profile } from './schemas/profile.schema';

@Controller('profiles')
export class ProfilesController {
    // Dependency injection = imports data for use
    // Dependency injection - profiles service
    constructor(private readonly profilesService: ProfilesService, private authService: AuthService) {}

    // Recives a login request from the frontend
    // The endpoint is "guarded" by the LocalAuthGuard
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      return this.authService.login(req.user).catch(() => {
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      });
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('auth/login')
    // async login(@Request() req) {
    //     console.log(req.user)
    //   return this.authService.login(req.user);
    //   // The request has to be a user request
    //   // if profile request it becomes undefined
    // }

    // This is just a test route to see auth working  
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getProfile(@Request() req) {
      return req.user;
    }

    // URL = /profiles
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Profile[]> {
        return this.profilesService.findAll().then((result) => {
            if(!(result.length === 0)) {
                return result;
            } else {
                throw new HttpException('Profiles not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }

    @Post()
    async create(@Body() createProfile: CreateProfileDTO): Promise<any> {
        // Creates a new profile object to the data, and returns a payload of profile
        const profile = await this.profilesService.create(createProfile)
        return this.authService.login(profile);
    }

    // URL = /profiles/:id
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findSpecific(@Param('id') id): Promise<Profile> {
        return this.profilesService.findSpecific(id).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateProfile: UpdateProfileDTO): Promise<Profile> {
        return this.profilesService.update(id, updateProfile).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Profile> {
        return this.profilesService.delete(id).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }

    // URL = /profiles/:id/password
    @Put(':id/password')
    updatePassword(@Param('id') id, @Body() updatePasswordProfile: UpdatePasswordProfileDTO): Promise<Profile> {
        return this.profilesService.updatePassword(id, updatePasswordProfile).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }

    // URL = /profiles/:id/newsletter
    @Put(':id/newsletter')
    updateNewsletter(@Param('id') id, @Body() updateNewsletterProfile: UpdateNewsletterProfileDTO): Promise<Profile> {
        return this.profilesService.updateNewsletter(id, updateNewsletterProfile).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }

    // URL = /profiles/:id/instrument
    @Post(':id/instrument')
    addInstrument(@Param('id') id, @Body() addInstrument: InstrumentDTO): Promise<Profile> {
        return this.profilesService.addInstrument(id, addInstrument).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }

    // URL = /profiles/:id/instrument/:id
    @Put(':id/instrument/:instrumentId')
    editInstrument(@Param() params, @Body() editInstrument: InstrumentDTO): Promise<Profile> {
        return this.profilesService.editInstrument(params.id, params.instrumentId, editInstrument).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }
    
    @Delete(':id/instrument/:instrumentId')
    removeInstrument(@Param() params): Promise<Profile> {
        return this.profilesService.removeInstrument(params.id, params.instrumentId).then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }
        }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });
    }
}