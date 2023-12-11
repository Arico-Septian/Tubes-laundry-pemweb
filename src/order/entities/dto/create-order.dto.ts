import { IsNotEmpty, IsString, } from "class-validator";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    kategori_laundry: string;

    @IsNotEmpty()
    jumlah_pakaian: number;

    @IsNotEmpty()
    berat_pakaian: number;

    @IsString()
    @IsNotEmpty()
    metode_pembayaran: string;

    @IsString()
    @IsNotEmpty()
    userid: string;
}
