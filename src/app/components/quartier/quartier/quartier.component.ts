import { Commune } from './../../../models/models';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { CommuneService } from 'src/app/services/commune/commune.service';
import { QuartierService } from 'src/app/services/quartier/quartier.service';

@Component({
    selector: 'app-quartier',
    templateUrl: './quartier.component.html',
    styleUrls: ['./quartier.component.scss'],
    providers: [MessageService]
    
})
export class QuartierComponent {
    
    quartierDialog: boolean = false;
    
    deleteQuartierDialog: boolean = false;
    
    submitted: boolean = false;
    
    cols: any[] = [];
    
    rowsPerPageOptions = [5, 10, 20];
    
    communes: any = [];
    
    quartiers: any = [];
    
    quartier: any ={};
    
    quartierForm: FormGroup;
    
    constructor(
        private messageService: MessageService,
        private breadcrumbService: BreadcrumbService,
        private service: CommuneService,
        private quartierService:QuartierService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Quartier'}
            ]);
        }
        
        ngOnInit() {
            this.quartierForm = new FormGroup({
                libelle: new FormControl('', Validators.required),
                communeId: new FormControl('', Validators.required),
            })
            
            this.cols = [
                { field: 'id', header: 'id' },
                { field: 'libelle', header: 'libelle' },
            ];
            this.getAll();
            this.getAllQuartier();
        }
        
        getAll() {
            this.service.getAll()
            .subscribe({
                next: (response) => {
                    this.communes = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        getAllQuartier() {
            this.quartierService.getAll()
            .subscribe({
                next: (response) => {
                    this.quartiers = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        save() {
            if (this.quartierForm.valid)
            {
                if(this.quartier.id){
                    this.update();
                    this.reset();
                }else{
                    this.add();
                    this.reset();
                }
            } else {
                this.validateAllFields(this.quartierForm);
            }
            
        }
        
        add() {
            const request = {
                libelle: this.libelleValue.value,
                communeId: this.communeIdValue.value.id,
            }
            this.submitted = true;
            this.quartierService.add(request)
            .subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.getAllQuartier();
                    this.quartierDialog = false;
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.getAllQuartier();
                    this.quartierDialog = false;
                    
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 });
                    this.getAllQuartier();
                    this.quartierDialog = false;
                    
                    
                }
            });
        }
        
        update() {
            const request = {
                libelle: this.libelleValue.value,
                communeId: this.communeIdValue.value.id,
            }
            this.submitted = true;
            this.quartierService.update(this.quartier.id, request)
            .subscribe({
                next: (response) => {
                    this.quartierDialog = false;
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                    this.getAllQuartier();
                    this.quartierDialog = false;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 });
                    this.getAllQuartier();
                    this.quartierDialog = false;
                }
            })
        }
        
        find(id:any):any {
            this.quartierService.get(id)
            .subscribe({
                next: (response) => {
                    this.quartier = response;
                    this.quartierDialog = true;
                    this.quartierForm.get("libelle")?.patchValue(this.quartier.libelle);
                    this.quartierForm.get("communeId")?.patchValue(this.quartier.communeId.id);
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
        
        delete(id: any) {
            this.quartierService.delete(id)
            .subscribe({
                next: (response) => {
                    this.reset();
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });
                    this.getAllQuartier();
                    this.deleteQuartierDialog = false;
                    this.reset();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAllQuartier();
                    this.deleteQuartierDialog = false;
                    this.reset();
                }
            });
        }
        
        openNew() {
            this.submitted = false;
            this.quartierDialog = true;
        }
        
        deleteSelected(id: any) {
            this.quartierService.get(id)
            .subscribe({
                next: (response) => {
                    this.quartier = response;
                    this.deleteQuartierDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
        
        hideDialog() {
            this.quartierDialog = false;
            this.submitted = false;
            this.reset();
        }
        
        hideSelect() {
            this.deleteQuartierDialog = false;
            this.reset();
        }
        
        reset() {
            this.quartierForm.get("libelle")?.patchValue('');
            this.quartierForm.get("communeId")?.patchValue('');
            this.quartier = {};
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
        
        get libelleValue() {
            return this.quartierForm.get('libelle')
        }
        
        get communeIdValue() {
            return this.quartierForm.get('communeId')
        }
    }
    