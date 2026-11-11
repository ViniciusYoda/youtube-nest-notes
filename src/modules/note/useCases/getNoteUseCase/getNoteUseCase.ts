import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import type { NoteRepository } from '../../repositories/noteRepository.js';

interface GetNoteRequest {
  noteId: string;
  userId: string;
}

export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NotFoundException();

    if (note.userId !== userId) throw new UnauthorizedException();

    return note;
  }
}