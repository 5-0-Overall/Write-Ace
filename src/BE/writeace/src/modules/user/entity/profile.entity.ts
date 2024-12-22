import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile')
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    user_id: number;

    @Column({nullable: true})
    avatar: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false, default: false})
    is_gmail: boolean;

}
