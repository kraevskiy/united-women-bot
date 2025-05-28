import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentAdminByContext = (context: ExecutionContext) => context.switchToHttp().getRequest().user

export const CurrentAdmin = createParamDecorator((_data: unknown, context: ExecutionContext) => getCurrentAdminByContext(context))
