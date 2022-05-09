
import { Test, TestingModule } from "@nestjs/testing";
import { getManager } from "typeorm";
import { RankEnum } from "../../enum/rank.enum";
import { RoleEnum } from "../../enum/role.enum";
import { UserType } from "../../enum/userType.enum";
import { Player } from "../../models/player/player.entity";
import { PlayersService } from "./../../providers/player/player.service";
import { PlayersController } from "./player.controller";



describe('PlayersController', () => {
    let controller: PlayersController;

    let mockPlayersService = { 
        create: jest.fn(dto => {
            return  {
                id: Date.now(),
                ...dto
            }
        })
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
           controllers: [PlayersController],
           providers: [PlayersService],
        }).overrideProvider(PlayersService)
        .useValue(mockPlayersService)
        .compile();

        controller = module.get<PlayersController>(PlayersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    
    
    it('should create a player', () => {
        expect(controller.create({
            name : "jestTest",
            userType : UserType.USER,
            profile: {
                email: "jestTesting",
                password: "1234",
                discord: "jestDiscord#1234",
                inGameName: "jestLol",
                profilPicture: "",
                role: RoleEnum.ADC,
                rank: RankEnum.Argent
            }
        })).toEqual({
                id: expect.any(Number),
                name: "jestTest",
                userType : UserType.USER,
                profile: {
                    id: expect.any(Number),
                    email: "jestTesting",
                    password: "1234",
                    discord: "jestDiscord#1234",
                    inGameName: "jestLol",
                    profilPicture: "",
                    role: RoleEnum.ADC,
                    rank: RankEnum.Argent,
                    isCaptain: false
                }
            });
        expect(mockPlayersService.create).toHaveBeenCalled();
        })
})




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
                inGameName: "jestLoL1",
                role: RoleEnum.TOPLANER,
                rank: RankEnum.Argent,
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
                inGameName: "jestLoL2",
                role: RoleEnum.JUNGLER,
                rank: RankEnum.Or,
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