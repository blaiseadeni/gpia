import { Component } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Compteur } from 'src/app/models/models';
import { AgencesService } from 'src/app/services/agences/agences.service';
import { CompteursService } from 'src/app/services/compteurs/compteurs.service';

@Component({
    selector: 'app-compteurs',
    templateUrl: './compteurs.component.html',
    styleUrls: ['./compteurs.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class CompteursComponent {
    
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
    
    cities: SelectItem[];
    
    compteurs: any;
    
    agences: any = {};
    
    compteur: Compteur={ id: undefined,numero: undefined,marque: undefined,montant: undefined,agenceId: undefined};
    
    constructor(private productService: ProductService, private messageService: MessageService,
        private confirmationService: ConfirmationService,private compteurService: CompteursService, private breadcrumbService: BreadcrumbService, private agenceService: AgencesService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Compteurs'}
            ]);
        }
        
        ngOnInit() {
            this.cols = [
                { field: 'numero', header: 'numero' },
                { field: 'marque', header: 'marque' },
                { field: 'montant', header: 'montant' },
                { field: 'agence', header: 'agence' }
            ];
            this.getAll();
            this.getAgences();
        }
        getAll() {
            this.compteurService.getAll()
            .subscribe({
                next: (response) => {
                    this.compteurs = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        getAgences() {
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
            this.compteur.agenceId = this.compteur.agenceId.id;
            this.compteurService.add(this.compteur)
            .subscribe({
                next: (response) => {
                    
                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 }); this.getAll(); },
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 }); this.getAll(); }
            });
        }
        
        update() {
            this.submitted = true;
            this.compteur.agenceId = this.compteur.agenceId.id;
            console.log(this.compteur.id, this.compteur);
            this.compteurService.update(this.compteur.id, this.compteur)
            .subscribe({
                next: (response) => {
                    
                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 }); this.getAll(); },
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 }); this.getAll(); }
            })
        }
        
        edit(compteur: Compteur) {
            this.compteur = compteur;
            this.productDialog = true;
        }
        
        create() {
            this.submitted = true;
            if (this.compteur.id) {
                this.update();
            } else {
                this.add();
            }
        }
        
        delete(id: any) {
            this.compteurService.delete(id)
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
        
        deleteSelected(compteur: Compteur) {
            this.compteur = compteur;
            this.deleteProductDialog = true;
        }
        
        deleteSelectedProducts() {
            this.deleteProductsDialog = true;
        }
        editProduct(product: Product) {
            this.product = { ...product };
            this.productDialog = true;
        }
        
        deleteProduct(product: Product) {
            this.deleteProductDialog = true;
            this.product = { ...product };
        }
        
        confirmDeleteSelected() {
            this.deleteProductsDialog = false;
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            this.selectedProducts = [];
        }
        
        confirmDelete() {
            this.deleteProductDialog = false;
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.product = {};
        }
        
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        }
        
        saveProduct() {
            this.submitted = true;
            if (this.product.name?.trim()) {
                if (this.product.id) {
                    // @ts-ignore
                    this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                    this.products[this.findIndexById(this.product.id)] = this.product;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                } else {
                    this.product.id = this.createId();
                    this.product.code = this.createId();
                    this.product.image = 'product-placeholder.svg';
                    // @ts-ignore
                    this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                    this.products.push(this.product);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
                
                this.products = [...this.products];
                this.productDialog = false;
                this.product = {};
            }
        }
        
        findIndexById(id: string): number {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }
            
            return index;
        }
        
        createId(): string {
            let id = '';
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
        
        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }
    }
    