import { CreateRepoInput } from './create-repo.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRepoInput extends PartialType(CreateRepoInput) {}
