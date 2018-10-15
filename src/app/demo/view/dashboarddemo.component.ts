import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/carservice';
import { EventService } from '../service/eventservice';
import { Car } from '../domain/car';
import { MenuItem } from 'primeng/primeng';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    cars: Car[];

    cols: any[];

    chartData: any;

    events: any[];

    selectedCar: Car;

    items: MenuItem[];

    constructor(private carService: CarService, private eventService: EventService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: [''] }
        ]);
    }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.eventService.getEvents().then(events => { this.events = events; });

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#FFC107'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#03A9F4'
                },
                {
                    label: 'Third Dataset',
                    data: [37, 67, 17, 47, 20, 55, 60],
                    fill: false,
                    borderColor: '#62bb65'
                }
            ]
        };

        this.items = [
            { label: 'Save', icon: 'fa fa-fw fa-check' },
            { label: 'Update', icon: 'fa fa-fw fa-refresh' },
            { label: 'Delete', icon: 'fa fa-fw fa-trash' }
        ];
    }
}
