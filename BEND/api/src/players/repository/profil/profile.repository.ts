import { getRepository, Repository, UpdateResult } from "typeorm";
import { ProfileDTO } from "../../DTO/profil/profileDTO";
import { Profile } from "../../models/profile/profile.entity";


export class ProfileRepository extends Repository<Profile> {

    async updateProfile(idProfile: number, profileDTO: ProfileDTO): Promise<UpdateResult> {
        const profileRepo = getRepository(Profile);
        return await profileRepo.update(idProfile, profileDTO); 
    }
}