import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AgencesService {
    baseApiUrl: string = environment.baseApiUrl;
//    baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(this.baseApiUrl + 'api/Agences');
    }

    add(agence: any){
        return this.http.post(this.baseApiUrl + 'api/Agences', agence, this.headers);
    }

    get(id: string){
        return this.http.get(this.baseApiUrl + 'api/Agences/' + id);
    }

    update(id?: string, agence?: any)
    {
        return this.http.put(this.baseApiUrl + 'api/Agences/' + id, agence);
    }

    delete(id?: string){
        return this.http.delete(this.baseApiUrl +'api/Agences/' + id);
    }
}
