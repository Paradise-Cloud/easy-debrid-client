export interface EasyDebridOptions {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
}

export class EasyDebrid {
  constructor(private readonly options: EasyDebridOptions) {}
}
