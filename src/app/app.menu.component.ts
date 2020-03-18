import { Component, Input, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of (app.grouped ? modelGrouped : modelUngrouped); let i = index;"
                [item]="item" [index]="i" [visible]="true" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    modelGrouped: any[];

    modelUngrouped: any[];

    constructor(public app: AppMainComponent) { }

    ngOnInit() {
        this.modelGrouped = [
            { label: 'Home Page', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'Components', icon: 'pi pi-fw pi-star', routerLink: ['/components'],
                items: [
                    { label: 'Sample Page', icon: 'pi pi-fw pi-th-large', routerLink: ['/components/sample']  },
                    { label: 'Forms', icon: 'pi pi-fw pi-file', routerLink: ['/components/forms'] },
                    { label: 'Data', icon: 'pi pi-fw pi-table', routerLink: ['/components/data'] },
                    { label: 'Panels', icon: 'pi pi-fw pi-list', routerLink: ['/components/panels'] },
                    { label: 'Overlays', icon: 'pi pi-fw pi-clone', routerLink: ['/components/overlays'] },
                    { label: 'Menus', icon: 'pi pi-fw pi-plus', routerLink: ['/components/menus'] },
                    { label: 'Messages', icon: 'pi pi-fw pi-spinner', routerLink: ['/components/messages'] },
                    { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/components/charts'] },
                    { label: 'File', icon: 'pi pi-fw pi-upload', routerLink: ['/components/file'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-briefcase', routerLink: ['/components/misc'] }
                ]
            },
            {
                label: 'Pages', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
                items: [
                    { label: 'Empty Page', icon: 'pi pi-fw pi-clone', routerLink: ['/pages/empty'] },
                    { label: 'Invoice', icon: 'pi pi-fw pi-compass', routerLink: ['/pages/invoice'] },
                    { label: 'Help Page', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
                    { label: 'Wizard', icon: 'pi pi-fw pi-star', routerLink: ['/wizard'] },
                    { label: 'Landing Page', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                    { label: 'Login Page', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'], target: '_blank' },
                    { label: 'Error Page', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/error'], target: '_blank' },
                    { label: '404 Page', icon: 'pi pi-fw pi-times', routerLink: ['/404'], target: '_blank' },
                    {
                        label: 'Access Denied', icon: 'pi pi-fw pi-ban',
                        routerLink: ['/accessdenied'], target: '_blank'
                    }
                ]
            },
            {
                label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-sign-in' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-sign-in' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-sign-in' }
                                ]
                            },
                        ]
                    }
                ]
            },
            { label: 'Get Started', icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
                    },
                    {
                        label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
                    }
                ]
            }
        ];

        this.modelUngrouped = [
            {
                label: 'Main Menu',
                icon: 'pi pi-fw pi-home',
                items: this.modelGrouped
            }
        ];
    }
}
