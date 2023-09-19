import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Abonne } from 'src/app/models/models';
import { AbonnesService } from 'src/app/services/abonnes/abonnes.service';
import { CompteursService } from 'src/app/services/compteurs/compteurs.service';
import { RueService } from 'src/app/services/rue/rue.service';
import { TypeClientService } from 'src/app/services/typeClient/type-client.service';

@Component({
    selector: 'app-abonnes',
    templateUrl: './abonnes.component.html',
    styleUrls: ['./abonnes.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class AbonnesComponent {

    abonneDialog: boolean = false;

    deleteAbonneDialog: boolean = false;

    abonneForm: FormGroup;

    submitted: boolean = false;

    cols: any[] = [];

    sexes: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    compteurs: any = [];

    types: any = [];

    rues: any=[];

    abonnes: any =[];

    abonne: any={}

    constructor(private productService:
        ProductService,
        private messageService: MessageService,
        private service: AbonnesService,
        private compteurService: CompteursService,
        private rueService: RueService,
        private typeService: TypeClientService,
        private breadcrumbService: BreadcrumbService) {
            this.breadcrumbService.setItems([
                {label: 'Opérations'},
                {label: 'Abonnés'}
            ]);
        }
        ngOnInit() {
            this.abonneForm = new FormGroup({
                nom: new FormControl('', Validators.required),
                postnom: new FormControl('', Validators.required),
                prenom: new FormControl('', Validators.required),
                contact: new FormControl('', Validators.required),
                mail: new FormControl('', Validators.required),
                sexe: new FormControl('', Validators.required),
                pa: new FormControl('', Validators.required),
                rueId: new FormControl('', Validators.required),
                compteurId: new FormControl('', Validators.required),
                typeClientId: new FormControl('', Validators.required),
            })

            this.cols = [
                { field: 'id', header: 'id' },
                { field: 'libelle', header: 'libelle' },
            ];
            this.sexes = [
                { libelle: 'Feminin', value: 'Feminin' },
                { libelle: 'Masculin', value: 'Masculin' },
            ];
            this.getAll();
            this.getAllRues();
            this.getAllTypes();
            this.getAllCompteurs();
        }

        getAll() {
            this.service.getAll()
            .subscribe({
                next: (response) => {
                    this.abonnes = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }

        getAllRues() {
            this.rueService.getAll()
            .subscribe({
                next: (response) => {
                    this.rues = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }

        getAllTypes() {
            this.typeService.getAll()
            .subscribe({
                next: (response) => {
                    this.types = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        getAllCompteurs() {
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

        save() {
            if (this.abonneForm.valid)
            {
                if(this.abonne.id){
                    this.update();
                    this.reset();
                    this.abonneDialog = false;
                }else{
                    this.add();
                    this.reset();
                    this.abonneDialog = false;
                }
            } else {
                this.validateAllFields(this.abonneForm);
            }

        }

        add() {
            const request = {
                nom: this.nomValue.value,
                postnom: this.postnomValue.value,
                prenom: this.prenomValue.value,
                contact: this.contactValue.value,
                mail: this.mailValue.value,
                sexe: this.sexeValue.value.value,
                pa: this.paValue.value,
                rueId: this.rueIdValue.value.id,
                compteurId: this.compteurIdValue.value.id,
                typeClientId: this.typeClientIdValue.value.id,
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
                nom: this.nomValue.value,
                postnom: this.postnomValue.value,
                prenom: this.prenomValue.value,
                contact: this.contactValue.value,
                mail: this.mailValue.value,
                sexe: this.sexeValue.value.value,
                pa: this.paValue.value,
                rueId: this.rueIdValue.value.id,
                compteurId: this.compteurIdValue.value.id,
                typeClientId: this.typeClientIdValue.value.id,
            }
            this.submitted = true;
            this.service.update(this.abonne.id, request)
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
                    this.abonne = response;
                    this.abonneDialog = true;
                    this.abonneForm.get("nom")?.patchValue(this.abonne.nom);
                    this.abonneForm.get("postnom")?.patchValue(this.abonne.postnom);
                    this.abonneForm.get("prenom")?.patchValue(this.abonne.prenom);
                    this.abonneForm.get("contact")?.patchValue(this.abonne.contact);
                    this.abonneForm.get("mail")?.patchValue(this.abonne.mail);
                    this.abonneForm.get("sexe")?.patchValue(this.abonne.sexe);
                    this.abonneForm.get("mail")?.patchValue(this.abonne.mail);
                    this.abonneForm.get("pa")?.patchValue(this.abonne.pa);
                    this.abonneForm.get("rueId")?.patchValue(this.abonne.rueId.id);
                    this.abonneForm.get("compteurId")?.patchValue(this.abonne.compteurId.id);
                    this.abonneForm.get("typeClientId")?.patchValue(this.abonne.typeClientId.id);
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
                    this.deleteAbonneDialog = false;
                    this.reset();
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteAbonneDialog = false;
                    this.reset();
                }
            });
        }

        openNew() {
            this.submitted = false;
            this.abonneDialog = true;
        }

        deleteSelected(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.abonne = response;
                    this.deleteAbonneDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }

        hideDialog() {
            this.abonneDialog = false;
            this.submitted = false;
            this.reset();
        }

        hideSelect() {
            this.deleteAbonneDialog = false;
            this.reset();
        }

        reset() {
            this.abonneForm.get("nom")?.patchValue('');
            this.abonneForm.get("postnom")?.patchValue('');
            this.abonneForm.get("prenom")?.patchValue('');
            this.abonneForm.get("contact")?.patchValue('');
            this.abonneForm.get("mail")?.patchValue('');
            this.abonneForm.get("sexe")?.patchValue('');
            this.abonneForm.get("mail")?.patchValue('');
            this.abonneForm.get("pa")?.patchValue('');
            this.abonneForm.get("rueId")?.patchValue('');
            this.abonneForm.get("compteurId")?.patchValue('');
            this.abonneForm.get("typeClientId")?.patchValue('');
            this.abonne = {};
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

        get nomValue() {
            return this.abonneForm.get('nom')
        }
        get postnomValue() {
            return this.abonneForm.get('postnom')
        }
        get prenomValue() {
            return this.abonneForm.get('prenom')
        }
        get typeClientIdValue() {
            return this.abonneForm.get('typeClientId')
        }
        get compteurIdValue() {
            return this.abonneForm.get('compteurId')
        }
        get rueIdValue() {
            return this.abonneForm.get('rueId')
        }
        get paValue() {
            return this.abonneForm.get('pa')
        }
        get sexeValue() {
            return this.abonneForm.get('sexe')
        }
        get mailValue() {
            return this.abonneForm.get('mail')
        }
        get contactValue() {
            return this.abonneForm.get('contact')
        }
    }
