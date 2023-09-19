import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { UtilisateursService } from 'src/app/services/users/utilisateurs.service';

@Component({
    selector: 'app-utilisateurs',
    templateUrl: './utilisateurs.component.html',
    styleUrls: ['./utilisateurs.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class UtilisateursComponent {

    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    submitted: boolean = false;

    checked: boolean = true;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    users: any = [];
    user: any = {};
    roles: any[] = [];
    userForm: FormGroup;
    activeForm: FormGroup;

    constructor(
        private messageService: MessageService,
        private service: UtilisateursService,
        private breadcrumbService: BreadcrumbService) {
            this.breadcrumbService.setItems([
                {label: 'Configurations'},
                {label: 'Utilisateur'}
            ]);
        }

        ngOnInit() {
            this.userForm = new FormGroup({
                nom: new FormControl('', Validators.required),
                postnom: new FormControl('', Validators.required),
                mail: new FormControl(''),
                contact: new FormControl('', Validators.required),
                user: new FormControl('', Validators.required),
                role: new FormControl('', Validators.required),
            })

            this.getAll();

            this.roles = [
                { label: 'Administrateur', value: 'admin' },
                { label: 'Facturier', value: 'facturier' },
                { label: 'Preleveur', value: 'preleveur' }
            ];


        }


        getAll() {
            this.service.getAll()
            .subscribe({
                next: (response) => {
                    this.users = response;
                    console.log(this.users);
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }


        openNew() {
            this.submitted = false;
            this.userDialog = true;
        }

        confirmDelete(id: any) {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.user = response;
                    this.deleteUserDialog = true;
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }

        hideDialog() {
            this.userDialog = false;
            this.submitted = false;
        }

        save() {
            if (this.userForm.valid) {
                if (this.user.id) {
                    this.update();
                } else {
                    this.add();
                }
            } else {
                this.validateAllFields(this.userForm)
            }
        }


        add() {

            if (this.userForm.valid) {
                this.submitted = true;
                const request = {
                    nom: this.nomValue.value,
                    postnom: this.postnomValue.value,
                    mail: this.mailValue.value,
                    contact: this.contactValue.value,
                    user: this.userValue.value,
                    role: this.roleValue.value,
                }
                this.service.add(request)
                .subscribe({
                    next: (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                        this.user = '';
                        this.getAll();
                        this.userDialog = false;
                        this.userForm.get("nom")?.patchValue('');
                        this.userForm.get("postnom")?.patchValue('');
                        this.userForm.get("mail")?.patchValue('');
                        this.userForm.get("contact")?.patchValue('');
                        this.userForm.get("user")?.patchValue('');
                        this.userForm.get("role")?.patchValue('');
                    },
                    complete: () => {
                        this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: ' Enregistrer avec succès', life: 3000 });
                        this.user = '';
                        this.getAll();
                        this.userDialog = false;
                        this.userForm.get("nom")?.patchValue('');
                        this.userForm.get("postnom")?.patchValue('');
                        this.userForm.get("mail")?.patchValue('');
                        this.userForm.get("contact")?.patchValue('');
                        this.userForm.get("user")?.patchValue('');
                        this.userForm.get("role")?.patchValue('');
                    },
                    error: (e) => {
                        this.messageService.add({ severity: 'success', summary: 'Enregistrement', detail: 'Enregistrer avec succès', life: 3000 });
                        this.user = '';
                        this.getAll();
                        this.userDialog = false;
                        this.userForm.get("nom")?.patchValue('');
                        this.userForm.get("postnom")?.patchValue('');
                        this.userForm.get("mail")?.patchValue('');
                        this.userForm.get("contact")?.patchValue('');
                        this.userForm.get("user")?.patchValue('');
                        this.userForm.get("role")?.patchValue('');
                    }
                });
            } else {
                this.validateAllFields(this.userForm)
            }
        }

        update() {
            this.submitted = true;
            const request = {
                nom: this.nomValue.value,
                postnom: this.postnomValue.value,
                mail: this.mailValue.value,
                contact: this.contactValue.value,
                user: this.userValue.value,
                role: this.roleValue.value,
            }
            this.service.update(this.user.id, request)
            .subscribe({
                next: (response) => {
                    this.user = '';
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                    this.getAll();
                    this.userDialog = false;
                    this.userForm.get("nom")?.patchValue('');
                    this.userForm.get("postnom")?.patchValue('');
                    this.userForm.get("mail")?.patchValue('');
                    this.userForm.get("contact")?.patchValue('');
                    this.userForm.get("user")?.patchValue('');
                    this.userForm.get("role")?.patchValue('');
                },
                complete: () => {
                    this.user = '';
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                    this.getAll();
                    this.userDialog = false;
                    this.userForm.get("nom")?.patchValue('');
                    this.userForm.get("postnom")?.patchValue('');
                    this.userForm.get("mail")?.patchValue('');
                    this.userForm.get("contact")?.patchValue('');
                    this.userForm.get("user")?.patchValue('');
                    this.userForm.get("role")?.patchValue('');
                },
                error: (e) => {
                    this.user = '';
                    this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                    this.getAll();
                    this.userDialog = false;
                    this.userForm.get("nom")?.patchValue('');
                    this.userForm.get("postnom")?.patchValue('');
                    this.userForm.get("mail")?.patchValue('');
                    this.userForm.get("contact")?.patchValue('');
                    this.userForm.get("user")?.patchValue('');
                    this.userForm.get("role")?.patchValue('');
                }
            })
        }

        find(id:any):any {
            this.service.get(id)
            .subscribe({
                next: (response) => {
                    this.user = response;
                    this.userDialog = true;
                    this.userForm.get("nom")?.patchValue(this.user.nom);
                    this.userForm.get("postnom")?.patchValue(this.user.postnom);
                    this.userForm.get("mail")?.patchValue(this.user.mail);
                    this.userForm.get("contact")?.patchValue(this.user.contact);
                    this.userForm.get("user")?.patchValue(this.user.user);
                    this.userForm.get("role")?.patchValue(this.user.role);
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
                    this.deleteUserDialog = false;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'success', summary: 'Reussi', detail: 'Supprimer avec succès', life: 3000 });
                    this.getAll();
                    this.deleteUserDialog = false;
                }
            });
        }


        get nomValue() {
            return this.userForm.get('nom')
        }
        get postnomValue() {
            return this.userForm.get('postnom')
        }
        get mailValue() {
            return this.userForm.get('mail')
        }
        get contactValue() {
            return this.userForm.get('contact')
        }
        get userValue() {
            return this.userForm.get('user')
        }
        get roleValue() {
            return this.userForm.get('role')
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

        active(event: any,index:any) {
            const request = {
                active: event.checked
            }
            const id = this.users[index].id

            this.service.activateCompte(id, request)
            .subscribe({
                next: (response) => {

                },
                complete: () => {
                    if (request.active === true) {
                        this.messageService.add({ severity: 'success', summary: 'Activation', detail: ' Compte activer avec succès', life: 3000 });

                    } else {
                        this.messageService.add({ severity: 'success', summary: 'Desactivation', detail: ' Compte desactiver avec succès', life: 3000 });

                    }
                },
                error: (e) => {
                    if (request.active === true) {
                        this.messageService.add({ severity: 'success', summary: 'Activation', detail: ' Compte activer avec succès', life: 3000 });

                    } else {
                        this.messageService.add({ severity: 'success', summary: 'Desactivation', detail: ' Compte desactiver avec succès', life: 3000 });

                    }
                }
            })


        }


    }
