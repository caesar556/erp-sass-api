import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { AccountType } from '../utils/enums';
import { JournalLine } from '../journal/entities/journal_lines.entity';
import { Organization } from '../organizations/organization.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  type: AccountType;

  @ManyToOne(() => Account, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  parent?: Account;

  @ManyToOne(() => Organization, (org) => org.accounts)
  organization: Organization;

  @OneToMany(() => JournalLine, (line) => line.account)
  journalLines: JournalLine[];

  @OneToMany(() => Account, (a) => a.parent)
  children: Account[];


  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}