import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { ContentModel } from '../models';

export const ContentModelFactory = setSeederFactory(ContentModel, (faker: Faker) => {
    const contentModel = new ContentModel();
    contentModel.name = faker.name.firstName() + faker.name.lastName();
    contentModel.displayName = faker.lorem.sentence();
    contentModel.published = Math.random() >= 0.5;
    return contentModel;
});
