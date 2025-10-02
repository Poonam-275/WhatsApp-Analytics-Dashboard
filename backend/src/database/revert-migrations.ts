import 'reflect-metadata';
import { AppDataSource } from './data-source';

async function revert() {
  await AppDataSource.initialize();
  await AppDataSource.undoLastMigration();
  await AppDataSource.destroy();
  // eslint-disable-next-line no-console
  console.log('Last migration reverted');
}

revert().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
