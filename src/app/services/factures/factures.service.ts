import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FacturesService {
    baseApiUrl: string = environment.baseApiUrl;
    // baseApiUrl: string = 'http://192.168.142.89:89/';
    private headers = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(this.baseApiUrl + 'api/Facture');
    }
    getAllPeriodes(){
        return this.http.get(this.baseApiUrl + 'api/Facture/periode');
    }

    getAllFact(facture: any){
        return this.http.post(this.baseApiUrl + 'api/Report/factureQuartier', facture,{observe:'response',responseType:'blob'});
    }


    getFacture(facture: any){
        return this.http.post(this.baseApiUrl + 'api/Report/facture', facture,{observe:'response',responseType:'blob'});
    }

    listingRue(data: any){
        return this.http.post(this.baseApiUrl + 'api/Report/rue', data,{observe:'response',responseType:'blob'});
    }

    listingQuartier(data: any){
        return this.http.post(this.baseApiUrl + 'api/Report/quartier', data,{observe:'response',responseType:'blob'});
    }

    listingCommune(data: any){
        return this.http.post(this.baseApiUrl + 'api/Report/commune', data,{observe:'response',responseType:'blob'});
    }

    GeneratePDF(){
        return this.http.post(this.baseApiUrl + 'api/Report',{
            responseType:'arraybuffer',
        })
    }

    add(facture: any){
        return this.http.post(this.baseApiUrl + 'api/Facture', facture, this.headers);
    }

    get(id: any){
        return this.http.get(this.baseApiUrl + 'api/Facture/' + id);
    }

    update(id: any, indexage: any)
    {
        return this.http.put(this.baseApiUrl + 'api/Facture/' + id, indexage);
    }

    delete(id: any){
        return this.http.delete(this.baseApiUrl +'api/Facture/' + id);
    }
}
