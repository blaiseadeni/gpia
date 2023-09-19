import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { QuartierService } from 'src/app/services/quartier/quartier.service';
import { RueService } from 'src/app/services/rue/rue.service';

@Component({
    selector: 'app-rue',
    templateUrl: './rue.component.html',
    styleUrls: ['./rue.component.scss'],
    providers: [MessageService]
})
export class RueComponent {
    
    rueDialog: boolean = false;
    
    deleteRueDialog: boolean = false;
    
    submitted: boolean = false;
    
    cols: any[] = [];
    
    rowsPerPageOptions = [5, 10, 20];
    
    rues: any = [];
    
    quartiers: any = [];
    
    rue: any ={};
    
    rueForm: FormGroup;
    
    constructor(
        private messageService: MessageService,
        private breadcrumbService: BreadcrumbService,
        private service: RueService,
        private quartierService:QuartierService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Rue'}
            ]);
        }
        
        ngOnInit() {
            this.rueForm = new FormGroup({
                libelle: new FormControl('', Validators.required),
                quartierId: new FormControl('', Validators.required),
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
                    this.rues = response;
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
            if (this.rueForm.valid)
            {
                if(this.rue.id){
                    this.update();
                    this.reset();
                    this.rueDialog = false;
                }else{
                    this.add();
                    this.reset();
                    this.rueDialog = false;
                }
            } else {
                this.validateAllFields(this.rueForm);
            }
            
        }
        
        add() {
            const request = {
                libelle: this.libelleValue.value,
                quartierId: this.quartierIdValue.value.id,
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
                libelle: this.libelleValue.value,
                quartierId: this.quartierIdValue.value.id,
            }
            this.submitted = true;
            this.service.update(this.rue.id, request)
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
                    this.rue = response;
                    this.rueDialog = true;
                    this.rueForm.get("libelle")?.patchValue(this.rue.libelle);
                    this.rueForm.get("quartierId")?.patchValue(this.rue.quartierId.id);
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
                    this.deleteRueDialog = false;
                    this.reset();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteRueDialog = false;
                    this.reset();
                }
            });
        }
        
        openNew() {
            this.submitted = false;
            this.rueDialog = true;
        }
        
        deleteSelected(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.rue = response;
                    this.deleteRueDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
        
        hideDialog() {
            this.rueDialog = false;
            this.submitted = false;
            this.reset();
        }
        
        hideSelect() {
            this.deleteRueDialog = false;
            this.reset();
        }
        
        reset() {
            this.rueForm.get("libelle")?.patchValue('');
            this.rueForm.get("quartierId")?.patchValue('');
            this.rue = {};
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
            return this.rueForm.get('libelle')
        }
        
        get quartierIdValue() {
            return this.rueForm.get('quartierId')
        }
    }
    