import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem, ScrollPanel } from 'primeng/primeng';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="app.grouped ? modelGrouped : modelUngrouped" root="true" class="layout-menu"
            visible="true" [reset]="reset" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit, AfterViewInit {

    @Input() reset: boolean;

    modelGrouped: any[];

    modelUngrouped: any[];

    constructor(public app: AppComponent) { }

    ngOnInit() {
        this.modelGrouped = [
            { label: 'Home Page', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            { label: 'Customization', icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Menu Layouts', icon: 'pi pi-fw pi-th-large', badge: 2,
                        items: [
                            { label: 'Static', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'static' },
                            { label: 'Overlay', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'overlay' },
                            { label: 'Slim', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'slim' },
                            { label: 'Horizontal', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'horizontal' },
                            { label: 'Grouped Menu', icon: 'pi pi-fw pi-bars', command: event => this.app.grouped = true },
                            { label: 'Ungrouped Menu', icon: 'pi pi-fw pi-bars', command: event => this.app.grouped = false }
                        ]
                    },
                    {
                        label: 'Menu Colors', icon: 'pi pi-fw pi-list', badge: 2,
                        items: [
                            { label: 'Light', icon: 'pi pi-fw pi-circle-off', command: event => this.app.darkMenu = false },
                            { label: 'Dark', icon: 'pi pi-fw pi-circle-on', command: event => this.app.darkMenu = true }
                        ]
                    },
                    {label: 'User Profile', icon: 'pi pi-fw pi-user', badge: 2,
                        items: [
                            {label: 'Popup Profile', icon: 'pi pi-fw pi-user',  command: () => this.app.profileMode = 'popup'},
                            {label: 'Inline Profile', icon: 'pi pi-fw pi-user',  command: () => this.app.profileMode = 'inline'}
                        ]
                    },
                    {
                        label: 'Themes', icon: 'pi pi-fw pi-pencil', badge: 17,
                        items: [
                            {
                                label: 'Blue', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('blue', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('blue', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('blue', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Blue Grey', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('bluegrey', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('bluegrey', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('bluegrey', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Light Blue', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lightblue', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lightblue', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lightblue', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Indigo', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('indigo', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('indigo', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('indigo', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Pink', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('pink', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('pink', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('pink', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Green', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('green', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('green', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('green', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Light Green', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lightgreen', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lightgreen', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lightgreen', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Teal', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('teal', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('teal', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('teal', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Cyan', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('cyan', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('cyan', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('cyan', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Lime', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lime', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lime', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('lime', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Amber', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('amber', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('amber', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('amber', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Orange', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('orange', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('orange', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('orange', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Deep Orange', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('deeporange', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('deeporange', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('deeporange', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Yellow', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('yellow', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('yellow', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('yellow', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Purple', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('purple', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('purple', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('purple', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Deep Purple', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('deeppurple', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('deeppurple', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('deeppurple', 'dark')
                                    }
                                ]
                            },
                            {
                                label: 'Brown', icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('brown', 'accent')
                                    },
                                    {
                                        label: 'Light', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('brown', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                        command: (event) => this.changeTheme('brown', 'dark')
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Components', icon: 'pi pi-fw pi-star',
                items: [
                    { label: 'Sample Page', icon: 'pi pi-fw pi-th-large', routerLink: ['/sample']  },
                    { label: 'Forms', icon: 'pi pi-fw pi-file', routerLink: ['/forms'] },
                    { label: 'Data', icon: 'pi pi-fw pi-table', routerLink: ['/data'] },
                    { label: 'Panels', icon: 'pi pi-fw pi-list', routerLink: ['/panels'] },
                    { label: 'Overlays', icon: 'pi pi-fw pi-clone', routerLink: ['/overlays'] },
                    { label: 'Menus', icon: 'pi pi-fw pi-plus', routerLink: ['/menus'] },
                    { label: 'Messages', icon: 'pi pi-fw pi-spinner', routerLink: ['/messages'] },
                    { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/charts'] },
                    { label: 'File', icon: 'pi pi-fw pi-upload', routerLink: ['/file'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-briefcase', routerLink: ['/misc'] }
                ]
            },
            {
                label: 'Pages', icon: 'pi pi-fw pi-copy',
                items: [
                    { label: 'Empty Page', icon: 'pi pi-fw pi-clone', routerLink: ['/empty'] },
                    { label: 'Landing Page', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                    { label: 'Login Page', icon: 'pi pi-fw pi-sign-in', url: 'assets/pages/login.html', target: '_blank' },
                    { label: 'Error Page', icon: 'pi pi-fw pi-exclamation-triangle', url: 'assets/pages/error.html', target: '_blank' },
                    { label: '404 Page', icon: 'pi pi-fw pi-times', url: 'assets/pages/404.html', target: '_blank' },
                    {
                        label: 'Access Denied', icon: 'pi pi-fw pi-ban',
                        url: 'assets/pages/access.html', target: '_blank'
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
            { label: 'Main Menu', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
                    { label: 'Customization', icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Menu Layouts', icon: 'pi pi-fw pi-th-large', badge: 2,
                                items: [
                                    { label: 'Static', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'static' },
                                    { label: 'Overlay', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'overlay' },
                                    { label: 'Slim', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'slim' },
                                    { label: 'Horizontal', icon: 'pi pi-fw pi-bars', command: event => this.app.layoutMode = 'horizontal' },
                                    { label: 'Grouped Menu', icon: 'pi pi-fw pi-bars', command: event => this.app.grouped = true },
                                    { label: 'Ungrouped Menu', icon: 'pi pi-fw pi-bars', command: event => this.app.grouped = false }
                                ]
                            },
                            {
                                label: 'Menu Colors', icon: 'pi pi-fw pi-list', badge: 2,
                                items: [
                                    { label: 'Light', icon: 'pi pi-fw pi-circle-off', command: event => this.app.darkMenu = false },
                                    { label: 'Dark', icon: 'pi pi-fw pi-circle-on', command: event => this.app.darkMenu = true }
                                ]
                            },
                            {label: 'User Profile', icon: 'pi pi-fw pi-user', badge: 2,
                                items: [
                                    {label: 'Popup Profile', icon: 'pi pi-fw pi-user',  command: () => this.app.profileMode = 'popup'},
                                    {label: 'Inline Profile', icon: 'pi pi-fw pi-user',  command: () => this.app.profileMode = 'inline'}
                                ]
                            },
                            {
                                label: 'Themes', icon: 'pi pi-fw pi-pencil', badge: 17,
                                items: [
                                    {
                                        label: 'Blue', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('blue', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('blue', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('blue', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Blue Grey', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('bluegrey', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('bluegrey', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('bluegrey', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Light Blue', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lightblue', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lightblue', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lightblue', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Indigo', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('indigo', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('indigo', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('indigo', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Pink', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('pink', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('pink', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('pink', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Green', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('green', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('green', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('green', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Light Green', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lightgreen', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lightgreen', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lightgreen', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Teal', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('teal', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('teal', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('teal', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Cyan', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('cyan', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('cyan', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('cyan', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Lime', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lime', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lime', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('lime', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Amber', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('amber', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('amber', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('amber', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Orange', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('orange', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('orange', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('orange', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Deep Orange', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('deeporange', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('deeporange', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('deeporange', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Yellow', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('yellow', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('yellow', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('yellow', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Purple', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('purple', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('purple', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('purple', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Deep Purple', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('deeppurple', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('deeppurple', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('deeppurple', 'dark')
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Brown', icon: 'pi pi-fw pi-pencil',
                                        items: [
                                            {
                                                label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('brown', 'accent')
                                            },
                                            {
                                                label: 'Light', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('brown', 'light')
                                            },
                                            {
                                                label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                                command: (event) => this.changeTheme('brown', 'dark')
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Components', icon: 'pi pi-fw pi-star',
                        items: [
                            { label: 'Sample Page', icon: 'pi pi-fw pi-th-large', routerLink: ['/sample']  },
                            { label: 'Forms', icon: 'pi pi-fw pi-file', routerLink: ['/forms'] },
                            { label: 'Data', icon: 'pi pi-fw pi-table', routerLink: ['/data'] },
                            { label: 'Panels', icon: 'pi pi-fw pi-list', routerLink: ['/panels'] },
                            { label: 'Overlays', icon: 'pi pi-fw pi-clone', routerLink: ['/overlays'] },
                            { label: 'Menus', icon: 'pi pi-fw pi-plus', routerLink: ['/menus'] },
                            { label: 'Messages', icon: 'pi pi-fw pi-spinner', routerLink: ['/messages'] },
                            { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/charts'] },
                            { label: 'File', icon: 'pi pi-fw pi-upload', routerLink: ['/file'] },
                            { label: 'Misc', icon: 'pi pi-fw pi-briefcase', routerLink: ['/misc'] }
                        ]
                    },
                    {
                        label: 'Pages', icon: 'pi pi-fw pi-copy',
                        items: [
                            { label: 'Empty Page', icon: 'pi pi-fw pi-clone', routerLink: ['/empty'] },
                            { label: 'Landing Page', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                            { label: 'Login Page', icon: 'pi pi-fw pi-sign-in', url: 'assets/pages/login.html', target: '_blank' },
                            { label: 'Error Page', icon: 'pi pi-fw pi-exclamation-triangle',
                                url: 'assets/pages/error.html', target: '_blank' },
                            { label: '404 Page', icon: 'pi pi-fw pi-times', url: 'assets/pages/404.html', target: '_blank' },
                            {
                                label: 'Access Denied', icon: 'pi pi-fw pi-ban',
                                url: 'assets/pages/access.html', target: '_blank'
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
                ]
            }
        ];
    }

    ngAfterViewInit() {
        setTimeout(() => { this.app.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    changeTheme(theme: string, scheme: string) {
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';

        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        themeLink.href = 'assets/theme/' + theme + '/theme-' + scheme + '.css';

        const topbarLogo: HTMLImageElement = <HTMLImageElement>document.getElementById('layout-topbar-logo');

        const menuLogo: HTMLImageElement = <HTMLImageElement>document.getElementById('layout-menu-logo');

        if (theme === 'yellow' || theme === 'lime') {
            topbarLogo.src = 'assets/layout/images/logo-black.png';
            menuLogo.src = 'assets/layout/images/logo-black.png';
        }

        if (scheme === 'dark') {
            this.app.darkMenu = true;
        } else if ( scheme === 'light') {
            this.app.darkMenu = false;
        }
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'layout-root-menuitem':root ,'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass"
                *ngIf="child.visible === false ? false : true">
                <div *ngIf="root">
                    <span class="layout-menuitem-text">{{child.label}}</span>
                </div>
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   *ngIf="!child.routerLink" [class]="child.styleClass"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="layout-menuitem-icon" [ngClass]="child.icon"></i>
                    <span class="layout-menuitem-text">{{child.label}}</span>
                    <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" *ngIf="child.routerLink"
                   [routerLink]="child.routerLink" routerLinkActive="active-route" [fragment]="child.fragment"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="layout-menuitem-icon" [ngClass]="child.icon"></i>
                    <span class="layout-menuitem-text">{{child.label}}</span>
                    <i class="pi pi-fw pi-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)"
                    [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?
                    'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' :
                    app.grouped===true && root? 'visibleAnimated': 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _parentActive: boolean;

    _reset: boolean;

    activeIndex: number;

    constructor(public app: AppComponent, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
