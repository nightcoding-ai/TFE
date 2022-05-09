
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, Response, StreamableFile, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { file } from 'googleapis/build/src/apis/file';
import { diskStorage } from 'multer';
import { join } from 'path';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CreatePlayerDTO } from '../../DTO/player/createPlayerDTO';
import { FreePlayerDTO } from '../../DTO/player/freePlayerDTO';
import { PlayerDTO } from '../../DTO/player/playerDTO';
import { PlayerProfileDTO } from '../../DTO/player/playerProfileDTO';
import { Player } from '../../models/player/player.entity';
import { PlayersService } from '../../providers/player/player.service';
const fs = require('fs')

@Controller('players')
export class PlayersController {

    constructor(
        private readonly PlayersService : PlayersService
    ) {}

    @Post()
    create(
        @Body() player: CreatePlayerDTO): Promise<Player> {
        return this.PlayersService.createAPlayer(player);
    }

    @Get("stream/:pp")
    getFile(
        @Param('pp') pp: string,): StreamableFile {
        const file = createReadStream(join(process.cwd(), `assets/${pp}`));
        return new StreamableFile(file);
    }

    @Delete('images/:filename')
    deleteFile(
        @Param('filename') filename) {
        const path = `./images/${filename}`;
        try {
            fs.unlink(path, () => console.log('OK'))
        }
        catch(err) {
            throw err;
        }
    }

    @Post("upload")
    @UseInterceptors(
        FileInterceptor("picture", {
            storage: diskStorage({
                destination: "./images",
                filename: async (req, file: Express.Multer.File, cb) => {
                    const name = await file.originalname.split(".")[0];
                    const fileExtension = await file.originalname.split(".")[1];
                    const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
                    cb(null, newFileName)
                } 
            }),
            fileFilter: (req: Request, file, cb) => {
                const ext = file.mimetype;
                const validExtensions = ["image/jpg","image/png", "image/jpeg", "image/svg"];
                if(!validExtensions.find(e => e === ext)) {
                    return cb(new Error('Extension not allowed'), false);
                }
                return cb(null, true);
            }          
        })
    )
    uploadSingle(
        @UploadedFile() file: any) {
        if(!file) {
            throw new BadRequestException('File is not an image');
        }
        else {
            const response = {
                filePath: `http://localhost:3000/api/players/images/${file.filename}`
            }
            return response;
        }
    }

    @Get('images/:filename')
    async getPicture(
        @Param('filename') filename,
        @Res() res) {
        res.sendFile(filename, { root: './images'});
    }

    @UseGuards(JwtAuthGuard)
    @Get('my_profile')
    getMyProfileInformations(
        @Req() req: any): Promise<PlayerProfileDTO> {
        return this.PlayersService.myProfile(req.user.playerID);
    }

    @Get('single/:id')
    getOne(
        @Param('id') idPlayer: number): Promise<PlayerDTO> {
        return this.PlayersService.getOne(idPlayer);
    }
    
    @Get('all')
    getAll(): Promise<PlayerDTO[]> {
        return this.PlayersService.getAllPlayers();
    }

    @Get('free')
    getAllFree(): Promise<FreePlayerDTO[]> {
        return this.PlayersService.getAllFree();
    }

    @Get('count_players')
    getNumberOfPlayer(): Promise<number> {
        return this.PlayersService.getNumberOfPlayer();
    }

    @Post('all_by_role')
    getAllByRoleAndFree(
    @Req() req: any): Promise<PlayerDTO[]> {
        return this.PlayersService.getAllByRoleAndFree(req.body.role);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update/profile')
    updateProfile(
        @Param('id') id:number,
        @Req() req: any): Promise<UpdateResult | UnauthorizedException> {
        return this.PlayersService.updatePlayerProfile(req.user.playerID, id, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    updatePlayer(
        @Param('id') id:number,
        @Req() req: any): Promise<UpdateResult | UnauthorizedException> {
        return this.PlayersService.updatePlayer(req.user.playerID, id, req.body);
    } 

    @UseGuards(JwtAuthGuard)
    @Delete('leave_team')
    leaveTeam(
        @Req() req:any) {
        return this.PlayersService.leaveTeam(req.user.playerID);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delete(
        @Param('id') idPlayer: number,
        @Req() req:any): Promise<DeleteResult | UnauthorizedException> {
        return this.PlayersService.delete(req.user.playerID, idPlayer);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('profile_picture')
    deleteProfilePicture(
        @Req() req:any): Promise<DeleteResult | null> {
        return this.PlayersService.deleteProfilePicture(req.user.playerID);
    }
}