
import { getManager } from "typeorm";
import { PlayerDTO } from "../../DTO/player/playerDTO";
import { RoleEnum } from "../../enum/role.enum";
import { Player } from "../../models/player/player.entity";
import { PlayersService } from "./../../providers/player/player.service";
import { PlayerRepository } from "./../../repository/player/player.repository";
import { ProfileRepository } from "./../../repository/profil/profile.repository";
import { PlayersController } from "./player.controller";


describe('PlayersController', () => {
    let playersController: PlayersController;
    let playersService: PlayersService;

    function initializePlayersDataBase(): void {
        const entityManager = getManager();
        entityManager.query(
            `create table player`
        );
        entityManager.query(
            `create table profile`
        );
        entityManager.insert(
            Player, {
                name: "jestTesting1",
                profile: {
                    email: "jestTesting1@mail.com",
                    password: "1234",
                    profilPicture: "",
                    discord: "jestTesting1#1234",
                    inGameName: "jestLoL",
                    /*
                    role: "Toplaner",
                    rank: "Or",
                    */
                    isCaptain: false
                }
            }
        );
        entityManager.insert(
            Player, {
                name: "jestTesting2",
                profile: {
                    email: "jestTesting2@mail.com",
                    password: "1234",
                    profilPicture: "",
                    discord: "jestTesting2#1234",
                    inGameName: "jestLoL",
                    /*
                    role: "Jungler",
                    rank: "Argent",
                    */
                    isCaptain: false
                }
            }
        );
    }

    function closePlayersDataBase(): void {
        const entityManager = getManager();
        entityManager.query(
            `drop table player`
        );
        entityManager.query(
            `drop table profile`
        );
    }


    beforeEach(() => {
        playersService = new PlayersService(new PlayerRepository, new ProfileRepository);
        playersController = new PlayersController(playersService);
        initializePlayersDataBase();
    });

    describe('findAll', () => {
       
    });

   
})