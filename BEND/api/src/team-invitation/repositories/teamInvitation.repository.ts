import { DeleteResult, getRepository, LessThan, Repository } from "typeorm";
import { RoleEnum } from "../../players/enum/role.enum";
import { TeamInvitationDTO } from "../DTO/teamInvitationDTO";
import { TeamInvitationInterface } from "../interfaces/teamInvitation.interface";
import { TeamInvitation } from "../models/teamInvitation.entity";



export class TeamInvitationRepository extends Repository<TeamInvitation>{

    async createNewInvitation(newInvitation: TeamInvitationDTO): Promise<TeamInvitationInterface>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.save(newInvitation);
    }

    async getOne(idNotif: number): Promise<TeamInvitationInterface>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.findOne(idNotif); 
    }

    async getAll(): Promise<TeamInvitationInterface[]>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.find({withDeleted: true});
    }

    async getOneOfOnePlayer(idPlayer: number): Promise<TeamInvitationInterface>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.findOne({ where: {
            player: {
                id: idPlayer
            }
        }})
    }

    async getAllOfOnePlayer(idPlayer: number): Promise<TeamInvitationInterface[]>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.find({ withDeleted: true,
            where: {
                player: {
                    id: idPlayer
                }
        }})
    }

    async getAllOfOneTeam(idTeam: number): Promise<TeamInvitationInterface[]>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.find({ withDeleted: true,
            where: {
                team: {
                    id: idTeam
                }
        }})
    }

    async deleteAllOfPlayer(idPlayer: number): Promise<DeleteResult>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.softDelete({player: {
                id: idPlayer
        }})
    }

    async deleteAllOfTeam(idTeam: number): Promise<DeleteResult>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.softDelete({team: {
                id: idTeam
        }})
    }

    async deleteAllOfTeamByPlayerRole(roleToDelete: RoleEnum, idTeam: number): Promise<DeleteResult>{
        const teamInvRepo = getRepository(TeamInvitation);
        const allInvOfTeamByRole: any = await teamInvRepo.find({ where:
            {role: roleToDelete,
            team: {id: idTeam}}
            });
        return await teamInvRepo.softDelete(allInvOfTeamByRole);
    }

    async deleteOne(idNotif: number): Promise<DeleteResult>{
        const teamInvRepo = getRepository(TeamInvitation);
        return await teamInvRepo.softDelete(idNotif);
    }

    async deleteAllExpiredInvitations(): Promise<DeleteResult>{
        const teamInvRepo = getRepository(TeamInvitation);
        const today = new Date();
        return await teamInvRepo.softDelete({expiredAt : LessThan(today)});
    }
}