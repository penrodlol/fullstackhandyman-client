import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

    constructor(@Inject('API_BASE_URL') private baseUrl: string) { }

    buildUrl = (url: string): string => `${this.baseUrl}/${url}`
}