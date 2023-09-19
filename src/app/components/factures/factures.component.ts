import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { FacturesService } from 'src/app/services/factures/factures.service';

@Component({
    selector: 'app-factures',
    templateUrl: './factures.component.html',
    styleUrls: ['./factures.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class FacturesComponent {

    factureDialog: boolean = false;

    deleteFactureDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    factures: any = [];


    facture: any ={};

    factureForm: FormGroup;

    constructor(
        private messageService: MessageService,
        private breadcrumbService: BreadcrumbService,
        private service:FacturesService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Agence'}
            ]);
        }

        ngOnInit() {
            this.factureForm = new FormGroup({
                periode: new FormControl('', Validators.required),
            })

            this.cols = [
                { field: 'id', header: 'id' },
                { field: 'periode', header: 'periode' },
            ];
            this.getAll();
        }

        getAll() {
            this.service.getAll()
            .subscribe({
                next: (response) => {
                    this.factures = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }

        save() {
            if (this.factureForm.valid)
            {
                if(this.facture.id){
                    this.update();
                    this.reset();
                    this.factureDialog = false;
                }else{
                    this.add();
                    this.reset();
                    this.factureDialog = false;
                }
            } else {
                this.validateAllFields(this.factureForm);
            }

        }

        add() {
            const request = {
                periode: this.periodeValue.value,
            }
            this.submitted = true;
            this.service.add(request)
            .subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Génération', detail: ' Génération reussie avec succès', life: 3000 });
                    this.getAll();
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Génération', detail: ' Génération reussie avec succès', life: 3000 });
                    this.getAll();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Génération', detail: 'Génération reussie avec succès', life: 3000 });
                    this.getAll();
                }
            });
        }


        update() {
            const request = {
                periode: this.periodeValue.value,

            }
            this.submitted = true;
            this.service.update(this.facture.id, request)
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

        // find(id:any):any {
        //     this.service.get(id)
        //     .subscribe({
        //         next: (response) => {
        //             this.agence = response;
        //             this.agenceDialog = true;
        //             this.agenceForm.get("libelle")?.patchValue(this.agence.libelle);
        //             this.agenceForm.get("site")?.patchValue(this.agence.site);
        //             this.agenceForm.get("secteur")?.patchValue(this.agence.secteur);
        //             this.agenceForm.get("quartierId")?.patchValue(this.agence.quartierId.id);
        //         },
        //         error: (response) => {
        //             console.log(response);
        //         }
        //     })
        // }

        delete(id: any) {
            this.service.delete(id)
            .subscribe({
                next: (response) => {
                    this.reset();
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteFactureDialog = false;
                    this.reset();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteFactureDialog = false;
                    this.reset();
                }
            });
        }

        openNew() {
            this.submitted = false;
            this.factureDialog = true;
        }

        deleteSelected(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.facture = response;
                    this.deleteFactureDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }

        hideDialog() {
            this.factureDialog = false;
            this.submitted = false;
            this.reset();
        }

        hideSelect() {
            this.deleteFactureDialog = false;
            this.reset();
        }

        reset() {
            this.factureForm.get("periode")?.patchValue('');
            this.facture = {};
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

        get periodeValue() {
            return this.factureForm.get('periode')
        }

    }
