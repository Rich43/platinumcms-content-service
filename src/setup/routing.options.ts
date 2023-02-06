import { RoutingControllersOptions } from 'routing-controllers';
import * as controllers from '../controllers';
import { dictToArray } from './utils';
import { serverSettings } from '../config';

export const routingConfigs: RoutingControllersOptions = {
    controllers: dictToArray(controllers),

    routePrefix: serverSettings.context,

    validation: true,
}
