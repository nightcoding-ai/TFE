import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DeleteResult } from "typeorm";
import { RoleEnum } from "../../players/enum/role.enum";
import { UserType } from "../../players/enum/userType.enum";
import { PlayerRepository } from "../../players/repository/player/player.repository";
import { Team } from "../../teams/models/teams.entity";
import { TeamRepository } from "../../teams/repository/teams.repository";
import { CreateJoinRequestDTO } from "../DTO/createJoinRequestDTO";
import { JoinRequestDTO } from "../DTO/joinRequestDTO";
import { JoinRequest } from "../models/joinRequest.entity";
import { JoinRequestRepository } from "../repositories/joinRequest.repository";










@Injectable()
export class JoinRequestService {

    constructor(
        private readonly JoinRequestRepository: JoinRequestRepository,
        private readonly PlayerRepository: PlayerRepository,
        private readonly TeamRepository: TeamRepository
    ) {}

    /**
     * Fonction permettanrt la création d'une requeête pour rentrer dans une équipe venant d'un joueur. Le joueur doit impérativement ne pas avoir d'équipe, que le rôle soit libre, que le nombre de joueurs dans l'équipe soit inférieure à 5 (5 étant le nombre officiel de joueur dans une équipe League of Legends).
     * Toute nouvelle requête a une date d'expériation de 7 jours après la date de la création.
     * @param {number} idPlayer - L'id du joueur qui souhaite rejoindre une équipe. 
     * @param {CreateJoinRequestDTO} joinRequest - L'objet correspondont à la nouvelle demande, avec dedans le joueur, l'équipe cible et le rôle. 
     * @returns {JoinRequest | UnauthorizedException} la nouvelle requête créée ou une erreur 401 si la requête n'est pas autorisée.
     */
    async createOne(idPlayer: number, joinRequest: CreateJoinRequestDTO): Promise<JoinRequest | UnauthorizedException> {
        try{
            const player = await this.PlayerRepository.getOne(idPlayer);
            const teamToJoin = await this.TeamRepository.getTeam(joinRequest.team);
            const requestToTeam = await this.JoinRequestRepository.getRequestToTeam(player.id, teamToJoin.id);
            if(player.id !== joinRequest.player || player.team || player.profile.isCaptain || !teamToJoin || teamToJoin.players.length >= 5 || teamToJoin.players.find((plr) => plr.profile.role === player.profile.role) || requestToTeam.length > 0){
                throw new UnauthorizedException();
            }
            else {
                return await this.JoinRequestRepository.createOne(joinRequest);
            }
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Fonction qui permet au capitaine d'une équipe d'accepter une demande pour rejoindre l'équipe.
     * @param {number} idCaptain - L'id du capitaine
     * @param {number} idRequest - L'id de la demande à accepter
     * @returns {UnauthorizedException | DeleteResult} 
     */
    async acceptRequest(idCaptain: number, idRequest: number): Promise<UnauthorizedException | DeleteResult> {
        try{
            const captain = await this.PlayerRepository.getOne(idCaptain);
            const request = await this.JoinRequestRepository.getOne(idRequest);
            const team = captain.team;
            const playerAsker = await this.PlayerRepository.getOne(request.player.id);
            if(!captain || !captain.team || !captain.profile.isCaptain || playerAsker.team || team.players.length > 4){
                throw new UnauthorizedException();
            }
            request.isApproved = true;
            playerAsker.team = team;
            await this.JoinRequestRepository.saveRequest(request);
            await this.PlayerRepository.savePlayer(playerAsker);
            if(team.players.length === 4){
                return await this.JoinRequestRepository.deleteAllOfATeam(team.id);
            }
            else{
                return await this.JoinRequestRepository.deleteAllOfATeamByRole(playerAsker.profile.role, captain.team);
            }   
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Fonction qui recherche toutes les demandes de d'adhésion, et les renvoie si aucune n'existe, alors elle renvoie null
     * @returns {JoinRequestDTO[] | UnauthorizedException | null} renvoir la totalité des demandes ou null si aucune existe. Cependant si le joueur n'est pas administrateur, la requête ne peut être atteinte.
     */
    async getAll(adminId: number): Promise<JoinRequestDTO[] | UnauthorizedException | null> {
        try{
            const result =  await this.JoinRequestRepository.getAll();
            const admin = await this.PlayerRepository.getOne(adminId);
            if(admin.userType !== UserType.ADMIN) {
                return new UnauthorizedException();
            }
            if(!result) {
                return null;
            }
            let dtoArray: JoinRequestDTO[] = [];
            for (const req of result) {
                let dto = new JoinRequestDTO();
                dto.id = req.id;
                dto.playerName = req.player.name;
                dto.teamName = req.team.name;
                dto.role = req.role;
                dto.createdAt = req.createdAt;
                dto.expiredAt = req.expiredAt;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Fonction qui renvoie toutes les demandes d'adhésion d'un même joueur basé sur l'id unique du joueur.
     * @param {number} idPlayer - L'id du joueur pour trouver toutes ses demandes. 
     * @returns {JoinRequest[] | null} la liste de toutes les demandes d'adhésion du joueur ou {null} si aucune n'existe.
     */
    async getAllOfAPlayer(idPlayer: number): Promise<JoinRequest[] | null>{
        try{
            const result = await this.JoinRequestRepository.getAllOfAPlayer(idPlayer);
            if(!result) {
                return null;
            }
            return result;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Fonction qui renvoie toutes les demandes d'adhésions qu'a reçu une équipe sur base de l'id de l'équipe. Cette requête n'est accessible que par le capitaine de l'équipe et si l'équipe est bien celle du capitaine.
     * @param {number} idCaptain - L'id du capitinaine de l'équipe.
     * @param {number} idTeam  - L'id de l'équipe pour trouver toutes les demandes de celle-ci.
     * @returns {JoinRequest[] | null | UnauthorizedException} la liste de toutes les demandes d'adhésion de l'équipe ou {null} si aucune existe, cependant peut retourner une erreur 401 si l'une des conditions n'est pas respectée.
     */
    async getAllOfTeam(idCaptain: number, idTeam: number): Promise<JoinRequest[] | null | UnauthorizedException> {
        try{
            const captain = await this.PlayerRepository.getOne(idCaptain);
            if(!captain || !captain.profile.isCaptain || !captain.team || captain.team.id !== idTeam){
                return new UnauthorizedException();
            }
            const result = await this.JoinRequestRepository.getAllOfATeam(idTeam);
            if(!result) { 
                return null;
            }
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Fonction qui renvoie toutes les demandes qui ont expiré.
     * @param {number} adminId - L'id de l'administrateur. 
     * @returns {JoinRequest[] | null | UnauthorizedException} la liste de toutes les demandes d'adhésion sinon {null} si aucune n'a encore expiré. De plus peut renvoyer une erreur 401 si la personne demandant cette requête n'est pas administrateur.
     */
    async getAllExpiredRequests(adminId: number): Promise<JoinRequest[] | null | UnauthorizedException> {
        try{
            const admin = await this.PlayerRepository.getOne(adminId);
            if( admin.userType !== UserType.ADMIN) {
                return new UnauthorizedException();
            }
            return await this.JoinRequestRepository.getAllWithExpiredRequests();
        }
        catch(err){
            throw err;
        }
    }
        
    /**
     * Fonction qui permet de supprimer une demande d'adhésion, elle permet doncd de refuser une demande en la supprimant.
     * @param {number} idPlayer - L'id du joueur qui souhaite supprimer une demande, il doit être capitaine.
     * @param {number} idJoinRequest - L'id de la requête à supprimer.
     * @returns {DeleteResult | null | UnauthorizedException} renvoir le résultat de suppresion {null} si la demande d'adhésion n'existe pas ou une erreur 401 si le joueur ne respecte pas les règles.
     */
    async deleteOne(idPlayer: number, idJoinRequest: number): Promise<DeleteResult | null | UnauthorizedException> {
        try{
            const captain = await this.PlayerRepository.getOne(idPlayer);
            const req = await this.JoinRequestRepository.getOne(idJoinRequest);
            if(!req) {
                return null;
            }
            if(!captain.profile.isCaptain || !req || req.team.id !== captain.team.id){
                return new UnauthorizedException();
            }
            return await this.JoinRequestRepository.deleteOne(idJoinRequest);
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Supprime toutes les demandes d'un joueur.
     * @param {number} idPlayer - L'id du joueur dont il faut supprimer les demandes. 
     * @returns {DeleteResult} renvoie le résultat de la suppression.
     */
    async deleteAllOfAPlayer(idPlayer: number): Promise<DeleteResult> {
        try{
            return await this.JoinRequestRepository.deleteAllOfAPlayer(idPlayer);
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Supprime toutes les demandes d'une équipe..
     * @param {number} idTeam - L'id de l'équipe dont il faut supprimer les demandes.
     * @returns {DeleteResult} renvoie le résultat de la suppression.
     */
    async deleteAllOfATeam(idTeam: number): Promise<DeleteResult> {
        try{
            return await this.JoinRequestRepository.deleteAllOfATeam(idTeam);
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Supprime toutes les demandes d'une équipe pour un rôle particulier.
     * @param {RoleEnum} role - le rôle pour lequel il faut supprimer les demandes de l'équipe. 
     * @param {Team} team - l'équipe dont il faut supprimer. 
     * @returns {DeleteResult} le résultat de suppression.
     */
    async deleteAllOfATeamByRole(role: RoleEnum, team: Team): Promise<DeleteResult> {
        try{
            return await this.JoinRequestRepository.deleteAllOfATeamByRole(role, team);
        }
        catch(err){
            throw err;
        }
    }


    /**
     * Fonctioon, qui est lancée toutes les 12 heures afin d'effacer touts les demandes d'adhésion qui seraient expirées.
     * @returns 
     */
    @Cron(CronExpression.EVERY_12_HOURS)
    async deleteAllExpiredRequests(): Promise<DeleteResult> {
        try{
            return await this.JoinRequestRepository.deleteAllExpiredRequests();
        }
        catch(err){
            throw err
        }
    }

    
}