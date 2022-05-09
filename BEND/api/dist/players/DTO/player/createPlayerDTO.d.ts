import { UserType } from "../../enum/userType.enum";
import { CreateProfileDTO } from "../profil/CreateProfileDTO";
export declare class CreatePlayerDTO {
    id?: number;
    userType: UserType;
    name: string;
    profile: CreateProfileDTO;
}
