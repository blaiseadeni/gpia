import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Compteur } from 'src/app/models/models';
import { AgencesService } from 'src/app/services/agences/agences.service';
import { CompteursService } from 'src/app/services/compteurs/compteurs.service';
import { RueService } from 'src/app/services/rue/rue.service';

@Component({
    selector: 'app-compteurs',
    templateUrl: './compteurs.component.html',
    styleUrls: ['./compteurs.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class CompteursComponent {
    
    compteurDialog: boolean = false;
    
    deleteCompteurDialog: boolean = false;
    
    submitted: boolean = false;
    
    cols: any[] = [];
    
    rowsPerPageOptions = [5, 10, 20];
    
    compteurs: any = [];
    
    compteur: any ={};
    
    compteurForm: FormGroup;
    
    constructor(
        private messageService: MessageService,
        private breadcrumbService: BreadcrumbService,
        private service: CompteursService,
        ) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Compteur'}
            ]);
        }
        
        ngOnInit() {
            this.compteurForm = new FormGroup({
                numero: new FormControl('', Validators.required),
                marque: new FormControl('', Validators.required),
            })
            
            this.cols = [
                { field: 'numero', header: 'numero' },
                { field: 'marque', header: 'marque' },
            ];
            this.getAll();
        }
        
        getAll() {
            this.service.getAll()
            .subscribe({
                next: (response) => {
                    this.compteurs = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        
        save() {
            if (this.compteurForm.valid)
            {
                if(this.compteur.id){
                    this.update();
                    this.reset();
                    this.compteurDialog = false;
                }else{
                    this.add();
                    this.reset();
                    this.compteurDialog = false;
                }
            } else {
                this.validateAllFields(this.compteurForm);
            }
            
        }
        
        add() {
            const request = {
                numero: this.numeroValue.value,
                marque: this.marqueValue.value,
            }
            this.submitted = true;
            this.service.add(request)
            .subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.getAll();
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.getAll();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 });
                    this.getAll();
                }
            });
        }
        
        update() {
            const request = {
                numero: this.numeroValue.value,
                marque: this.marqueValue.value,
            }
            this.submitted = true;
            this.service.update(this.compteur.id, request)
            .subscribe({
                next: (response) => {
                    this.getAll();
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                    this.getAll();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 });
                    this.getAll();
                }
            })
        }
        
        find(id:any):any {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.compteur = response;
                    this.compteurDialog = true;
                    this.compteurForm.get("numero")?.patchValue(this.compteur.numero);
                    this.compteurForm.get("marque")?.patchValue(this.compteur.marque);
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
        
        delete(id: any) {
            this.service.delete(id)
            .subscribe({
                next: (response) => {
                    this.reset();
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteCompteurDialog = false;
                    this.reset();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteCompteurDialog = false;
                    this.reset();
                }
            });
        }
        
        openNew() {
            this.submitted = false;
            this.compteurDialog = true;
        }
        
        deleteSelected(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.compteur = response;
                    this.deleteCompteurDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
        
        hideDialog() {
            this.compteurDialog = false;
            this.submitted = false;
            this.reset();
        }
        
        hideSelect() {
            this.deleteCompteurDialog = false;
            this.reset();
        }
        
        reset() {
            this.compteurForm.get("numero")?.patchValue('');
            this.compteurForm.get("marque")?.patchValue('');
            this.compteur = {};
        }
        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }
        
        private validateAllFields(formGroup: FormGroup) {
            Object.keys(formGroup.controls).forEach((field) => {
                const control = formGroup.get(field)
                
                if (control instanceof FormControl) {
                    control.markAsDirty({ onlySelf: true })
                } else if (control instanceof FormGroup) {
                    this.validateAllFields(control)
                }
            })
        }
        
        get numeroValue() {
            return this.compteurForm.get('numero')
        }
        
        get marqueValue() {
            return this.compteurForm.get('marque')
        }
    }
    