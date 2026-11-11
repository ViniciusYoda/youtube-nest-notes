import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { makeUser } from '../../../user/factories/userFactory.js';
import { makeNote } from '../../factories/noteFactory.js';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory.js';
import { EditNoteUseCase } from './editNoteUseCase.js';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    const tilteChanged = 'title changed';
    const descriptionChanged = 'description changed';

    await editNoteUseCase.execute({
      title: tilteChanged,
      description: descriptionChanged,
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(tilteChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      descriptionChanged,
    );
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(
      editNoteUseCase.execute({
        title: 'se inscriva de novo',
        noteId: 'fakeId',
        userId: 'fakeId',
      }),
    ).rejects.toThrowError(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(
      editNoteUseCase.execute({
        title: 'se inscriva de novo',
        noteId: note.id,
        userId: 'fakeId',
      }),
    ).rejects.toThrowError(UnauthorizedException);
  });
});