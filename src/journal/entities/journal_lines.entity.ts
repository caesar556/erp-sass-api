import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Check,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { JournalEntry } from './journal_entries.entity';
import { Account } from '../../account/account.entity';
import { Organization } from '../../organizations/organization.entity';


@Entity('journal_lines')
@Check(`"debit" >= 0 AND "credit" >= 0`)
export class JournalLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { precision: 18, scale: 2, default: 0 })
  debit: number;

  @Column('numeric', { precision: 18, scale: 2, default: 0 })
  credit: number;

  @ManyToOne(() => JournalEntry, (entry) => entry.lines, { onDelete: 'CASCADE' })
  entry: JournalEntry;
  
  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => Account, (account) => account.journalLines)
  account: Account;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}