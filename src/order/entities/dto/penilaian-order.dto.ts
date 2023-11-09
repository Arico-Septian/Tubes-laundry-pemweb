import { IsNotEmpty, IsString, } from "class-validator";

export class PenilaianOrderDto {

    @IsString()
    @IsNotEmpty()
    penilaian : string
}
