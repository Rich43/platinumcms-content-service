import { ClassConstructor, IocAdapter } from 'routing-controllers';
import { DependencyContainer } from 'tsyringe';

export class SyringeAdapter implements IocAdapter {
    // eslint-disable-next-line no-unused-vars,no-useless-constructor,no-empty-function
    constructor(private readonly TsyringeContainer: DependencyContainer) {
    }

    get<T>(someClass: ClassConstructor<T>): T {
        const childContainer = this.TsyringeContainer.createChildContainer();
        return childContainer.resolve<T>(someClass);
    }
}
