import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegistrasiDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    nomor_handphone: number;

    @IsString()
    @IsNotEmpty()
    nama_bank: string;

    @IsNotEmpty()
    nomor_rekening: number;

    @IsString()
    role: string;
}
