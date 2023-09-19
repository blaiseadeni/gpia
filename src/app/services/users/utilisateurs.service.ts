import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilisateursService {

    baseApiUrl: string = environment.baseApiUrl;
    // baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.baseApiUrl + 'api/Utilisateur');
    }

    add(user: any) {
        return this.http.post(this.baseApiUrl + 'api/Utilisateur', user, this.headers);
    }

    get(id: string) {
        return this.http.get(this.baseApiUrl + 'api/Utilisateur/' + id);
    }

    update(id?: string, user?: any) {
        return this.http.put(this.baseApiUrl + 'api/Utilisateur/' + id, user);
    }

    updateLogin(id?: string, user?: any) {
        return this.http.put(this.baseApiUrl + 'api/Utilisateur/login/' + id, user);
    }

    activateCompte(id?: string, user?: any) {
        return this.http.put(this.baseApiUrl + 'api/Utilisateur/active/' + id, user);
    }

    delete(id?: string) {
        return this.http.delete(this.baseApiUrl + 'api/Utilisateur/' + id);
    }
}
