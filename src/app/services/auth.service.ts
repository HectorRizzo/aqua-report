import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class Auth {
  
  constructor() {}

    public isLoggedIn(): boolean {
        const userData = localStorage.getItem('usuarioAqua');
        if (userData) {
            return true;
        }
        return false;
    }
    
    public getUserData(): any {
        const userData = localStorage.getItem('usuarioAqua');
        if (userData && userData.length > 0) {
            return JSON.parse(userData);
        }
        return null;
    }
}