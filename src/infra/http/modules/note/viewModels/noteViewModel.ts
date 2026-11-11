import { Note } from '../../../../../modules/note/entities/note.js';
export class NoteViewModel {
  static toHttp({ id, title, description, createdAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}