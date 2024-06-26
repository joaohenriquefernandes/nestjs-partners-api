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
import { SpotsService } from '../../../../libs/core/src/spots/spots.service';
import { CreateSpotRequest } from './request/create-spot.request';
import { UpdateSpotRequest } from './request/update-spot.request';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Param('eventId') eventId: string,
    @Body() createSpotRequest: CreateSpotRequest,
  ) {
    return this.spotsService.create(eventId, createSpotRequest);
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':postId')
  findOne(@Param('postId') postId: string, @Param('eventId') eventId: string) {
    return this.spotsService.findOne(eventId, postId);
  }

  @Patch(':postId')
  update(
    @Param('postId') postId: string,
    @Param('eventId') eventId: string,
    @Body() updateSpotRequest: UpdateSpotRequest,
  ) {
    return this.spotsService.update(eventId, postId, updateSpotRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':postId')
  remove(@Param('postId') postId: string, @Param('eventId') eventId: string) {
    return this.spotsService.remove(eventId, postId);
  }
}
