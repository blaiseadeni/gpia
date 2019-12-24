import {Component, AfterViewInit, Renderer2, ViewChild} from '@angular/core';
import {ScrollPanel} from 'primeng/primeng';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    styleUrls: ['./app.component.css']
})
export class AppMainComponent implements AfterViewInit {

    layoutMode = 'static';

    darkMenu = true;

    profileMode = 'popup';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    configClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    grouped = true;

    configActive: boolean;

    inlineMenuActive: boolean;

    inlineMenuClick: boolean;

    themeColor = 'blue-accent';

    @ViewChild('layoutMenuScroller', { static: true }) layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public renderer: Renderer2) {}

    ngAfterViewInit() {
        setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick || (this.inlineMenuClick && this.isSlim())) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        if (this.inlineMenuActive && !this.inlineMenuClick) {
            this.inlineMenuActive = false;
        }

        this.inlineMenuClick = false;
        this.configClick = false;
        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === 'overlay' && (!this.isMobile() && !this.isTablet())) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive; } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive; }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (this.inlineMenuActive && !this.inlineMenuClick) {
            this.inlineMenuActive = false;
        }

        if (!this.isHorizontal()) {
            setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 450);
        }
    }

    onInlineMenuClick(event) {
        this.inlineMenuActive  = !this.inlineMenuActive;
        this.inlineMenuClick = true;
    }

    changeTheme(theme: string, scheme: string) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        themeLink.href = 'assets/theme/' + theme + '/theme-' + scheme + '.css';
        this.themeColor = theme + '-' + scheme;

        const topbarLogo: HTMLImageElement = document.getElementById('layout-topbar-logo') as HTMLImageElement;
        const menuLogo: HTMLImageElement = document.getElementById('layout-menu-logo') as HTMLImageElement;

        if (theme === 'yellow' || theme === 'lime') {
            topbarLogo.src = 'assets/layout/images/logo-black.png';
            menuLogo.src = 'assets/layout/images/logo-black.png';
        } else {
            topbarLogo.src = 'assets/layout/images/logo-white.png';
            menuLogo.src = 'assets/layout/images/logo-white.png';
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null; } else {
            this.activeTopbarItem = item; }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.layoutMode === 'slim';
    }

    isStatic() {
        return this.layoutMode === 'static';
    }

}
