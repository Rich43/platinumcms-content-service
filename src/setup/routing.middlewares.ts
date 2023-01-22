import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { Service } from 'typedi'

@Middleware({ type: 'before' })
@Service()
export class HeaderMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next?: (err?: any) => any): any {
        response.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
        response.set('Access-Control-Allow-Headers', ['content-type'])
        response.set('Access-Control-Allow-Credentials', 'true')
        response.set('Content-Type', 'application/json; charset=utf-8')
        if (next) {
            next();
        }
    }
}
