import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { makeUser } from '../../../user/factories/userFactory.js';
import { makeNote } from '../../factories/noteFactory.js';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory.js';
import { DeleteNoteUseCase } from './deleteNoteUseCase.js';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to delete note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    await deleteNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(
      deleteNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      }),
    ).rejects.toThrowError(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(
      deleteNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId',
      }),
    ).rejects.toThrowError(UnauthorizedException);
  });
});