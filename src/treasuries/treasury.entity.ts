import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { Organization } from '../organizations/organization.entity';
import { Account } from '../account/account.entity';

@Entity('treasury')
export class Treasury {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Organization, (org) => org.treasuries, {
    onDelete: 'CASCADE',
    nullable: false
  })
  organization: Organization;

  @ManyToOne(() => Account, { nullable: false })
  account: Account;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

}  