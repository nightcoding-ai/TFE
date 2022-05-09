import { getRepository, Repository, UpdateResult } from "typeorm";
import { UpdatePlayerProfileDTO } from "../../DTO/player/updatePlayerProfileDTO";
import { Profile } from "../../models/profile/profile.entity";


export class ProfileRepository extends Repository<Profile> {

    async updateProfile(idProfile: number, updatePlayerProfileDTO: UpdatePlayerProfileDTO): Promise<UpdateResult> {
        const profileRepo = getRepository(Profile);
        return await profileRepo.update(idProfile, updatePlayerProfileDTO); 
    }
}