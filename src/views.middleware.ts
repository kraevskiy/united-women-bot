import {NestMiddleware} from '@nestjs/common'

export class ViewsMiddleware implements NestMiddleware {
  constructor() {
  }
  use(req: any, res: any, next: (error?: any) => void): any {
    res.locals.appName = 'United Woman';
    next()
  }
}
