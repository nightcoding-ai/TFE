export interface Team{
    id: number,
    name: string,
    abbreviation: string,
    logo: string
}


export interface TeamWithPlayers{
    id: number,
    name: string,
    abbreviation: string,
    logo: string,
    players: Player[],

}

export interface Player{
    id:number,
    name: number,
    userType: string,
    profile: Profile;
}

export interface Profile{
    id:number,
    profilPicture: string,
    discord: string,
    inGameName: string,
    role: string,
    rank: string,
    isCaptain: boolean;
}

