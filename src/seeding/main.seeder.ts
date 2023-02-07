import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ContentModel, ContentRevisionModel } from '../models';
import { ContentRepository } from '../repositories';

export class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const contentModelFactory = factoryManager.get(ContentModel);
        const contentRevisionModelFactory = factoryManager.get(ContentRevisionModel);
        const contentModels = await Promise.all(
            Array(50)
                .fill('')
                .map(async () => await contentModelFactory.make({
                    contentRevisions: await contentRevisionModelFactory.saveMany(10)
                }))
        );
        await ContentRepository(dataSource).save(contentModels);
    }
}
