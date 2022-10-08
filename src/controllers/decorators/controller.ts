import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    const keys = Object.getOwnPropertyNames(target.prototype).filter(
      (key) => key !== 'constructor'
    );

    for (const key of keys) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);

      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
