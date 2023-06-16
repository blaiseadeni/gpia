import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IndexagesService {

    baseApiUrl: string = environment.baseApiUrl;
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

     getAll(){
        return this.http.get(this.baseApiUrl + 'api/Indexages');
    }

    add(indexage: any){
        return this.http.post(this.baseApiUrl + 'api/Indexages', indexage, this.headers);
    }

    get(id: string){
        return this.http.get(this.baseApiUrl + 'api/Indexages/' + id);
    }

    update(id?: string, indexage?: any)
    {
        return this.http.put(this.baseApiUrl + 'api/Indexages/' + id, indexage);
    }

    delete(id?: string){
        return this.http.delete(this.baseApiUrl +'api/Indexages/' + id);
    }
}
