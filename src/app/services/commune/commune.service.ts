import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommuneService {
    baseApiUrl: string = environment.baseApiUrl;
    // baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(this.baseApiUrl + 'api/Commune');
    }

    add(agence: any){
        return this.http.post(this.baseApiUrl + 'api/Commune', agence, this.headers);
    }

    get(id: string){
        return this.http.get(this.baseApiUrl + 'api/Commune/' + id);
    }

    update(id?: string, commune?: any)
    {
        return this.http.put(this.baseApiUrl + 'api/Commune/' + id, commune);
    }

    delete(id?: string){
        return this.http.delete(this.baseApiUrl +'api/Commune/' + id);
    }
}
