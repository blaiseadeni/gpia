import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RueService {
    baseApiUrl: string = environment.baseApiUrl;
    // baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(this.baseApiUrl + 'api/Rue');
    }

    add(rue: any){
        return this.http.post(this.baseApiUrl + 'api/Rue', rue, this.headers);
    }

    get(id: string){
        return this.http.get(this.baseApiUrl + 'api/Rue/' + id);
    }

    update(id?: string, rue?: any)
    {
        return this.http.put(this.baseApiUrl + 'api/Rue/' + id, rue);
    }

    delete(id?: string){
        return this.http.delete(this.baseApiUrl +'api/Rue/' + id);
    }
}
