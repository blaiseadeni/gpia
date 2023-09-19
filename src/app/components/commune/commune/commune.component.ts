import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { CommuneService } from 'src/app/services/commune/commune.service';

@Component({
    selector: 'app-commune',
    templateUrl: './commune.component.html',
    styleUrls: ['./commune.component.scss'],
    providers: [MessageService]

})
export class CommuneComponent {

    communeDialog: boolean = false;

    deleteCommuneDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    communes: any = [];

    commune: any = {};

    communeForm: FormGroup;


    constructor(
        private messageService: MessageService,
        private breadcrumbService: BreadcrumbService,
        private service: CommuneService) {
            this.breadcrumbService.setItems([
                {label: 'Eléments'},
                {label: 'Commune'}
            ]);
        }

        ngOnInit() {
            this.communeForm = new FormGroup({
                libelle: new FormControl('', Validators.required),
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
                    this.communes = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }

        save(){
            if (this.communeForm.valid) {
                if(this.commune.id){
                    this.update();
                    this.communeForm.get("libelle")?.patchValue('');
                }else{
                    this.add();
                    this.communeForm.get("libelle")?.patchValue('');
                }
            } else {
                this.validateAllFields(this.communeForm)
            }
        }

        add() {
            this.submitted = true;
            const request = {
                libelle: this.libelleValue.value,
            }
            this.service.add(request)
            .subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.commune = '';
                    this.getAll();
                    this.communeDialog = false;
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                    this.commune = '';
                    this.getAll();
                    this.communeDialog = false;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 });
                    this.commune = '';
                    this.getAll();
                    this.communeDialog = false;
                }
            });
        }

        update() {
            this.submitted = true;
            const request = {
                libelle: this.libelleValue.value,
            }
            this.service.update(this.commune.id, request)
            .subscribe({
                next: (response) => {
                    this.commune = '';
                    this.communeDialog = false;
                    this.communeForm.get("libelle")?.patchValue('');
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                    this.getAll();
                    this.commune = '';
                    this.communeDialog = false;
                    this.communeForm.get("libelle")?.patchValue('');
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 });
                    this.getAll();
                    this.commune = '';
                    this.communeDialog = false;
                    this.communeForm.get("libelle")?.patchValue('');
                }
            })
        }

        find(id:any):any {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.commune = response;
                    this.communeDialog = true;
                    this.communeForm.get("libelle")?.patchValue(this.commune.libelle);
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
                    this.deleteCommuneDialog = false;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteCommuneDialog = false;
                }
            });
        }

        openNew() {
            this.submitted = false;
            this.communeDialog = true;
        }

        deleteSelected(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.commune = response;
                    this.deleteCommuneDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }

        hideDialog() {
            this.commune = {};
            this.communeDialog = false;
            this.submitted = false;
            this.communeForm.get("libelle")?.patchValue('');
        }

        hideSelect() {
            this.deleteCommuneDialog = false;
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
            return this.communeForm.get('libelle')
        }

    }
