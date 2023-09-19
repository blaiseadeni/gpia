import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { C } from '@fullcalendar/core/internal-common';
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

    indexDialog: boolean = false;

    deleteIndexDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    cities: SelectItem[];

    compteur: any;

    abonnes: any;

    indexages: any=[];

    indexage: any = {};

    clientIndex: any = {};

    indexForm: FormGroup;


    constructor(
        private messageService: MessageService,
        private indexageService: IndexagesService,
        private abonneService: AbonnesService,
        private breadcrumbService: BreadcrumbService) {
            this.breadcrumbService.setItems([
                {label: 'Opétions'},
                {label: 'Indexage'}
            ]);
        }

        ngOnInit() {
            this.indexForm = new FormGroup({
                periode: new FormControl('', Validators.required),
                ancIndex: new FormControl({value:'', disabled: true}, Validators.required),
                nouvIndex: new FormControl('', Validators.required),
                clientId: new FormControl('', Validators.required),
            })
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
                    this.indexages = response;
                },
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

        save() {

            if (this.indexForm.valid)
            {
                if(this.indexage.id){
                    this.update();
                    this.reset();
                    this.indexDialog = false;
                }else{
                    this.add();
                    this.reset();
                    this.indexDialog = false;
                }
            } else {
                this.validateAllFields(this.indexForm);
            }
        }

        add() {
            const request = {
                periode: this.periodeValue.value,
                ancIndex: this.ancIndexValue.value,
                nouvIndex: this.nouvIndexValue.value - this.ancIndexValue.value ,
                clientId: this.clientIdValue.value.id,
            }
            this.submitted = true;
            this.indexageService.add(request)
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
                periode: this.periodeValue.value,
                ancIndex: this.ancIndexValue.value,
                nouvIndex: this.nouvIndexValue.value,
                clientId: this.clientIdValue.value.id,
            }
            this.submitted = true;
            this.indexageService.update(this.indexage.id, request)
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

        getIndexage(event:any) {
            this.indexageService.getLastIndex(event.value.id).subscribe(
                (res: any) => {
                    this.clientIndex = res;
                    this.indexForm.get("ancIndex")?.patchValue(this.clientIndex.nouvIndex);
                },
                err => {
                    if (err.status == 500)
                    this.indexForm.get("ancIndex")?.patchValue(0);

                    else
                    this.indexForm.get("ancIndex")?.patchValue(0);

                }
                );
            }

            find(id:any):any {
                this.indexageService.get(id)
                .subscribe({
                    next: (response) => {
                        this.indexage = response;
                        this.indexDialog = true;
                        this.indexForm.get("periode")?.patchValue(this.indexage.periode);
                        this.indexForm.get("ancIndex")?.patchValue(this.indexage.ancIndex);
                        this.indexForm.get("nouvIndex")?.patchValue(this.indexage.nouvIndex);
                        this.indexForm.get("clientId")?.patchValue(this.indexage.clientId.id);
                    },
                    error: (response) => {
                        console.log(response);
                    }
                })
            }

            delete(id: any) {
                this.indexageService.delete(id)
                .subscribe({
                    next: (response) => {
                        this.reset();
                    },
                    complete: () => {
                        this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });
                        this.getAll();
                        this.deleteIndexDialog = false;
                        this.reset();
                    },
                    error: (e) => {
                        this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                        this.getAll();
                        this.deleteIndexDialog = false;
                        this.reset();
                    }
                });
            }

            openNew() {
                this.submitted = false;
                this.indexDialog = true;
            }

            deleteSelected(id: any) {
                this.indexageService.get(id)
                .subscribe({
                    next: (response) => {
                        this.indexage = response;
                        this.deleteIndexDialog = true;
                    },
                    error: (response) => {
                        console.log(response);
                    }
                })
            }

            hideDialog() {
                this.indexDialog = false;
                this.submitted = false;
                this.reset();
            }

            hideSelect() {
                this.deleteIndexDialog = false;
                this.reset();
            }

            reset() {
                this.indexForm.get("periode")?.patchValue('');
                this.indexForm.get("ancIndex")?.patchValue('');
                this.indexForm.get("nouvIndex")?.patchValue('');
                this.indexForm.get("clientId")?.patchValue('');
                this.indexage = {};
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
                return this.indexForm.get('periode')
            }
            get ancIndexValue() {
                return this.indexForm.get('ancIndex')
            }
            get nouvIndexValue() {
                return this.indexForm.get('nouvIndex')
            }

            get clientIdValue() {
                return this.indexForm.get('clientId')
            }


        }
