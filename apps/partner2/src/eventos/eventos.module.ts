import { Module } from '@nestjs/common';
import { EventsCoreModule } from '../../../../libs/core/src/events/events-core.module';
import { EventosController } from './eventos.controller';

@Module({
  imports: [EventsCoreModule],
  controllers: [EventosController],
})
export class EventosModule {}
