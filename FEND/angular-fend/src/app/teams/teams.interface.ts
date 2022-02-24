export interface Team{
    id: number,
    teamName: string,
    abbreviation: string,
    logo: string
}


export interface TeamWithPlayers{
    id: number,
    teamName: string,
    abbreviation: string,
    logo: string,
    players: Player[],

}

export interface Player{
    id:number,
    name: number,
    playerInfo: PlayerInfos;
}

export interface PlayerInfos{
    id:number,
    password: string,
    profilPicture: string,
    discord: string,
    igName: string,
    role: string,
    rank: string,
    isCaptain: boolean;
}

