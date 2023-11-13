import { IsNotEmpty, IsString, } from "class-validator";

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    nomor_handphone: number;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    nama_bank: string;

    @IsNotEmpty()
    nomor_rekening: number;

    @IsString()
    @IsNotEmpty()
    role: string;
}
