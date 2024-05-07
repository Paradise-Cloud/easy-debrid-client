export interface EasyDebridOptions {
  clientId: string;
  clientSecret: string;
}

export class EasyDebrid {
  constructor(private readonly options: EasyDebridOptions) {}
}
