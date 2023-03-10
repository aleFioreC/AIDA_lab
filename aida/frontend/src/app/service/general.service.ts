import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class GeneralService {

    environment: string;

    constructor(private httpClient: HttpClient) {
        this.environment = environment.base_url
    }

    allNews() {
        return this.httpClient.get(this.environment + '/news/findAll');
    }

    topNews() {
        return this.httpClient.get(this.environment + '/news/findTop');
    }

    getNews(id: string) {
        return this.httpClient.get(this.environment + '/news/findById/' + id);
    }

    allPeople() {
        return this.httpClient.get(this.environment + '/people/findAll');
    }

    getPeople(id: string) {
        return this.httpClient.get(this.environment + '/people/findById/' + id);
    }

    allResearch() {
        return this.httpClient.get(this.environment + '/research/findAll');
    }

    getResearch(id: string) {
        return this.httpClient.get(this.environment + '/research/findById/' + id);
    }

    saveNews(body: any) {
        return this.httpClient.post(this.environment + '/news/save', body);
    }

    editNews(id, body: any) {
        return this.httpClient.put(this.environment + '/news/edit/' + id, body);
    }

    savePeople(body: any) {
        return this.httpClient.post(this.environment + '/people/save', body);
    }

    editPeople(id, body: any) {
        return this.httpClient.put(this.environment + '/people/edit/' + id, body);
    }

    saveResearch(body: any) {
        return this.httpClient.post(this.environment + '/research/save', body);
    }

    editResearch(id, body: any) {
        return this.httpClient.put(this.environment + '/research/edit/' + id, body);
    }

    deleteNews(id: number) {
        return this.httpClient.delete(this.environment + '/news/delete/' + id);
    }

    deletePeople(id: number) {
        return this.httpClient.delete(this.environment + '/people/delete/' + id);
    }

    deleteResearch(id: number) {
        return this.httpClient.delete(this.environment + '/research/delete/' + id);
    }

    login(body: any) {
        return this.httpClient.post(this.environment + '/user/login', body);
    }

}