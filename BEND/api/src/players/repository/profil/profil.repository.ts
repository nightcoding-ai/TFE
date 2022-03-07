import { ProfileDTO } from "src/players/DTO/profil/profileDTO";
import { Profile } from "src/players/models/profile/profil.entity";
import { getRepository, Repository, UpdateResult } from "typeorm";


export class ProfileRepository extends Repository<Profile> {

    
}