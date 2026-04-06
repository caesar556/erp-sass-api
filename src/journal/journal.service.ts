import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { JournalEntry } from './entities/journal_entries.entity';
import { JournalLine } from './entities/journal_lines.entity';
import { Account } from '../account/account.entity';
import { CreateJournalEntryDto } from './dto/journal.dto';

@Injectable()
export class JournalService {

  async createEntry(
    manager: EntityManager,
    dto: CreateJournalEntryDto
  ): Promise<JournalEntry> {

    // ===============================
    // 1. Basic validation
    // ===============================
    if (!dto.lines || dto.lines.length < 2) {
      throw new BadRequestException('Journal entry must have at least 2 lines');
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const l of dto.lines) {
      if (l.debit > 0 && l.credit > 0) {
        throw new BadRequestException('Line cannot have both debit and credit');
      }

      if (l.debit === 0 && l.credit === 0) {
        throw new BadRequestException('Line must have value');
      }

      totalDebit += Number(l.debit);
      totalCredit += Number(l.credit);
    }

    if (totalDebit !== totalCredit) {
      throw new BadRequestException('Journal entry not balanced');
    }

    // ===============================
    // 2. Handle Account IDs (FIX)
    // ===============================
    const accountIds = dto.lines.map(l => l.accountId);

    // 🔥 remove duplicates
    const uniqueIds = [...new Set(accountIds)];

    // ===============================
    // 3. Fetch accounts (multi-tenant safe)
    // ===============================
    const accounts = await manager.find(Account, {
      where: {
        id: In(uniqueIds),
        organization: { id: dto.organizationId },
      },
    });

    // ===============================
    // 4. Strong validation
    // ===============================
    const foundIds = new Set(accounts.map(a => a.id));

    const missing = uniqueIds.filter(id => !foundIds.has(id));

    if (missing.length > 0) {
      throw new BadRequestException(
        `Accounts not found or not in this organization: ${missing.join(', ')}`
      );
    }

    // ===============================
    // 5. Map accounts
    // ===============================
    const accountMap = new Map(accounts.map(acc => [acc.id, acc]));

    // ===============================
    // 6. Create Journal Entry
    // ===============================
    const entry = manager.create(JournalEntry, {
      description: dto.description,
      date: dto.date,
      organization: { id: dto.organizationId },
      referenceType: dto.referenceType,
      referenceId: dto.referenceId,
    });

    // ===============================
    // 7. Create Lines
    // ===============================
    const lines: JournalLine[] = dto.lines.map((l) => {
      const account = accountMap.get(l.accountId);

      return manager.create(JournalLine, {
        debit: l.debit,
        credit: l.credit,
        account,
        organization: { id: dto.organizationId },
        entry,
      });
    });

    entry.lines = lines;

    // ===============================
    // 8. Save (transaction-safe)
    // ===============================
    return await manager.save(entry);
  }
}