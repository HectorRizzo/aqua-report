import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    URL_API = environment.apiUrl;


    constructor(private http: HttpClient) {

     }


    public ApiCall(endpoint, method, data, data2=null) {
        const headers = new HttpHeaders(
            { "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, content-type",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "3600",

            });

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers , params : data2 });

            case "PUT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
            case "PUTMULT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
            case "DELETE":
            return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
            case "DELETE2":
                return this.http.request("delete", this.URL_API + endpoint, { headers: headers, params: data2, body: data });
        }

    }

}