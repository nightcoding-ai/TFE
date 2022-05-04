import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult} from "typeorm";
import { PlayerDTO } from "../../players/DTO/player/playerDTO";
import { UserType } from "../../players/enum/userType.enum";
import { Player } from "../../players/models/player/player.entity";
import { PlayerRepository } from "../../players/repository/player/player.repository";
import { TournamentMatch } from "../../tournaments/models/tournamentMatch.entity";
import { TournamentRepository } from "../../tournaments/repositories/tournament.repository";
import { TournamentMatchRepository } from "../../tournaments/repositories/tournamentMatch.repositoy";
import { TournamentParticipationRepository } from "../../tournaments/repositories/tournamentParticipation.repository";
import { CreateTeamDTO } from "../DTO/createTeamDTO";
import { FullTeamDTO } from "../DTO/fullTeamDTO";
import { NotFullTeamDTO } from "../DTO/notFullTeamDTO";
import { TeamDTO } from "../DTO/teamDTO";
import { TeamWithLogoDTO } from "../DTO/teamWithLogoDTO";
import { TeamInterface } from "../interfaces/teams.interface";
import { Team } from "../models/teams.entity";
import { TeamRepository } from "../repository/teams.repository";

@Injectable()
export class TeamsService {
    constructor(
        private readonly TeamRepository: TeamRepository,
        private readonly PlayerRepository: PlayerRepository,
        private readonly TournamentRepository: TournamentRepository,
        private readonly TournamentParticipationRepository: TournamentParticipationRepository,
        private readonly TournamentMatchRepository: TournamentMatchRepository,
    ) {}
  
    /**
     * Fonction qui permet de créer une nouvelle équipe.
     * @param {number} idPlayer - L'id du joueur qui veut créer l'équipe afin de vérifier si celui-ci remplie les conditions pour la creation
     * @param {CreateTeamDTO }teamDTO - L'objet représentant la nouvelle équipe.
     * @returns {TeamInterface} la nouvelle équipe créée;
     */
    async create(idPlayer: number, teamDTO: CreateTeamDTO): Promise<number> {
        try {
            const player = await this.PlayerRepository.getOne(idPlayer);
            if(player.team || player.team !== null || player.profile.isCaptain === true){
                throw new UnauthorizedException();
            }
            else {
            const newTeam = await this.TeamRepository.addTeam(teamDTO);
            player.team = newTeam;
            player.profile.isCaptain = true;
            await this.PlayerRepository.savePlayer(player);
            return newTeam.id;
            }
        }
        catch(err) {  
            throw err;
         }
    }

    /**
     * Fonction qui permet la récupératon de la liste de toutes les équipes avec uniquement certaines informations.
     * @param {number} adminId - l'idée du demandeur afin de vérifier si celui-ci est bien administrateur.
     * @returns {TeamDTO[] | null} la liste des équipes de la base de données, sinon {null} si aucune équipe existe.
     */
    async getAll(adminId: number): Promise<TeamDTO[] | null> {
        try{
            const admin = await this.PlayerRepository.getOne(adminId);
            if(admin.userType !== UserType.ADMIN){
                throw new UnauthorizedException('Access denied, admin ressources');
            }
            let dtoArray: TeamDTO[] = [];
            const result = await this.TeamRepository.getAll();
            if(!result) {
                return null;
            }
            for (const item of result) {
                let dto = new TeamDTO();
                let t = [];
                dto.id = item.id;
                dto.name = item.name;
                dto.abbreviation = item.abbreviation;
                for (const player of item.players) {
                    let p = new PlayerDTO();
                    p.id = player.id;
                    p.name = player.name;
                    p.discord = player.profile.discord;
                    p.role = player.profile.role;
                    p.rank = player.profile.rank;
                    t.push(p);
                }
                dto.players = t;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch(err) {
            throw err;
        }
    }

   /**
    * Fonction qui renvoie la liste des équipes avec uniquement certaines informations, cette fonction est publique, elle ne nécessite aucune condition.
    * @returns {teamWithLogoDTO[] | null}
    */
    async getAllWithLogos(): Promise<TeamWithLogoDTO[] | null>{
        try{
           const result =  await this.TeamRepository.getAllWithLogos();
           if(!result) {
               return null;
           }
           let dtoArray: TeamWithLogoDTO[] = [];
           for (const item of result) {
               let team = new TeamWithLogoDTO();
               team.id = item.id;
               team.name = item.name;
               team.logo = item.logo;
               dtoArray.push(team);
           }
           return dtoArray;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Fonction qui renvoie le nombre d'équipes qu'il y a dans la base de données.
     * @returns {number} le nombre d'équipe, peut être 0, si aucune équipe n'existe.
     */
    async getNumberOfTeams(): Promise<number> {
        try{
            return await this.TeamRepository.getNumberOfTeams();
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Fonction qui renvoie les équipes qui sont complètes, c'est-à-dire qui compte 5 joueurs dedans, sinon null.
     * @returns {FullTeamDTO[] | null} la liste des équipes qui sont complètes, sinon null, si aucune équipe n'est complète.
     */
    async getFullTeams(): Promise<FullTeamDTO[] | null> {
        try{
            const result = await this.TeamRepository.getAllFullTeams();
            if(!result) {
                return null;
            }
            let dtoArray: FullTeamDTO[] = [];
            for (const item of result) {
                let team = new FullTeamDTO();
                team.id = item.id;
                team.name = item.name;
                team.abbreviation = item.abbreviation;
                dtoArray.push(team);
            }
            return dtoArray;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Fonction qui renvoie la liste des équipes qui sont incomplètes et les rôles libres pour chaque équipe. sinon null si toutes les équipes sont complètes.
     * @returns {NotFullTeamDTO[] | null} la liste des équipes incomplètes avec les rôles libres, sinon null si toutes les équipes sont complètes.
     */
    async getNotFullTeams(): Promise<NotFullTeamDTO[] | null> {
        try{
            const roles = [
                "Toplaner",
                "Jungler",
                "Midlaner",
                "ADC",
                "Support"
            ];
            const takenRoles = [];
            const freeRoles = [];
            let dtoArray: NotFullTeamDTO[] = [];
            const result = await this.TeamRepository.getAllNotFullTeams();
            if(!result) {
                return null;
            }
            for (const team of result) {
                let dto = new NotFullTeamDTO();
                dto.id = team.id;
                dto.name = team.name;
                dto.abbreviation = team.abbreviation;
                for (const player of team.players) {
                    if(roles.find(role => role === player.profile.role)){
                        takenRoles.push(player.profile.role);
                    }
                }
                for (const role of roles) {
                    if(takenRoles.find(r => r !== role )) {
                        freeRoles.push(role);
                    }
                }
                dto.freeRoles = freeRoles;
                dtoArray.push(dto);
            }
            return dtoArray;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Fonction qui renvoie la liste des équipes qui compte un nombre précis de joueurs sinon null si aucune équipe ne correspond au critère
     * @param {number} nbr - le nombre de joueurs que doit compter l'équipe
     * @returns {TeamInterface[] | null} la liste des équipes qui ont le nombre de joueurs équivalent au pramaètre.
     */
    async getTeamsWithPrecisedNumberOfPlayers(nbr: string): Promise<TeamInterface[] | null> {
        try{
            const result = await this.TeamRepository.getTeamsWithPrecisedNumberOfPlayers(parseInt(nbr));
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
     * Fonction qui renvoie la liste des équipes qui compte un nombre précis de places libres, sinon null si aucune équipe ne répond au critère.
     * @param {number} nbr - le nombre de places libre que doit compter l"équipe.
     * @returns {TeamInterface[] | null} -la liste des équipes correspondant au critère sinon {null} si aucune équipe ne correspond au critère.
     */
    async getTeamsWithPrecisedFreePlaces(nbr: string): Promise<TeamInterface[] | null> {
        try{
            const result =  await this.TeamRepository.getTeamsWithPrecisedFreePlaces(parseInt(nbr));
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
     * Fonction qui renvoie l'équipe sur base de l'id de celle-ci.
     * @param {number} idTeam - id de l'équipe à trouver
     * @returns {TeamInterface | undefined} - renvoie l'équipe, sinon {undefined} si elle n'existe pas.
     */
    async getTeam(idTeam: number): Promise<TeamDTO | undefined> {
        try{
            const result = await this.TeamRepository.getTeam(idTeam);
            if(!result) { 
                return undefined;
            }
            let dto: TeamDTO = new TeamDTO();
            dto.id = result.id;
            dto.name = result.name;
            dto.abbreviation = result.abbreviation;
            dto.logo = result.logo;
            if(result.players) {
                dto.players = [];
                for (const player of result.players) {
                    if(player) {
                        let dtoPlayer: PlayerDTO = new PlayerDTO();
                        dtoPlayer.id = player.id;
                        dtoPlayer.name = player.name;
                        dtoPlayer.discord = player.profile.discord;
                        dtoPlayer.role = player.profile.role;
                        dtoPlayer.rank = player.profile.rank;
                        if(player.profile.profilPicture) {
                            dtoPlayer.profilPicture = player.profile.profilPicture;
                        }
                        dtoPlayer.ign = player.profile.inGameName;
                        dtoPlayer.isCaptain = player.profile.isCaptain;
                        dto.players.push(dtoPlayer);
                    }
                }
            }
            return dto;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui permet de modifier une équipe.
     * @param {number} idPlayer - l'id du joueur qui veut modifier l'équipe afin de vérifier s'il remplie les conditions.
     * @param {TeamDTO} teamDTO - L'objet qui représentant les nouvelles informations de l'équipe.
     * @returns {UpdateResult} l'équipe modifiée.
     */
    async updateTeam(idPlayer: number, teamDTO: TeamDTO): Promise<UpdateResult> {
        try{

            const player = await this.PlayerRepository.getOne(idPlayer);

            if(!player.team || player.team === null || player.profile.isCaptain === false) {
                throw new UnauthorizedException();
            }
            else {
                if(teamDTO.logo === '' || teamDTO.logo === null){
                    teamDTO.logo = player.team.logo;
                    const updatedTeam = await this.TeamRepository.updateTeam(player.team.id, teamDTO);
                    return updatedTeam;
                }
            const updatedTeam = await this.TeamRepository.updateTeam(player.team.id, teamDTO);
            return updatedTeam;
            }  
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui permet de supprimer une équipe.
     * @param {number} idPlayer - l'id du joueur qui souhaite supprimer son équipe, afin de vérifier s'il a le droit de le faire.
     * @returns {DeleteResult} renvoie l'équipe supprimée.
     */
    async deleteTeam(idPlayer: number): Promise<DeleteResult> {
        try{
            const player = await this.PlayerRepository.getOne(idPlayer);
            if(player.profile.isCaptain !== true || player.team === null || player.team === undefined) {
                throw new UnauthorizedException();
            }
            else {
                const teamID = player.team.id;
                player.team = null;
                player.profile.isCaptain = false;
                await this.PlayerRepository.savePlayer(player);
                const deleted = await this.TeamRepository.deleteTeam(teamID);
                return deleted;
            }
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui permet au capitaine d'une équipe de retirer un de ses joueurs de son équipe.
     * @param {number} idCaptain - l'id du capitaine afin de vérifier si celui-ci est bien le capitaine et qu'il respecte les consignes.
     * @param {number} idPlayer  - l'id du joueur qu'il faut retirer de son équipe.
     */
    async banPlayer(idCaptain: number, idPlayer: number): Promise<void> {
        try{
            const captain = await this.PlayerRepository.getOne(idCaptain);
            const player = await this.PlayerRepository.getOne(idPlayer);
            const allMatchesOfTeam = await this.TournamentMatchRepository.getAllMatchesOfATeam(player.team.id);
            const allTournamentsOfTeam = await this.TournamentParticipationRepository.getAllOfATeam(player.team.id);
            if(captain.profile.isCaptain === false || player.profile.isCaptain === true || player.team.id !== captain.team.id){
                throw new UnauthorizedException();
            }
            if(captain.team.players.length === 5 && allMatchesOfTeam) {
                for (const match of allMatchesOfTeam) {
                    if(match.teamA.id === player.team.id) {
                        match.teamAWins = 0;
                        match.teamBWins = match.bestOfType;
                        match.winner = match.teamB;
                        match.isOver = true;
                    }
                    if(match.teamB.id === player.team.id) {
                        match.teamBWins = 0;
                        match.teamAWins = match.bestOfType;
                        match.winner = match.teamA;
                        match.isOver = true;
                    }
                    await this.TournamentMatchRepository.saveOne(match);
                    for (const participation of allTournamentsOfTeam) {
                        let tournament = await this.TournamentRepository.getOneWithMatches(participation.tournament.id);
                        let nextMatchForWinner: TournamentMatch = tournament.matches.find(nm => nm.round === match.round + 1 && nm.order === Math.ceil(match.order/2));
                        if(nextMatchForWinner.teamA === null && nextMatchForWinner.teamB === null) {
                            nextMatchForWinner.teamA = match.winner;
                            await this.TournamentMatchRepository.saveOne(nextMatchForWinner);
                        }
                        if(nextMatchForWinner.teamA !== null && nextMatchForWinner.teamB === null && nextMatchForWinner.teamA !== match.winner) {
                            nextMatchForWinner.teamB = match.winner;
                            await this.TournamentMatchRepository.saveOne(nextMatchForWinner);
                        }  
                    }
                }
            }
            player.team = null;
            await this.PlayerRepository.savePlayer(player);

        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Fonction qui permet de changer le capitaine d'une équipe par un autre joueur de l'équipe.
     * @param {number} idOldCaptain - l'id de l'ancien capitaine
     * @param {number} idNewCaptain - l'id du nouveau capitaine
     * @returns {Player} le nouveau capitaine
     */
    async setAsCaptain(idOldCaptain: number, idNewCaptain: number): Promise<Player> {
        try{
            const oldCaptain = await this.PlayerRepository.getOne(idOldCaptain);
            const newCaptain = await this.PlayerRepository.getOne(idNewCaptain);
            if(!oldCaptain || !newCaptain || oldCaptain.profile.isCaptain === false || newCaptain.profile.isCaptain === true || oldCaptain.team.id !== newCaptain.team.id || oldCaptain.id === newCaptain.id){
                throw new UnauthorizedException();
            }
            oldCaptain.profile.isCaptain = false;
            newCaptain.profile.isCaptain = true;
            await this.PlayerRepository.savePlayer(oldCaptain);
            return await this.PlayerRepository.savePlayer(newCaptain);
        }
        catch(err){

            throw err;
        }
    }
}