

export interface Tournament {

    id?: number;
    name: string;
    seed: number;
    areInscriptionsClose?: boolean;
    startDate: Date;
    endDate?: Date;
}