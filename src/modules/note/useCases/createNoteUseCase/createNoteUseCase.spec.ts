import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory.js';
import { CreateNoteUseCase } from './createNoteUseCase.js';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('Create Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to create note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'Dar like no video',
      userId: '123123',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});