import { 
	Entity, 
	PrimaryColumn, 
	Column, 
	ManyToOne,
	JoinColumn,
	BeforeInsert,
} from "typeorm"

import { User } from '../../../users/entities/user.entity'
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class Order {
	@PrimaryColumn({ type: 'varchar', unique: true })
	orderid: string

	@Column({ type: 'varchar' })
	kategori_laundry: string

	@Column({ type: 'int', })
	jumlah_pakaian: number

	@Column({ type: 'int', })
	berat_pakaian: number

	@Column({ type: 'varchar' })
	metode_pembayaran: string

	@Column({ type: 'varchar' })
	penilaian: string

	@Column({ type: 'int', })
	jumlah_pembayaran: number

	// relasi ke user
	@ManyToOne(() => User, user => user.orders)
	@JoinColumn({ name: 'userid'})
	userid: string;

	@BeforeInsert()
	generateInsert() {
		this.orderid = uuidV4()
	}
}