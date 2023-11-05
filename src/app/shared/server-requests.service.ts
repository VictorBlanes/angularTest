import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServerRequestsService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  public retrieveComments() {
    const result = this.http.request('GET', this.url + "/search", {
      responseType: 'json',
      observe: 'body'
    });
    return result;
  }

  public makeComment(data?: any) {
    const result = this.http.request('POST', this.url + "/event", {
      body: data,
      responseType: 'json',
      observe: 'body',
    });
    return result;
  }
}
