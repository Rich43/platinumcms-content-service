import { Service } from 'typedi'

@Service()
export class ContentService {
    async create() {
        return true;
    }
}
