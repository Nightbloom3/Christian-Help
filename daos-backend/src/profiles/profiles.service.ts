import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDTO } from './dtos/create-profile.dto';
import { InstrumentDTO } from './dtos/instrument-profile.dto';
import { UpdateNewsletterProfileDTO } from './dtos/update-newsletter-profile.dto';
import { UpdatePasswordProfileDTO } from './dtos/update-password-profile.dto';
import { UpdateProfileDTO } from './dtos/update-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class ProfilesService {
    // Dependency injection = imports data for use
    // Dependency injection - profile model
    constructor(@InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>) {}

    // async findOne(email: string): Promise<Profile | undefined> {
    //     return this.profileModel.findOne({ email: email });
    // }

    async findOne(email: string): Promise<Profile | undefined> {
        return await this.profileModel.findOne({ email: email });
        // let foundProfile = this.profileModel.findOne({ email: email });
        // return await foundProfile;
    }

    async findAll(): Promise<Profile[]> {
        return await this.profileModel.find({});
    }
    
    async findSpecific(id: string): Promise<Profile> {
        return await this.profileModel.findOne({ _id: id });
    }

    async create(profile: CreateProfileDTO): Promise<Profile> {
        const newProfile = new this.profileModel(profile);
        //encrypting the incoming password from the user to a 10 character string
        const hash = await bcrypt.hash(newProfile.password, 10);
        newProfile.password = hash;
        return await newProfile.save();
    }

    async update(id: string, profile: UpdateProfileDTO): Promise<Profile> {
        return await this.profileModel.findByIdAndUpdate(id, profile);
    }

    async updatePassword(id: string, profile: UpdatePasswordProfileDTO): Promise<Profile> {
        return await this.profileModel.findByIdAndUpdate(id, profile);
    }
    
    async updateNewsletter(id: string, profile: UpdateNewsletterProfileDTO): Promise<Profile> {
        return await this.profileModel.findByIdAndUpdate(id, profile);
    }

    async delete(id: string): Promise<Profile> {
        return await this.profileModel.findByIdAndDelete(id);
    }

    async addInstrument(id: string, instrument: InstrumentDTO): Promise<Profile> {
        // Finds the specific profile's instrument array
        const profile = await this.profileModel.findById(id);
        const instrumentArray = profile.instruments;

        // Adds the instrument to instrument array
        instrumentArray.push(instrument);
        return await profile.save();
    }

    async editInstrument(id: string, instrumentId: string, instrument: InstrumentDTO): Promise<Profile> {
        // Finds the specific profile's instrument array
        const profile = await this.profileModel.findById(id);
        const instrumentArray = profile.instruments;

        // Iterating through instrumentArray to find the index
        // where it matches with the instrumentId given.
        const index = instrumentArray.findIndex((instrument:any) => {
            return instrument._id == instrumentId;
        });

        // Replaces old instrument values with new instrument values
        instrumentArray[index] = instrument;
        return await profile.save();
    }

    async removeInstrument(id: string, instrumentId: string): Promise<Profile> {
        // Finds the specific profile's instrument array
        const profile = await this.profileModel.findById(id);
        const instrumentArray = profile.instruments;

        // Deleting the instrument
        // Filter creates a new array with everything except
        // the instrument that is to be deleted
        const newInstrumentArray = instrumentArray.filter((instrument:any) => {
            return instrument._id != instrumentId;
        });

        profile.instruments = newInstrumentArray

        // Saves the new instrumentArray
        return await profile.save();
    }

    deleteMany(deleteCriteria: any) {
        return this.profileModel.deleteMany(deleteCriteria);
    }
}