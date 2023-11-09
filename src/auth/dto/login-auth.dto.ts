import { PartialType } from '@nestjs/mapped-types';
import { RegistrasiDto } from './registrasi.dto';

export class LoginAuhDTO extends PartialType(RegistrasiDto) {}
