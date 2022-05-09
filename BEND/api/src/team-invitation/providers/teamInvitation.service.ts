import { Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DeleteResult } from "typeorm";
import { PlayerRepository } from "../../players/repository/player/player.repository";
import { TeamInvitationInterface } from "../interfaces/teamInvitation.interface";
import { TeamInvitationRepository } from "../repositories/teamInvitation.repository";




@Injectable()
export class TeamInvitationService {

    constructor(
       private readonly TeamInvitationRepo : TeamInvitationRepository,
       private readonly PlayerRepo : PlayerRepository
    ) {}

    /**
    * Permet de créer une nouvelle invitation en tant que capitaine.
    * @param {number} idPlayer - L'id du joueur qui veut créer l'invitation afin de vérifier si celui-ci est bien capitaine et qu'il respecte les conditions. 
    * @param {any} invitation - L'objet comportant l'id de l'équipe qui invite et le joueur qui est invité.
    * @returns {TeamInvitationInterface | UnauthorizedException} l'invitation quand elle est créée, ou une erreur 401 si le joueur qui souhaite créée l'invitation ne respecte pas les conditions.
    */
    async createOne(idPlayer: number, invitation: any): Promise<TeamInvitationInterface | UnauthorizedException> {
        try {
            const capitaine = await this.PlayerRepo.getOne(idPlayer);
            const invititationsOfPlayer = await this.TeamInvitationRepo.getAllOfOnePlayer(invitation.player);
            if(capitaine.profile.isCaptain === false || !capitaine || !capitaine.team || capitaine.team.players.length >= 5 || capitaine.team.id !== invitation.team || capitaine.team.players.find((player) => player.profile.role === invitation.role)){
                return  new UnauthorizedException();
            }
            if(invititationsOfPlayer.find(invitation => invitation.team.id === capitaine.team.id)){
                return new UnauthorizedException();
            }
            return await this.TeamInvitationRepo.createNewInvitation(invitation);
        }
        catch(err){
            throw err;
       }
   }

   /**
    * Fonction permettant d'accepter une invitation.
    * @param {number} playerId - L'id du joueur qui veut accepter l'invitation.
    * @param {number} idNotif - L'id de la notification à accepter.
    * @returns {DeleteResult | UnauthorizedException} renvoie la suppression de toutes les autres invitations, car un joueur ne peut avoir qu'une seule équipe, et donc les autres invitations sont automatiquement supprimées.
    */
   async acceptedInvitation(playerId: number,idNotif: number): Promise<DeleteResult | UnauthorizedException> { 
        try {
            const notif = await this.TeamInvitationRepo.getOne(idNotif);
            const player = await this.PlayerRepo.getOne(playerId);
            const playerFromNotif = await this.PlayerRepo.getOne(notif.player.id);

            if(!player || player.id !== playerFromNotif.id || player.team || notif.team.players.length >= 5 || notif.team.players.find((compo) => compo.profile.role === player.profile.role) || !notif.team){
                return new UnauthorizedException();
            }
            else{
                player.team = notif.team;
                await this.PlayerRepo.savePlayer(player);
                await this.TeamInvitationRepo.deleteAllOfTeamByPlayerRole(player.profile.role, notif.team.id);
                if(notif.team.players.length >= 4){
                    await this.TeamInvitationRepo.deleteAllOfTeam(notif.team.id);
                }
                return await this.TeamInvitationRepo.deleteAllOfPlayer(notif.player.id);
            }
        }
        catch(err){
            throw err;
       }
   }

   /**
    * Fonction qui renvoie l'entièreté des invitations existantes.
    * @returns {TeamInvitationInterface[] | null} la liste totale des invitations, {null} si il n'y en a aucune.
    */
   async getAll(): Promise<TeamInvitationInterface[] | null> {
       try {
            const result = await this.TeamInvitationRepo.getAll();
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
    * Fonction qui renvoie les invitations d'un même joueur.
    * @param {number} idPlayer - L'id du joueur dont il faut trouver les invitations. 
    * @returns {TeamInvitationInterface[] | null} la liste des invitations du joueur ou null si le joueur n'en a aucune.
    */
   async getAllOfAPlayer(idPlayer: number): Promise<TeamInvitationInterface[] | null> {
        try {
            const result = await this.TeamInvitationRepo.getAllOfOnePlayer(idPlayer);
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
    * Fonction qui renvoie les invitations d'une même équipe.
    * @param {number} idPlayer - L'id du capitaine de l'équipe. 
    * @returns {TeamInvitationInterface[] | null} la liste des invitations de l'équipe ou null si il y en a aucune.
    */
   async getAllOfATeam(idPlayer: number): Promise<TeamInvitationInterface[] | null> {
        try {
            const player = await this.PlayerRepo.getOne(idPlayer);
            const result = await this.TeamInvitationRepo.getAllOfOneTeam(player.team.id);
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
    * Fonction pour supprimer toutes les invitations d'un joueur. 
    * Elle est utile dans le cas ou le joueur refuse toutes les invitations d'un coup, ou s'il rejoint une équipe 
    * @param {number} idPlayer - L'id du joueur duquel il faut supprimer ses invitations 
    * @returns {DeleteResult}
    */
   async deleteAllOfAPlayer(idPlayer:number): Promise<DeleteResult> {
        try{
            return await this.TeamInvitationRepo.deleteAllOfPlayer(idPlayer);
        }
        catch(err){
            throw err;
        }
   }

   /**
    * Fonction qui permet de supprimer une invitation, que ce soit une décision du joueur ou du capitaine.
    * @param {number} idPlayer - L'id du joueur qui souhaite supprimer l'invitation. 
    * @param {number} idNotif - L'id de linvitation à supprimer.
    * @returns {DeleteResult | UnauthorizedException} renvoie la suppression ou une erreur 401 si le joueur n"existe pas.
    */
   async deleteOne(idPlayer: number, idNotif: number): Promise<DeleteResult | UnauthorizedException> {
       try{
            const player = await this.PlayerRepo.getOne(idPlayer);
            if(!player){
                return new UnauthorizedException();    
            }
            return await this.TeamInvitationRepo.deleteOne(idNotif);
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Tâche répétitive pour effacer les invitations qui ont expiré. Se fait toutes les 12 heures.
     * @returns {DeleteResult} le résultat de suppression
     */
    @Cron(CronExpression.EVERY_12_HOURS)
    async deleteAllExpiredInvitations(): Promise<DeleteResult>{
        try{
            return await this.TeamInvitationRepo.deleteAllExpiredInvitations();
        }
        catch(err){
            throw err;
        }
    }
}