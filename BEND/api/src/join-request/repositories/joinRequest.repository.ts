import { RoleEnum } from "src/players/enum/role.enum";
import { Team } from "src/teams/models/teams.entity";
import { DeleteResult, getRepository, Repository } from "typeorm";
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

    async getAll(): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.find();
    }

    async getAllOfATeam(teamId: number): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.find({
            where: {
                team: { id: teamId}
            }
        })
    }

    async getAllOfAPlayer(playerId: number): Promise<JoinRequest[]>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.find({
            where: {
                player: { id: playerId}
            }
        })
    }

    async deleteOne(joinRequestId: number): Promise<DeleteResult>{
        const reqRepo = getRepository(JoinRequest);


        return  await reqRepo.delete(joinRequestId);
    }

    async deleteAllOfAPlayer(playerId: number): Promise<DeleteResult>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.delete({player: { id: playerId}});

    }

    async deleteAllOfATeam(teamId: number): Promise<DeleteResult>{
        const reqRepo = getRepository(JoinRequest);


        return await reqRepo.delete({team : { id: teamId}});
    }

    async deleteAllOfATeamByRole(roleToDelete: RoleEnum, team: Team): Promise<any>{
        const reqRepo = getRepository(JoinRequest);

        const allReqOfTeamByRole: any  = await reqRepo.find({ where:
            {role: roleToDelete,
            team: team}
            
        
        });

        return await reqRepo.delete(allReqOfTeamByRole);


    }
}