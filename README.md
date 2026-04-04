🚀 ERP System Backend (NestJS + TypeORM)

A scalable, production-ready ERP backend built with NestJS, following a modular architecture and implementing a Double Entry Accounting System.

---

🧠 Overview

This project is designed as a modern ERP backend that supports:

- Multi-tenant architecture (Organization-based)
- Double-entry accounting system
- Modular and scalable code structure
- Clean separation of concerns
- High performance and async processing

---

🏗️ Architecture

The system follows a layered architecture:

Controller → Service → Posting → Journal → Accounts

Core Flow

Transaction → PostingService → JournalService → Database
                                 ↓
                           AccountsService (balance & validation)

---

📦 Modules

1. Accounts Module

- Manages Chart of Accounts (COA)
- Supports hierarchical accounts (parent/children)
- Handles balance calculation from journal entries
- Validates financial integrity

---

2. Treasury Module

- Represents physical or virtual cash locations
- Each treasury is linked to an Account (ASSET)
- Acts as a business abstraction layer over accounts

---

3. Transactions Module

- Handles business use cases
- Initiates financial operations
- Manages database transactions (atomic operations)

---

4. Posting Module

- Core accounting engine
- Converts transactions into double-entry journal entries
- Ensures accounting rules are applied correctly

---

5. Journal Module

- Stores journal entries and lines
- Ensures:
  - Total Debit = Total Credit
- Acts as the single source of truth

---

💰 Accounting System

This system implements a Double Entry Accounting Model:

- Every transaction creates balanced journal entries
- No direct balance manipulation
- All balances are derived from "journal_lines"

Example

Debit: Cash Account       1000
Credit: Revenue Account   1000

---

⚙️ Tech Stack

- Framework: NestJS
- ORM: TypeORM
- Database: PostgreSQL
- Language: TypeScript

---

⚡ Performance & Scaling

Redis (Planned Integration)

- Caching frequently accessed data (e.g., balances)
- Session storage
- Rate limiting

BullMQ (Planned Integration)

- Background job processing
- Queue-based architecture
- Use cases:
  - Recalculating balances
  - Sending notifications
  - Heavy financial computations

---

🤖 AI Integration (Gemini)

The system will integrate Google Gemini AI to enhance ERP capabilities:

Planned Features:

- Smart financial insights
- Natural language queries (e.g., "What are my expenses this month?")
- Automated report generation
- Anomaly detection in transactions

---

🔐 Security

- JWT-based authentication
- Organization-level data isolation
- Validation and error handling using NestJS pipes
- Transaction-safe database operations

---

🧱 Design Principles

- Modular Architecture
- Single Responsibility Principle
- Separation of Concerns
- Scalable & Maintainable Codebase
- Database Transactions for Consistency

---

🚧 Future Enhancements

- Trial Balance
- General Ledger
- Financial Statements (P&L, Balance Sheet)
- Multi-currency support
- Role-Based Access Control (RBAC)
- Audit Logs
- SaaS Billing System

---

🛠️ Getting Started

# Install dependencies
pnpm install

# Run development server
pnpm run start:dev

# Build project
pnpm run build

# Run production
pnpm run start:prod