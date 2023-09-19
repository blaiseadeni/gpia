import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { TypeClientService } from 'src/app/services/typeClient/type-client.service';

@Component({
    selector: 'app-type-client',
    templateUrl: './type-client.component.html',
    styleUrls: ['./type-client.component.scss'],
    providers: [MessageService]

})
export class TypeClientComponent {

    typeDialog: boolean = false;

    deleteTypeDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    types: any = [];

    type: any = {};

    typeForm: FormGroup;


    constructor(
        private messageService: MessageService,
        private breadcrumbService: BreadcrumbService,
        private service: TypeClientService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Type client'}
            ]);
        }

        ngOnInit() {
            this.typeForm = new FormGroup({
                libelle: new FormControl('', Validators.required),
                tarif: new FormControl('', Validators.required),
            })

            this.cols = [
                { field: 'id', header: 'id' },
                { field: 'libelle', header: 'libelle' },
            ];
            this.getAll();
        }

        getAll() {
            this.service.getAll()
            .subscribe({
                next: (response) => {
                    this.types = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }

        save(){
            if (this.typeForm.valid) {
                if(this.type.id){
                    this.update();
                    this.typeForm.get("libelle")?.patchValue('');
                    this.typeForm.get("tarif")?.patchValue('');
                }else{
                    this.add();
                    this.typeForm.get("libelle")?.patchValue('');
                    this.typeForm.get("tarif")?.patchValue('');
                }
            } else {
                this.validateAllFields(this.typeForm)
            }
        }

        add() {
            this.submitted = true;
            const request = {
                libelle: this.libelleValue.value,
                tarif: this.tarifValue.value,
            }
            console.log(request);
            this.service.add(request)
            .subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.type = '';
                    this.getAll();
                    this.typeDialog = false;
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.type = '';
                    this.getAll();
                    this.typeDialog = false;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 });
                    this.type = '';
                    this.getAll();
                    this.typeDialog = false;
                }
            });
        }

        update() {
            this.submitted = true;
            const request = {
                libelle: this.libelleValue.value,
                tarif: this.tarifValue.value,
            }
            this.service.update(this.type.id, request)
            .subscribe({
                next: (response) => {
                    this.type = '';
                    this.typeDialog = false;
                    this.typeForm.get("libelle")?.patchValue('');
                    this.typeForm.get("tarif")?.patchValue('');
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                    this.getAll();
                    this.type = '';
                    this.typeDialog = false;
                    this.typeForm.get("libelle")?.patchValue('');
                    this.typeForm.get("tarif")?.patchValue('');
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 });
                    this.getAll();
                    this.type = '';
                    this.typeDialog = false;
                    this.typeForm.get("libelle")?.patchValue('');
                    this.typeForm.get("tarif")?.patchValue('');
                }
            })
        }

        find(id:any):any {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.type = response;
                    this.typeDialog = true;
                    this.typeForm.get("libelle")?.patchValue(this.type.libelle);
                    this.typeForm.get("tarif")?.patchValue(this.type.tarif);
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

                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: ' Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteTypeDialog = false;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteTypeDialog = false;
                }
            });
        }

        openNew() {
            this.submitted = false;
            this.typeDialog = true;
        }

        deleteSelected(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.type = response;
                    this.deleteTypeDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }

        hideDialog() {
            this.type = {};
            this.typeDialog = false;
            this.submitted = false;
            this.typeForm.get("libelle")?.patchValue('');
        }

        hideSelect() {
            this.deleteTypeDialog = false;
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
            return this.typeForm.get('libelle')
        }
        get tarifValue() {
            return this.typeForm.get('tarif')
        }

    }
