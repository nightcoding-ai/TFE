

export interface Tournament {

    id?: number;
    name: string;
    seed: number;
    areInscriptionsClosed?: boolean;
    startDate: Date;
    endDate?: Date;
    matches?: [];
}