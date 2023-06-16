import { Component } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Indexage } from 'src/app/models/models';
import { AbonnesService } from 'src/app/services/abonnes/abonnes.service';
import { CompteursService } from 'src/app/services/compteurs/compteurs.service';
import { IndexagesService } from 'src/app/services/indexages/indexages.service';

@Component({
    selector: 'app-indexages',
    templateUrl: './indexages.component.html',
    styleUrls: ['./indexages.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class IndexagesComponent {
    
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
    
    compteur: any;
    
    abonnes: any;
    
    indexages: any;
    
    indexage: Indexage = {
        date: undefined,
        numero: undefined,
        quantite: undefined,
        compteurId: undefined,
    };
    
    constructor(private productService: ProductService, private messageService: MessageService,
        private indexageService: IndexagesService, private compteurService: CompteursService,private abonneService: AbonnesService,private breadcrumbService: BreadcrumbService) {
            this.breadcrumbService.setItems([
                {label: 'Opétions'},
                {label: 'Indexage'}
            ]);
        }
        
        ngOnInit() {
            this.productService.getProducts().then(data => this.products = data);
            
            this.cols = [
                { field: 'date', header: 'Date' },
                { field: 'numero', header: 'Numero' },
                { field: 'quantite', header: 'Quantite' },
                { field: 'compteur', header: 'Compteur' },
            ];
            this.getAll();
            this.getAbonnes();
        }
        
        getAll() {
            this.indexageService.getAll()
            .subscribe({
                next: (response) => {
                    this.indexages = response;               },
                    error: (errors) => {
                        console.log(errors);
                    }
                });
            }
            
            getAbonnes() {
                this.abonneService.getAll()
                .subscribe({
                    next: (response) => {
                        this.abonnes = response;
                    },
                    error: (errors) => {
                        console.log(errors);
                    }
                });
            }
                        
            getCompteur(event: any) {
                this.compteurService.get(event.value.compteurId)
                .subscribe({
                    next: (response) => {
                        this.compteur = response;
                    },
                    error: (errors) => {
                        console.log(errors);
                    }
                });
            }
            
            
            openNew() {
                this.product = {};
                this.submitted = false;
                this.productDialog = true;
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
        