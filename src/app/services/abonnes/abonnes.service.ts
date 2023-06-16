import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AbonnesService {
    baseApiUrl: string = environment.baseApiUrl;
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    
    constructor(private http: HttpClient) { }
    
    getAll(){
        return this.http.get(this.baseApiUrl + 'api/Abonnes');
    }
    
    add(abonne: any){
        return this.http.post(this.baseApiUrl + 'api/Abonnes', abonne, this.headers);
    }
    
    get(id: string){
        return this.http.get(this.baseApiUrl + 'api/Abonnes/' + id);
    }
    
    update(id?: string, abonne?: any)
    {
        return this.http.put(this.baseApiUrl + 'api/Abonnes/' + id, abonne);
    }
    
    delete(id?: string){
        return this.http.delete(this.baseApiUrl +'api/Abonnes/' + id);
    }
}
