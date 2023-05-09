import { Component } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';

@Component({
    selector: 'app-paiements',
    templateUrl: './paiements.component.html',
    styleUrls: ['./paiements.component.scss'],  
    providers: [MessageService, ConfirmationService]
})
export class PaiementsComponent {
    
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
    
    constructor(private productService: ProductService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
            this.breadcrumbService.setItems([
                {label: 'Opérations'},
                {label: 'Paiement'}
            ]);
        }
        
        ngOnInit() {
            this.productService.getProducts().then(data => this.products = data);
            
            this.cols = [
                { field: 'product', header: 'Product' },
                { field: 'price', header: 'Price' },
                { field: 'category', header: 'Category' },
                { field: 'rating', header: 'Reviews' },
                { field: 'inventoryStatus', header: 'Status' }
            ];
            
            this.statuses = [
                { label: 'INSTOCK', value: 'instock' },
                { label: 'LOWSTOCK', value: 'lowstock' },
                { label: 'OUTOFSTOCK', value: 'outofstock' }
            ];
            
            this.cities = [
                {label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}},
                {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
                {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
                {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
                {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
            ];
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
    