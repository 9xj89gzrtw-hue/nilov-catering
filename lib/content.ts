import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONTENT_PATH = join(process.cwd(), 'data', 'content.json');

export function loadContent(): Record<string, unknown> {
  const raw = readFileSync(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function saveContent(data: Record<string, unknown>): void {
  writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
