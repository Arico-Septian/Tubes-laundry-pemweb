import { Injectable, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { RegistrasiDto } from '../dto/registrasi.dto';
import { LoginAuhDTO } from '../dto/login-auth.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,private jwtService: JwtService){}

  async create(body: RegistrasiDto) {
    try {
      const hashPassword = await bcrypt.hash(body.password, 15)

      const user = this.userRepository.create({ 
        username: body.username, 
        nomor_handphone: body.nomor_handphone,
        email: body.email, 
        password:hashPassword, 
        nama_bank:body.nama_bank,
        nomor_rekening:body.nomor_rekening,
        role: body.role 
      })
      await this.userRepository.save(user)

      return user

    } catch (error) {

      throw new UnprocessableEntityException('Email already exists')
    }
  }

  async login(body: LoginAuhDTO) {
    const user =
      await this.userRepository.findOneBy({ username: body.username })

    if(!user)
      throw new NotFoundException(`User ${body.username} not found`);

    const passwordMatch = await bcrypt.compare(body.password, user.password)

    if(!passwordMatch)
      throw new NotAcceptableException('password error');

    const payload = { sub: user.userid, username: user.username };

    return {
      "userid": user.userid,
      "username": user.username,
      "nomor_handphone": user.nomor_handphone,
      "password": user.password,
      "email": user.email,
      "nama_bank": user.nama_bank,
      "nomor_rekening": user.nomor_rekening,
      "role": user.role,
      "access_token": await this.jwtService.signAsync(payload),
    };
  }

  async update(userid: string, body: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ userid })

      Object.assign(user, body)

      await this.userRepository.save(user)

      return user;

    } catch (err) {
      console.log(err)
    }
  }

  async findOne(userid: string): Promise<User[] | null> {
    try {
      const user = await this.userRepository.findBy({
        userid
      })

      return user;

    } catch (err) {
      console.log(err)
    }
  }

  
}
