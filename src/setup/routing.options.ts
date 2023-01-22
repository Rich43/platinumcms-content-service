import { RoutingControllersOptions } from 'routing-controllers'
import * as controllers from '../controllers'
import * as middlewares from './routing.middlewares'
import * as interceptors from './interceptors'
import { dictToArray } from './utils'
import { serverSettings } from '../config';

export const routingConfigs: RoutingControllersOptions = {
    controllers: dictToArray(controllers),

    middlewares: dictToArray(middlewares),

    interceptors: dictToArray(interceptors),

    routePrefix: serverSettings.context,

    validation: true,
}
