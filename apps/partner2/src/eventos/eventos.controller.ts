import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from '../../../../libs/core/src/events/events.service';
import { AtualizarEventoRequest } from './request/atualizar-evento.request';
import { CriarEventoRequest } from './request/cria-evento.request';
import { ReservarLugarRequest } from './request/reservar-lugar.request';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() criarEventosRequest: CriarEventoRequest) {
    return this.eventsService.create({
      date: criarEventosRequest.data,
      description: criarEventosRequest.descricao,
      name: criarEventosRequest.nome,
      price: criarEventosRequest.preco,
    });
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() atualizarEventosRequest: AtualizarEventoRequest,
  ) {
    return this.eventsService.update(id, {
      date: atualizarEventosRequest.data,
      description: atualizarEventosRequest.descricao,
      name: atualizarEventosRequest.nome,
      price: atualizarEventosRequest.preco,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/reservar')
  reserveSpots(
    @Param('id') id: string,
    @Body() reservarLugarRequest: ReservarLugarRequest,
  ) {
    return this.eventsService.reserveSpot(id, {
      email: reservarLugarRequest.email,
      spots: reservarLugarRequest.lugares,
      ticket_kind: reservarLugarRequest.tipo_ingresso,
    });
  }
}
