import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompteursService {
    baseApiUrl: string = environment.baseApiUrl;
    //  baseApiUrl: string = 'http://192.168.142.89:89/';
    //  baseApiUrl: string = 'https://localhost:7042/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(this.baseApiUrl + 'api/Compteurs');
    }

    add(compteur: any){
        return this.http.post(this.baseApiUrl + 'api/Compteurs', compteur, this.headers);
    }

    get(id: string){
        return this.http.get(this.baseApiUrl + 'api/Compteurs/' + id);
    }

    update(id?: string, compteur?: any)
    {
        return this.http.put(this.baseApiUrl + 'api/Compteurs/' + id, compteur);
    }

    delete(id?: string){
        return this.http.delete(this.baseApiUrl +'api/Compteurs/' + id);
    }
}
