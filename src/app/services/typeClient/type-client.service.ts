import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TypeClientService {
    baseApiUrl: string = environment.baseApiUrl;
    // baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(this.baseApiUrl + 'api/TypeClient');
    }

    add(type: any){
        return this.http.post(this.baseApiUrl + 'api/TypeClient', type, this.headers);
    }

    get(id: string){
        return this.http.get(this.baseApiUrl + 'api/TypeClient/' + id);
    }

    update(id?: string, rue?: any)
    {
        return this.http.put(this.baseApiUrl + 'api/TypeClient/' + id, rue);
    }

    delete(id?: string){
        return this.http.delete(this.baseApiUrl +'api/TypeClient/' + id);
    }
}
