import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { AgencesService } from 'src/app/services/agences/agences.service';
import { QuartierService } from 'src/app/services/quartier/quartier.service';

@Component({
    selector: 'app-agences',
    templateUrl: './agences.component.html',
    styleUrls: ['./agences.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class AgencesComponent {
    
    agenceDialog: boolean = false;

    deleteAgenceDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    agences: any = [];

    quartiers: any = [];

    agence: any ={};

    agenceForm: FormGroup;

    constructor(
        private messageService: MessageService,
        private breadcrumbService: BreadcrumbService,
        private service: AgencesService,
        private quartierService:QuartierService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Agence'}
            ]);
        }

        ngOnInit() {
            this.agenceForm = new FormGroup({
                libelle: new FormControl('', Validators.required),
                site: new FormControl('', Validators.required),
                secteur: new FormControl('', Validators.required),
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
                    this.agences = response;
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
            if (this.agenceForm.valid)
            {
                if(this.agence.id){
                    this.update();
                    this.reset();
                    this.agenceDialog = false;
                }else{
                    this.add();
                    this.reset();
                    this.agenceDialog = false;
                }
            } else {
                this.validateAllFields(this.agenceForm);
            }

        }

        add() {
            const request = {
                libelle: this.libelleValue.value,
                site: this.siteValue.value,
                secteur: this.secteurValue.value,
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
                site: this.siteValue.value,
                secteur: this.secteurValue.value,
                quartierId: this.quartierIdValue.value.id,
            }
            this.submitted = true;
            this.service.update(this.agence.id, request)
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
                    this.agence = response;
                    this.agenceDialog = true;
                    this.agenceForm.get("libelle")?.patchValue(this.agence.libelle);
                    this.agenceForm.get("site")?.patchValue(this.agence.site);
                    this.agenceForm.get("secteur")?.patchValue(this.agence.secteur);
                    this.agenceForm.get("quartierId")?.patchValue(this.agence.quartierId.id);
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
                    this.deleteAgenceDialog = false;
                    this.reset();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteAgenceDialog = false;
                    this.reset();
                }
            });
        }

        openNew() {
            this.submitted = false;
            this.agenceDialog = true;
        }

        deleteSelected(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.agence = response;
                    this.deleteAgenceDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }

        hideDialog() {
            this.agenceDialog = false;
            this.submitted = false;
            this.reset();
        }

        hideSelect() {
            this.deleteAgenceDialog = false;
            this.reset();
        }

        reset() {
            this.agenceForm.get("libelle")?.patchValue('');
            this.agenceForm.get("site")?.patchValue('');
            this.agenceForm.get("secteur")?.patchValue('');
            this.agenceForm.get("quartierId")?.patchValue('');
            this.agence = {};
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
            return this.agenceForm.get('libelle')
        }
        get siteValue() {
            return this.agenceForm.get('site')
        }
        get secteurValue() {
            return this.agenceForm.get('secteur')
        }

        get quartierIdValue() {
            return this.agenceForm.get('quartierId')
        }
    }
