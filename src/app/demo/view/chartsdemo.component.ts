import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
    templateUrl: './chartsdemo.component.html'
})
export class ChartsDemoComponent implements OnInit {

    lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Charts', routerLink: ['/charts'] }
        ]);
    }

    ngOnInit() {
        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#61b5a1'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#A882C9'
                }
            ]
        };

        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#61b5a1',
                    borderColor: '#61b5a1',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#E6C665',
                    borderColor: '#E6C665',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.pieData = {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [
                {
                    data: [540, 325, 702, 421],
                    backgroundColor: [
                        '#61b5a1',
                        '#A882C9',
                        '#7BCDD8',
                        '#E6C665'
                    ]
                }]
        };

        this.polarData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3
                ],
                backgroundColor: [
                    '#61b5a1',
                    '#A882C9',
                    '#7BCDD8',
                    '#E6C665'
                ],
                label: 'My dataset'
            }],
            labels: [
                'Green',
                'Purple',
                'Blue',
                'Yellow',
            ]
        };

        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(223,240,236,0.2)',
                    borderColor: '#61b5a1',
                    pointBackgroundColor: '#61b5a1',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#61b5a1',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(228,217,238,0.2)',
                    borderColor: '#A882C9',
                    pointBackgroundColor: '#A882C9',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#A882C9',
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
    }
}
