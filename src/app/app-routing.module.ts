import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {IconsComponent} from './utilities/icons.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {AppWizardComponent} from './pages/app.wizard.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { AgencesComponent } from './components/agences/agences.component';
import { CompteursComponent } from './components/compteurs/compteurs.component';
import { AbonnesComponent } from './components/abonnes/abonnes.component';
import { IndexagesComponent } from './components/indexages/indexages.component';
import { FacturesComponent } from './components/factures/factures.component';
import { PaiementsComponent } from './components/paiements/paiements.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { ApurementComponent } from './components/paiements/apurement/apurement.component';
import { SocietesComponent } from './components/societes/societes.component';
import { CommuneComponent } from './components/commune/commune/commune.component';
import { QuartierComponent } from './components/quartier/quartier/quartier.component';
import { RueComponent } from './components/rue/rue/rue.component';
import { TypeClientComponent } from './components/type-client/type-client.component';
import { PrintFactureComponent } from './components/print-facture/print-facture.component';
import { PrintListingComponent } from './components/print-listing/print-listing.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full',
            },
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'admin', component: DashboardDemoComponent},
                    {path: 'base/communes', component: CommuneComponent},
                    {path: 'base/quartiers', component: QuartierComponent},
                    {path: 'base/rues', component: RueComponent},
                    {path: 'base/compteurs', component: CompteursComponent},
                    {path: 'base/type', component: TypeClientComponent},
                    {path: 'base/agences', component: AgencesComponent},
                    {path: 'base/abonnes', component: AbonnesComponent},
                    {path: 'base/indexages', component: IndexagesComponent},
                    {path: 'base/facturation', component: FacturesComponent},
                    {path: 'base/facture', component: PrintFactureComponent},
                    {path: 'base/listing', component: PrintListingComponent},
                    {path: 'base/paiement', component: PaiementsComponent},
                    {path: 'base/apurement', component: ApurementComponent},
                    {path: 'configurations/utilisateurs', component: UtilisateursComponent},
                    {path: 'configurations/societe', component: SocietesComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: 'wizard', component: AppWizardComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
