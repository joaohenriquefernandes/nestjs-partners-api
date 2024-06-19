import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SpotsService } from '../../../../libs/core/src/spots/spots.service';
import { AtualizarLugarRequest } from './request/atualizar-lugar.request';
import { CriarLugarRequest } from './request/criar-lugar.request';

@Controller('eventos/:eventoId/lugares')
export class LugaresController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Param() eventoId: string,
    @Body() criarLugarRequest: CriarLugarRequest,
  ) {
    return this.spotsService.create(eventoId, {
      name: criarLugarRequest.nome,
    });
  }

  @Get()
  findAll(@Param() eventoId: string) {
    return this.spotsService.findAll(eventoId);
  }

  @Get(':lugarId')
  findOne(@Param('lugarId') lugarId: string, @Param() eventoId: string) {
    return this.spotsService.findOne(eventoId, lugarId);
  }

  @Patch(':lugarId')
  update(
    @Param('lugarId') lugarId: string,
    @Param() eventoId: string,
    @Body() atualizarLugarRequest: AtualizarLugarRequest,
  ) {
    return this.spotsService.update(eventoId, lugarId, {
      name: atualizarLugarRequest.nome,
    });
  }

  @Delete(':lugarId')
  remove(@Param('lugarId') lugarId: string, @Param() eventoId: string) {
    return this.spotsService.remove(eventoId, lugarId);
  }
}
