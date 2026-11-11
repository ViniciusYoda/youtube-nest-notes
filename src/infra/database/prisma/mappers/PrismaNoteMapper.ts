import type { Note as NoteRaw } from '../../../../generated/prisma/client.js';
import { Note } from '../../../../modules/note/entities/note.js';

export class PrismaNoteMapper {
  static toPrisma({
    createdAt,
    description,
    id,
    title,
    userId,
  }: Note): NoteRaw {
    return {
      createdAt,
      description,
      id,
      title,
      userId,
    };
  }

  static toDomain({
    createdAt,
    description,
    id,
    title,
    userId,
  }: NoteRaw): Note {
    return new Note(
      {
        createdAt,
        description,
        title,
        userId,
      },
      id,
    );
  }
}