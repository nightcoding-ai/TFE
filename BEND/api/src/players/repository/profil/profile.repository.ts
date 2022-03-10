import { ProfileDTO } from "src/players/DTO/profil/profileDTO";
import { Profile } from "src/players/models/profile/profile.entity";
import { getRepository, Repository, UpdateResult } from "typeorm";


export class ProfileRepository extends Repository<Profile> {

    async updateProfile(idProfile: number, profileDTO: ProfileDTO): Promise <UpdateResult> {

        const profileRepo = getRepository(Profile);

        return await profileRepo.update(idProfile, profileDTO);
        
    }
}