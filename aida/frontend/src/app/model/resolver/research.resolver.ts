import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';

@Injectable({ providedIn: 'root' })
export class ResearchResolver implements Resolve<any>{

    constructor(private service: GeneralService) { }

    resolve(
        route: ActivatedRouteSnapshot,
    ) {
        return this.service.getResearch(route.paramMap.get('id') || "");
    }
}