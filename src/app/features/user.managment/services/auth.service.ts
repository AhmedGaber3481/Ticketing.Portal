import { Injectable, signal } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { LoggedUser, LoginResult, UserLogin } from "../models/user.login.model";
import { environment } from "../../../../environments/environments";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { ApiResponse } from "../../../shared/models/api.response";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
    userSubject  = new BehaviorSubject<LoggedUser | null>(null);
    userObserver = this.userSubject.asObservable();
    authStatus = signal("IsLoading");

    constructor(private apiService: ApiService) {
        //this.Initialize();
    }

    SignIn(userLogin: UserLogin) : Observable<ApiResponse<LoginResult>>{
        return this.apiService.post<ApiResponse<LoginResult>>("/api/account/SignIn", userLogin, undefined, environment.BaseAuthApiURL)
        .pipe(tap((res: ApiResponse<LoginResult>) => {
            this.authStatus.set(res.data && res.data.loginSuccess ?
                "Authenticated": "NotAuthenticated"
            );
            this.userSubject.next({userFullName: res.data.userFullName, userId: res.data.userId});
        }));
    }
    SignOut(){
        return this.apiService.get<ApiResponse<boolean>>("/api/account/SignOut", undefined, environment.BaseAuthApiURL)
         .pipe(tap((res: any) => {
            this.authStatus.set( "NotAuthenticated");
            this.userSubject.next(null);
        }));
    }
    UserIsAuthenticated() : Observable<boolean>{
        return this.apiService.get<ApiResponse<LoggedUser>>("/api/account/GetLoggedUser", undefined, environment.BaseAuthApiURL)
        .pipe(map((res: any) => {

            this.authStatus.set(
                !!res.data?.userId ? 'Authenticated' : 'NotAuthenticated'
            );
            this.userSubject.next(res.data);
            return !!res.data?.userId;
        }));
    }
    
    private Initialize(){
        //Get logged user data
        this.apiService.get<ApiResponse<LoggedUser>>("/api/account/GetLoggedUser", undefined, environment.BaseAuthApiURL).subscribe({
            next: (response: ApiResponse<LoggedUser>) => {
                if(response){
                    if(response.data?.userId){
                        this.userSubject.next(response.data);
                        this.authStatus.set("Authenticated");
                    }
                    else{
                        this.authStatus.set("NotAuthenticated");
                    }
                }
                this.authStatus.set("Failed");
            },
            error: (error: any) => {
                this.authStatus.set("Failed");
            }
        })
    }
    IsAuthenticated(){
        return this.authStatus() === "Authenticated";
    }
}