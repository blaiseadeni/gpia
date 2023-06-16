import { Component } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Abonne } from 'src/app/models/models';
import { AbonnesService } from 'src/app/services/abonnes/abonnes.service';
import { CompteursService } from 'src/app/services/compteurs/compteurs.service';

@Component({
    selector: 'app-abonnes',
    templateUrl: './abonnes.component.html',
    styleUrls: ['./abonnes.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class AbonnesComponent {

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

    abonnes: any;

    abonne: Abonne={
        id: undefined,
        nom: undefined,
        postnom: undefined,
        prenom: undefined,
        contact: undefined,
        mail: undefined,
        avenue: undefined,
        quartier: undefined,
        sexe: undefined,
        adresse: undefined,
        compteurId: undefined
    }

    constructor(private productService: ProductService, private messageService: MessageService,
        private abonneService: AbonnesService, private compteurService: CompteursService,private breadcrumbService: BreadcrumbService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Abonnés'}
            ]);
        }

        ngOnInit() {
            this.productService.getProducts().then(data => this.products = data);

            this.cols = [
                { field: 'id', header: 'Id' },
                { field: 'nom', header: 'Nom' },
                { field: 'postnom', header: 'Postnom' },
                { field: 'prenom', header: 'Prenom' },
                { field: 'contact', header: 'Contact' },
                { field: 'mail', header: 'Mail' },
                { field: 'avenue', header: 'Avenue' },
                { field: 'quartier', header: 'Quartier' },
                { field: 'sexe', header: 'Sexe' },
                { field: 'adresse', header: 'Adresse' },
                { field: 'compteurId', header: 'CompteurId' },
            ];
            this.getAll();
            this.getCompteurs();
        }

        getAll() {
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

        getCompteurs() {
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

        add() {
            this.submitted = true;
            this.abonne.compteurId = this.abonne.compteurId.id;
            this.abonneService.add(this.abonne)
            .subscribe({
                next: (response) => {

                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 }); this.getAll(); },
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 }); this.getAll(); }
            });
        }

        update() {
            this.submitted = true;
            this.abonne.compteurId = this.abonne.compteurId.id;
            this.abonneService.update(this.abonne.id, this.abonne)
            .subscribe({
                next: (response) => {

                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 }); this.getAll(); },
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 }); this.getAll(); }
            })
        }

        edit(abonne: Abonne) {
            this.abonne = abonne;
            this.productDialog = true;
        }

        create() {
            this.submitted = true;
            if (this.abonne.id) {
                this.update();
            } else {
                this.add();
            }
        }

        delete(id: any) {
            this.abonneService.delete(id)
            .subscribe({
                next: (response) => {

                },
                complete: () => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 }); this.getAll();  this.deleteProductDialog = false;},
                error: (e) => { this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 }); this.getAll();  this.deleteProductDialog = false;}
            });
        }

        deleteSelected(abonne: Abonne) {
            this.abonne = abonne;
            this.deleteProductDialog = true;
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
