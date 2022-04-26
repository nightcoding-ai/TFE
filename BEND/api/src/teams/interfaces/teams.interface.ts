import { JoinRequest } from "../../join-request/models/joinRequest.entity";
import { Player } from "../../players/models/player/player.entity";
import { TeamInvitation } from "../../team-invitation/models/teamInvitation.entity";
import { TournamentMatch } from "../../tournaments/models/tournamentMatch.entity";
import { TournamentParticipation } from "../../tournaments/models/tournamentParticipation.entity";

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