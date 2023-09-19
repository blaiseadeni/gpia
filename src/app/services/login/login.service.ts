import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    baseApiUrl: string = environment.baseApiUrl;
    // baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    login(login: any) {
        return this.http.post(this.baseApiUrl + 'api/Login', login, this.headers);
    }

    update(id?: any, user?: any){
        return this.http.put(this.baseApiUrl + 'api/Users/' + id, user);
    }

}
