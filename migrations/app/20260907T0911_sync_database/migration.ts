#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5a242658e171d8d4dbd57fe6d0eddd28c9f25a2682aacc52e048f6494a60d93d/contract';
import endContract from '../../snapshots/5a242658e171d8d4dbd57fe6d0eddd28c9f25a2682aacc52e048f6494a60d93d/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/fe6a0f55e4ed16a1756924af5bf4bcd2b167c5458144bc3476dcb9f26096e671/contract';
import startContract from '../../snapshots/fe6a0f55e4ed16a1756924af5bf4bcd2b167c5458144bc3476dcb9f26096e671/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'savedJob' }),
      this.dropTable({ schema: 'public', table: 'user' }),
      this.createTable({
        schema: 'public',
        table: 'application',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('fullName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('resumeUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'testimonial',
        columns: [
          col('authorCompanyOrSchool', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('authorName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('authorRole', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('avatarColor', 'text', {
            default: lit('bg-indigo-600'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('quote', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('rating', 'int4', {
            notNull: true,
            default: lit(5),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'company',
        column: col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'company',
        column: col('employees', 'text', {
          default: lit('500-1,000 emp'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'company',
        column: col('industry', 'text', {
          default: lit('Technology'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'company',
        column: col('updatedAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'job',
        column: col('dueDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'job',
        column: col('updatedAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.setDefault({
        schema: 'public',
        table: 'company',
        column: 'bgColor',
        defaultSql: "DEFAULT 'bg-slate-900'",
        operationClass: 'widening',
      }),
      this.setDefault({
        schema: 'public',
        table: 'job',
        column: 'jobType',
        defaultSql: "DEFAULT 'FULL_TIME'",
      }),
      this.dropNotNull({ schema: 'public', table: 'job', column: 'salary' }),
      this.setDefault({
        schema: 'public',
        table: 'job',
        column: 'workplaceType',
        defaultSql: "DEFAULT 'HYBRID'",
      }),
      this.createIndex({
        schema: 'public',
        table: 'application',
        index: 'application_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'application',
        foreignKey: {
          name: 'application_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
