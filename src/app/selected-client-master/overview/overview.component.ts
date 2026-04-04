import { Component, OnInit } from '@angular/core';
import { SelectedClientDataService } from '../selected-client-data.service';
import { ReturnCredentials } from '../../model/ReturnCredentials';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css'],
    standalone: false
})
export class OverviewComponent implements OnInit {
    returnCreds: ReturnCredentials[] = [];
    statusSummary = {
        incomeTax: { count: 0, status: 'No Data' },
        tds: { count: 0, status: 'No Data' },
        gst: { count: 0, status: 'No Data' },
        roc: { count: 0, status: 'No Data' }
    };

    constructor(private dataService: SelectedClientDataService) { }

    ngOnInit(): void {
        this.dataService.currentReturnCredsArray.subscribe(creds => {
            this.returnCreds = creds;
            this.calculateSummary();
        });
    }

    calculateSummary() {
        if (!this.returnCreds) return;

        // Reset
        this.statusSummary = {
            incomeTax: { count: 0, status: 'Pending' },
            tds: { count: 0, status: 'Pending' },
            gst: { count: 0, status: 'Pending' },
            roc: { count: 0, status: 'Pending' }
        };

        this.returnCreds.forEach(cred => {
            const type = cred.getReturnType;
            if (this.statusSummary[type]) {
                this.statusSummary[type].count++;
                this.statusSummary[type].status = 'Active';
            }
        });
    }
}
