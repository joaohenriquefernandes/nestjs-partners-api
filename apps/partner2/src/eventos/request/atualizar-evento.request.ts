import { PartialType } from '@nestjs/mapped-types';
import { CriarEventoRequest } from './cria-evento.request';

export class AtualizarEventoRequest extends PartialType(CriarEventoRequest) {}
