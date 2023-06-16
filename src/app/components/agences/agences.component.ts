import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Agence } from 'src/app/models/models';
import { AgencesService } from 'src/app/services/agences/agences.service';

@Component({
    selector: 'app-agences',
    templateUrl: './agences.component.html',
    styleUrls: ['./agences.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class AgencesComponent {
    
    productDialog: boolean = false;
    
    deleteProductDialog: boolean = false;
    
    deleteProductsDialog: boolean = false;
    
    products: Product[] = [];
    
    product: Product = {};
    
    selectedProducts: Product[] = [];
    
    submitted: boolean = false;
    
    cols: any[] = [];
    
    statuses: any[] = [];
    
    rowsPerPageOptions = [5, 10, 20];
    
    agences: any;
    
    agence: Agence = {
        id: undefined,
        code: undefined,
        libelle: undefined,
        site: undefined,
        secteur: undefined,
        commune: undefined
    };
    
    constructor(private productService: ProductService, private messageService: MessageService,
        private agenceService: AgencesService, private breadcrumbService: BreadcrumbService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Agences'}
            ]);
        }
        
        ngOnInit() {
            
            this.getAll();
        }
        
        getAll() {
            this.agenceService.getAll()
            .subscribe({
                next: (response) => {
                    this.agences = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        
        add() {
            this.submitted = true;
            this.agenceService.add(this.agence)
            .subscribe({
                next: (response) => {
                    
                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 }); this.getAll(); },
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 }); this.getAll(); }
            });
        }
        
        update() {
            this.submitted = true;
            console.log(this.agence.id, this.agence);
            this.agenceService.update(this.agence.id, this.agence)
            .subscribe({
                next: (response) => {
                    
                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 }); this.getAll(); },
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 }); this.getAll(); }
            })
        }
        
        edit(agence: Agence) {
            this.agence = agence;
            this.productDialog = true;
        }
        
        
        Enregistrer() {
            this.submitted = true;
            if (this.agence.id) {
                this.update();
            } else {
                this.add();
            }
        }
        
        delete(id: any) {
            this.agenceService.delete(id)
            .subscribe({
                next: (response) => {
                    
                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.getAll();  this.deleteProductDialog = false;},
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 }); this.getAll();  this.deleteProductDialog = false;}
            });
        }
        
        openNew() {
            this.product = {};
            this.submitted = false;
            this.productDialog = true;
        }
        
        deleteClicked(agence: Agence) {
            this.agence = agence;
            this.deleteProductDialog = true;
        }
        
        deleteSelectedProducts() {
            this.deleteProductsDialog = true;
        }
        
        confirmDeleteSelected() {
            this.deleteProductsDialog = false;
            this.agences = this.agences.filter(val => !this.selectedProducts.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            this.selectedProducts = [];
        }
        
        confirmDelete() {
            this.deleteProductDialog = false;
            this.agences = this.agences.filter(val => val.id !== this.agences.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.product = {};
        }
        
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        }
        
        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }
    }
    