import { Module } from '@nestjs/common';
import { CreateNoteUseCase } from '../../../../modules/note/useCases/createNoteUseCase/createNoteUseCase.js';
import { DeleteNoteUseCase } from '../../../../modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase.js';
import { EditNoteUseCase } from '../../../../modules/note/useCases/editNoteUseCase/editNoteUseCase.js';
import { GetManyNoteUseCase } from '../../../../modules/note/useCases/getManyUseCase/getManyUseCase.js';
import { GetNoteUseCase } from '../../../../modules/note/useCases/getNoteUseCase/getNoteUseCase.js';
import { DatabaseModule } from '../../../database/database.module.js';
import { NoteController } from './note.controller.js';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [
    CreateNoteUseCase,
    DeleteNoteUseCase,
    EditNoteUseCase,
    GetNoteUseCase,
    GetManyNoteUseCase,
  ],
})
export class NoteModule {}