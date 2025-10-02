import 'reflect-metadata';
import { AppDataSource } from './data-source';

async function run() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  await AppDataSource.destroy();
  // eslint-disable-next-line no-console
  console.log('Migrations ran successfully');
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
