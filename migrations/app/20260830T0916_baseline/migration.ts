#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/fe6a0f55e4ed16a1756924af5bf4bcd2b167c5458144bc3476dcb9f26096e671/contract';
import endContract from '../../snapshots/fe6a0f55e4ed16a1756924af5bf4bcd2b167c5458144bc3476dcb9f26096e671/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'company',
        columns: [
          col('bgColor', 'text', {
            default: lit('bg-indigo-600'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('logoUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'job',
        columns: [
          col('companyId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isFeatured', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('jobType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('location', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('salary', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tags', 'text[]', { notNull: true, codecRef: { codecId: 'pg/text@1', many: true } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('workplaceType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'job_jobType_check_7ef1cd20',
            "\"jobType\" IN ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT')",
          ),
          checkExpression(
            'job_tags_elem_not_null_aecbe9e2',
            'array_position("tags", NULL) IS NULL',
          ),
          checkExpression(
            'job_workplaceType_check_aac99d1b',
            "\"workplaceType\" IN ('REMOTE', 'HYBRID', 'ON_SITE')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'savedJob',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('jobId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('username', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'savedJob',
        constraint: 'savedJob_userId_jobId_key',
        columns: ['userId', 'jobId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_companyId_idx_33acc5ed',
        columns: ['companyId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'savedJob',
        index: 'savedJob_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'savedJob',
        index: 'savedJob_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'job',
        foreignKey: {
          name: 'job_companyId_fkey',
          columns: ['companyId'],
          references: { schema: 'public', table: 'company', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'savedJob',
        foreignKey: {
          name: 'savedJob_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'savedJob',
        foreignKey: {
          name: 'savedJob_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
