import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { ContentModel } from '../models';
import boolean from '@fakerjs/boolean';

export const ContentModelFactory = setSeederFactory(ContentModel, (faker: Faker) => {
    const contentModel = new ContentModel();
    contentModel.name = faker.name.firstName();
    contentModel.displayName = faker.lorem.sentence();
    contentModel.published = boolean();
    return contentModel;
});
