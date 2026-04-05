import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { JournalLine } from './journal_lines.entity';
import { Organization } from '../../organizations/organization.entity';

@Entity('journal_entries')
export class JournalEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  referenceType?: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column({ nullable: true })
  referenceId?: string;

  @Column({ type: 'date' })
  date: Date;

  @OneToMany(() => JournalLine, (line) => line.entry, { cascade: true })
  lines: JournalLine[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}