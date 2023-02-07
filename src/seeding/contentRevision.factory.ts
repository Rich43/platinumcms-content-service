import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { ContentRevisionModel } from '../models';

export const ContentRevisionModelFactory = setSeederFactory(ContentRevisionModel, (faker: Faker) => {
    const contentRevisionModel = new ContentRevisionModel();
    contentRevisionModel.content = faker.lorem.sentence();
    contentRevisionModel.summary = faker.lorem.sentence();
    return contentRevisionModel;
});
