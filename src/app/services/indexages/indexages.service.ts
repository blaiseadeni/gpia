import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IndexagesService {
    
    baseApiUrl: string = environment.baseApiUrl;
    // baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    
    constructor(private http: HttpClient) { }
    
    getAll(){
        return this.http.get(this.baseApiUrl + 'api/IndexClients');
    }
    
    add(indexage: any){
        return this.http.post(this.baseApiUrl + 'api/IndexClients', indexage, this.headers);
    }
    
    get(id: any){
        return this.http.get(this.baseApiUrl + 'api/IndexClients/' + id);
    }
    getLastIndex(id: any){
        return this.http.get(this.baseApiUrl + 'api/ancienIndex/' + id);
    }
    
    update(id: any, indexage: any)
    {
        return this.http.put(this.baseApiUrl + 'api/IndexClients/' + id, indexage);
    }
    
    delete(id: any){
        return this.http.delete(this.baseApiUrl +'api/IndexClients/' + id);
    }
}
