import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { makeUser } from '../../../user/factories/userFactory.js';
import { makeNote } from '../../factories/noteFactory.js';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory.js';
import { GetNoteUseCase } from './getNoteUseCase.js';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to get note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(result).toEqual(note);
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(
      getNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      }),
    ).rejects.toThrowError(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(
      getNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId',
      }),
    ).rejects.toThrowError(UnauthorizedException);
  });
});