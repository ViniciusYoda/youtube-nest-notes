import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  CreateNoteUseCase,
} from '../../../../modules/note/useCases/createNoteUseCase/createNoteUseCase.js';
import { DeleteNoteUseCase } from '../../../../modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase.js';
import { EditNoteUseCase } from '../../../../modules/note/useCases/editNoteUseCase/editNoteUseCase.js';
import { GetManyNoteUseCase } from '../../../../modules/note/useCases/getManyUseCase/getManyUseCase.js';
import { GetNoteUseCase } from '../../../../modules/note/useCases/getNoteUseCase/getNoteUseCase.js';
import type { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel.js';
import { CreateNoteBody } from './dtos/createNoteBody.js';
import { EditNoteBody } from './dtos/editNoteBody.js';
import { NoteViewModel } from './viewModels/noteViewModel.js';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private getManyNoteUseCase: GetManyNoteUseCase,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const { title, description } = body;

    const user = await this.createNoteUseCase.execute({
      title,
      description,
      userId: request.user.id,
    });

    return NoteViewModel.toHttp(user);
  }

  @Delete(':id')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    await this.deleteNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
  }

  @Put(':id')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
    @Body() body: EditNoteBody,
  ) {
    const { title, description } = body;

    await this.editNoteUseCase.execute({
      noteId,
      userId: request.user.id,
      title,
      description,
    });
  }

  @Get(':id')
  async getNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    const user = await this.getNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });

    return NoteViewModel.toHttp(user);
  }

  @Get()
  async getManyNote(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const users = await this.getManyNoteUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return users.map((note) => NoteViewModel.toHttp(note));
  }
}