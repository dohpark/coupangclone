export abstract class HTTPClient<T> {
  instance: T;

  constructor(instance: T) {
    this.instance = instance;
  }

  abstract usePost(url: string, dataObject?: any, config?: any): any;
  abstract useGet(url: string, config?: any): any;
  abstract usePut(url: string, dataObject?: any, config?: any): any;
  abstract usePatch(url: string, dataObject?: any, config?: any): any;
  abstract useDelete(url: string, config?: any): any;
}

// auth
