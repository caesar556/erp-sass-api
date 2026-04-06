import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';

import { Treasury } from '../treasuries/treasury.entity';
import { JournalEntry } from '../journal/entities/journal_entries.entity';
import { Organization } from '../organizations/organization.entity';


@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('numeric', { precision: 18, scale: 2 })
  amount: number;

  @Column()
  type: string;

  @Column()
  paymentMethod: string;

  @ManyToOne(() => Organization, { nullable: false })
  organization: Organization;

  @Column()
  reference: string;

  @ManyToOne(() => Treasury)
  treasury: Treasury;

  @OneToOne(() => JournalEntry, { cascade: true })
  @JoinColumn()
  journalEntry: JournalEntry;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}