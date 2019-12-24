import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'primeng/api';
import { AppMainComponent } from './app.main.component';

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

    constructor(public app: AppMainComponent) { }

    ngOnInit() {
        this.modelGrouped = [
            { label: 'Home Page', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
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
                    { label: 'Invoice', icon: 'pi pi-fw pi-compass', routerLink: ['/invoice'] },
                    { label: 'Help Page', icon: 'pi pi-fw pi-question-circle', routerLink: ['/help'] },
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

    ngAfterViewInit() {
        setTimeout(() => { this.app.layoutMenuScrollerViewChild.moveBar(); }, 100);
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
                    [@children]="(app.isSlim()||app.isHorizontal())&&!app.isMobile()&&!app.isTablet()&&root ? isActive(i) ?
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

    constructor(public app: AppMainComponent, public appMenu: AppMenuComponent) { }

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
            item.command({ originalEvent: event, item });
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
