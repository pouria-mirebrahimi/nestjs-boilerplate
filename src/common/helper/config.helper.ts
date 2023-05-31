import { readFileSync } from 'fs';

export function jsonConfig(mode: string, param: string): object {
  const jsonFile = `${__dirname}/../config/${mode.toLowerCase()}.json`;
  const data = JSON.parse(readFileSync(jsonFile, 'utf-8'));

  if (param in data) {
    return data[param];
  } else {
    return {};
  }
}
