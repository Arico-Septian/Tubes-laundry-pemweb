import { 
	Entity, 
	PrimaryColumn, 
	Column, 
	OneToMany,
	BeforeInsert,
} from "typeorm"

import { v4 as uuidV4 } from 'uuid'
import { Order } from "src/order/entities/entities/order.entity"

@Entity()
export class User {
	@PrimaryColumn({ type: 'varchar' })
	userid: string

	@Column({ type: 'varchar', unique: true })
	username: string

	@Column({ type: 'int' })
	nomor_handphone: number

	@Column({ type: 'varchar' })
	password: string

	@Column({ type: 'varchar',unique: true })
	email: string

	@Column({ type: 'varchar' })
	nama_bank: string

	@Column({ type: 'int' })
	nomor_rekening: number

	@Column({ type: 'varchar' })
	role: string

	// relasi ke order
	@OneToMany(() => Order, (order) => order.userid)
	orders: Order[]

	@BeforeInsert()
	generateInsert() {
		this.userid = uuidV4()
	}
}