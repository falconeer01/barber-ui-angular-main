import { Injectable } from "@angular/core";
import { BaseTimeStampService } from "./base.service";
import { DataResponse, User, UserSetClaim, UserWithClaim, UserWithWorkingRanges, UserWorkingRange } from "../models";
import { Observable, ReplaySubject } from "rxjs";
import { environment } from "app/environments/environment";

@Injectable({
    providedIn:'root'
})
export class UserService extends BaseTimeStampService<User>{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor(){
        super("users");
     }

    set user(value: User)
    {
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    getByIdWithClaims(userId:number):Observable<DataResponse<UserWithClaim>>{
        return this.httpClient.get<DataResponse<UserWithClaim>>(environment.getApiUrl("/users/get-by-id-with-claims/"+userId));
    }
    addClaim(userSetClaim:UserSetClaim):Observable<Response>{
        return this.httpClient.post<Response>(environment.getApiUrl('/users/add-claim'),userSetClaim);
    }
    removeClaim(userSetClaim:UserSetClaim):Observable<Response>{
        return this.httpClient.post<Response>(environment.getApiUrl('/users/remove-claim'),userSetClaim);
    }
    getByIdWithWorkingRanges(userId:number):Observable<DataResponse<UserWithWorkingRanges>>{
        return this.httpClient.get<DataResponse<UserWithWorkingRanges>>(environment.getApiUrl('/users/get-by-id-with-working-ranges/'+userId));
    }
    addWorkingRange(userWorkingRange:UserWorkingRange):Observable<Response>{
        return this.httpClient.post<Response>(environment.getApiUrl('/users/add-working-range'),userWorkingRange)
    }
    removeWorkingRangeById(userWorkingRangeId:number):Observable<Response>{
        return this.httpClient.get<Response>(environment.getApiUrl('/users/remove-working-range/'+userWorkingRangeId))
    }
    setWorkingRange(userWorkingRange:UserWorkingRange):Observable<Response>{
        return this.httpClient.post<Response>(environment.getApiUrl('/users/set-working-range'),userWorkingRange)
    }
}
