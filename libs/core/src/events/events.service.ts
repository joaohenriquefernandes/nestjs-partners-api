import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, SpotStatus, TicketStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      data: {
        ...updateEventDto,
        date: new Date(updateEventDto.date),
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.event.delete({
      where: {
        id,
      },
    });
  }

  async reserveSpot(eventId: string, reserveSpotDto: ReserveSpotDto) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        name: {
          in: reserveSpotDto.spots,
        },
        eventId,
      },
    });

    if (spots.length !== reserveSpotDto.spots.length) {
      const foundSpotsName = spots.map((spot) => spot.name);

      const notFoundSpotsName = reserveSpotDto.spots.filter(
        (spotName) => !foundSpotsName.includes(spotName),
      );
      throw new NotFoundException(
        `Spots ${notFoundSpotsName.join(', ')} not found.`,
      );
    }

    try {
      const tickets = await this.prismaService.$transaction(async (prisma) => {
        await prisma.reservationHistory.createMany({
          data: spots.map((spot) => ({
            spotId: spot.id,
            ticketKind: reserveSpotDto.ticket_kind,
            email: reserveSpotDto.email,
            status: TicketStatus.reserved,
          })),
        });

        await prisma.spot.updateMany({
          where: {
            id: {
              in: spots.map((spot) => spot.id),
            },
          },
          data: {
            status: SpotStatus.reserved,
          },
        });

        const tickets = await Promise.all(
          spots.map((spot) =>
            prisma.ticket.create({
              data: {
                email: reserveSpotDto.email,
                ticketKind: reserveSpotDto.ticket_kind,
                spotId: spot.id,
              },
            }),
          ),
        );

        return tickets;
      });

      return { tickets };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
          case 'P2034':
            throw new ConflictException('Some spots are already reserved');
        }
      }

      throw error;
    }
  }
}
