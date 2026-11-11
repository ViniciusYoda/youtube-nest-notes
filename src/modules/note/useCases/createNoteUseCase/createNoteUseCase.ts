import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/note.js';
import { NoteRepository } from '../../repositories/noteRepository.js';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ title, userId, description }: CreateNoteRequest) {
    const note = new Note({
      title,
      description,
      userId,
    });

    await this.noteRepository.create(note);

    return note;
  }
}