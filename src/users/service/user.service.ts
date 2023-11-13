import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(body: UpdateUserDto) {
    try {
      const user = this.userRepository.create({ 
        username: body.username,
        password: body.password,
        nomor_handphone: body.nomor_handphone, 
        email: body.email, 
        nomor_rekening: body.nomor_rekening,
        nama_bank: body.nama_bank,
        role: body.role,
      })
      await this.userRepository.save(user)

      return user

    } catch (error) {

      throw new UnprocessableEntityException('input data error')
    }

  }
  async findAll(): Promise<User[] | null> {
    const user = await this.userRepository.find()
    return user;
  }

  async remove(userid: string) {
    await this.userRepository.delete(userid)
    return `This action removes a #${userid} user`;
  }

  async update(userid: string, body: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ userid })

      Object.assign(user, body)

      await this.userRepository.save(user)

      return user;

    } catch (error) {
      console.log(error)
    }
  }

  async findOne(userid: string): Promise<User[] | null> {
    try {
      const user = await this.userRepository.findBy({
        userid
      })

      return user;

    } catch (error) {
      console.log(error.message)
    }
  }
}