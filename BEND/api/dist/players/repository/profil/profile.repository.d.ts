import { Repository, UpdateResult } from "typeorm";
import { UpdatePlayerProfileDTO } from "../../DTO/player/updatePlayerProfileDTO";
import { Profile } from "../../models/profile/profile.entity";
export declare class ProfileRepository extends Repository<Profile> {
    updateProfile(idProfile: number, updatePlayerProfileDTO: UpdatePlayerProfileDTO): Promise<UpdateResult>;
}
