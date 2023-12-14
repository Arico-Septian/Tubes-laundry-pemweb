import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from "src/order/entities/entities/order.entity"
import { User } from 'src/users/entities/user.entity'


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: parseInt(process.env.laundry),
            username: 'root',
            password: '',
            database: 'laundry',
             entities: [
                User,
                Order
            ],
            synchronize: true,
        })
    ]
})
export class DatabaseModule {}