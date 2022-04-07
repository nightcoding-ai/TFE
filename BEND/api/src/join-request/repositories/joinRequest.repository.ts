import { RoleEnum } from "src/players/enum/role.enum";
import { Team } from "src/teams/models/teams.entity";
import { DeleteResult, getRepository, LessThan, MoreThan, Repository } from "typeorm";
import { CreateJoinRequestDTO } from "../DTO/createJoinRequestDTO";
import { JoinRequestDTO } from "../DTO/joinRequestDTO";
import { JoinRequest } from "../models/joinRequest.entity";












export class JoinRequestRepository extends Repository<JoinRequest>{


    async createOne(joinRequest:any): Promise<JoinRequest>{

        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.save(joinRequest);
    }

    async getOne(joinRequestId: number):  Promise<JoinRequest>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.findOneOrFail(joinRequestId);  
    }

    async saveRequest(request: JoinRequest): Promise<JoinRequest>{
        const reqRepo = getRepository(JoinRequest);

        return await reqRepo.save(request);

    }

    async getAll(): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.find({withDeleted: true});
    }

    async getAllOfATeam(teamId: number): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.find({withDeleted: true,
            where: {
                team: { id: teamId}
            },
            order: {
                id: "ASC"
            }
        })
    }

    async getAllOfAPlayer(playerId: number): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.find({withDeleted: true,
            where: {
                player: { id: playerId}
            }
        })
    }

    async getRequestToTeam(playerId: number, teamId: number): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);
        
        return await reqRepo.find({withDeleted: true,
            where: {
                player: { id: playerId},
                team: { id: teamId}
            }
        })
    }

    async deleteOne(joinRequestId: number): Promise<DeleteResult>{
        const reqRepo = getRepository(JoinRequest);


        return  await reqRepo.softDelete(joinRequestId);
    }

    async deleteAllOfAPlayer(playerId: number): Promise<DeleteResult>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.softDelete({player: { id: playerId}});

    }

    async deleteAllOfATeam(teamId: number): Promise<DeleteResult>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.softDelete({team : { id: teamId}});
    }

    async deleteAllOfATeamByRole(roleToDelete: RoleEnum, team: Team): Promise<any>{
        const reqRepo = getRepository(JoinRequest);

        const allReqOfTeamByRole: any  = await reqRepo.find({ where:
            {role: roleToDelete,
            team: team}
            
        
        });

        return await reqRepo.softDelete(allReqOfTeamByRole);


    }

    async deleteAllExpiredRequests(): Promise<DeleteResult>{
        const reqRepo = getRepository(JoinRequest);
        const today = new Date();

        return await reqRepo.softDelete({expiredAt : LessThan(today)});
    }

    async getAllWithExpiredRequests(): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);

        return await reqRepo.find({withDeleted: true,
        order: {
            id: "ASC"
        },
        })
    }
}