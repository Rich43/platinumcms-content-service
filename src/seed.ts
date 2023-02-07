import 'reflect-metadata';
import { runSeeders } from 'typeorm-extension';
import * as models from './models';
import { ContentModelFactory, ContentRevisionModelFactory, MainSeeder } from './seeding';
import { dictToArray } from './setup/utils';
import { createAppDataSource } from './setup/datasource';

const extraConfig = {
    entities: dictToArray(models),
    factories: [ContentModelFactory, ContentRevisionModelFactory],
    seeds: [MainSeeder],
};

const dataSource = createAppDataSource(extraConfig);

dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
});
