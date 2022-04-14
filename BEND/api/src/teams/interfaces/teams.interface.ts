import { JoinRequest } from "src/join-request/models/joinRequest.entity";
import { Player } from "src/players/models/player/player.entity";
import { TeamInvitation } from "src/team-invitation/models/teamInvitation.entity";
import { TournamentMatch } from "src/tournaments/models/tournamentMatch.entity";
import { TournamentParticipation } from "src/tournaments/models/tournamentParticipation.entity";

export interface TeamInterface {

    id: number;
    name: string;
    abbreviation: string;
    logo: string;
    players: Player[];
    tournamentParticipations: TournamentParticipation[];
    sideA: TournamentMatch[];
    sideB: TournamentMatch[];
    matchesWon: TournamentMatch[];
    invitationToPlayer: TeamInvitation[];
    joinRequestsReceived: JoinRequest[];
}