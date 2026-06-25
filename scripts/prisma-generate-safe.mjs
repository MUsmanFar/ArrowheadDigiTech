/**
 * Runs prisma generate; on Windows EPERM (dev server locking query_engine DLL),
 * continues when a generated client already exists.
 */
import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const clientIndex = path.join('node_modules', '.prisma', 'client', 'index.js');

const result = spawnSync('npx', ['prisma', 'generate'], {
  stdio: 'pipe',
  shell: true,
  encoding: 'utf8',
});

const output = `${result.stdout || ''}${result.stderr || ''}`;

if (result.status === 0) {
  process.exit(0);
}

if (output.includes('EPERM') && existsSync(clientIndex)) {
  console.warn(
    '[build] prisma generate EPERM — Prisma client already exists. Stop the dev server for a clean generate.',
  );
  process.exit(0);
}

if (output) process.stderr.write(output);
process.exit(result.status ?? 1);
