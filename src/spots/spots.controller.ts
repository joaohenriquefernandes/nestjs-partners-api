import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotsService } from './spots.service';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(@Param() eventId: string, @Body() createSpotDto: CreateSpotDto) {
    return this.spotsService.create(eventId, createSpotDto);
  }

  @Get()
  findAll(@Param() eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':postId')
  findOne(@Param('postId') postId: string, @Param() eventId: string) {
    return this.spotsService.findOne(eventId, postId);
  }

  @Patch(':postId')
  update(
    @Param('postId') postId: string,
    @Param() eventId: string,
    @Body() updateSpotDto: UpdateSpotDto,
  ) {
    return this.spotsService.update(eventId, postId, updateSpotDto);
  }

  @Delete(':postId')
  remove(@Param('postId') postId: string, @Param() eventId: string) {
    return this.spotsService.remove(eventId, postId);
  }
}
