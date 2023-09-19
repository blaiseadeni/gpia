import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginService } from '../services/login/login.service';
import { UtilisateursService } from '../services/users/utilisateurs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    providers: [MessageService, ConfirmationService],

})
export class AppLoginComponent {

    role: any;
    id: any;
    status: string;

    loginDialog: boolean = false;

    loginUpdateDialog: boolean = false;
    infoDialog: boolean = false;

    loginForm: FormGroup;

    data = {
        user: '',
        password: ''
    };


    constructor(
        private service: LoginService,
        private userService: UtilisateursService,
        private messageService: MessageService,
        private router: Router
        ) { }


        ngOnInit() {
            this.status = localStorage.getItem('status');
            this.id = localStorage.getItem('id');
            this.role = localStorage.getItem('role');

            this.loginForm = new FormGroup({
                user: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
                passwordConfirm: new FormControl('',Validators.required),

            })
        }

        showDialog() {
            this.loginUpdateDialog = false;
            this.loginDialog = true;
        }

        hide() {
            this.loginDialog = false;
            this.loginUpdateDialog = false;
        }

        login() {
            this.service.login(this.data).subscribe(
                (res: any) => {
                    const user = res;
                    localStorage.setItem('role', user.role);
                    localStorage.setItem('status', user.status);
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('active', user.active);
                    if (user.role !== null) {
                        if (user.active === true) {
                            if (user.status === true) {
                                this.router.navigateByUrl('/admin')
                            } else {
                                this.infoDialog = true;

                            }
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Login', detail: 'Compte desactiver', life: 3000 });
                        }
                    }
                    // if(user.role === "Admin") this.router.navigateByUrl('/admin');
                    // if(user.role === "Etudiant") this.router.navigateByUrl('/student');
                    // if(user.role === "Enseignant") this.router.navigateByUrl('/teacher');

                    // localStorage.setItem('user', JSON.stringify(user));
                },
                err => {
                    if (err.status == 401)
                    this.messageService.add({ severity: 'error', summary: 'Login', detail: 'Incorrect username or password.', life: 3000 });
                    else
                    console.log(err);
                }
                );
            }


            updates() {
                const request = {
                    user: this.userValue.value,
                    password: this.passwordValue.value
                }
                this.service.update(this.id, request)
                .subscribe({
                    next: (response) => {
                        this.loginDialog = false;
                        this.loginForm.get("user")?.patchValue('');
                        this.loginForm.get("password")?.patchValue('');
                        this.loginForm.get("passwordConfirm")?.patchValue('');
                    },
                    complete: () => {
                        this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modifier avec succès', life: 3000 });
                        this.loginDialog = false;
                        this.loginForm.get("user")?.patchValue('');
                        this.loginForm.get("password")?.patchValue('');
                        this.loginForm.get("passwordConfirm")?.patchValue('');
                    },
                    error: (e) => {
                        this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modifier avec succès', life: 3000 });
                        this.loginDialog = false;
                        this.loginForm.get("user")?.patchValue('');
                        this.loginForm.get("password")?.patchValue('');
                        this.loginForm.get("passwordConfirm")?.patchValue('');
                    }
                })
            }


            openInfoDialog() {
                this.loginDialog = true;
                this.infoDialog = false;
            }

            update() {
                if (this.loginForm.valid) {
                    const request = {
                        user: this.userValue.value,
                        password: this.passwordValue.value
                    }
                    if (request.password === this.confPasswordValue.value) {
                        this.userService.updateLogin(this.id, request)
                        .subscribe({
                            next: (response) => {
                                this.loginDialog = false;
                                this.loginForm.get("user")?.patchValue('');
                                this.loginForm.get("password")?.patchValue('');
                                this.loginForm.get("passwordConfirm")?.patchValue('');
                            },
                            complete: () => {
                                this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modification effectuée avec succès', life: 3000 });
                                this.loginDialog = false;
                                this.loginForm.get("user")?.patchValue('');
                                this.loginForm.get("password")?.patchValue('');
                                this.loginForm.get("passwordConfirm")?.patchValue('');
                            },
                            error: (e) => {
                                this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modification effectuée avec succès', life: 3000 });
                                this.loginDialog = false;
                                this.loginForm.get("user")?.patchValue('');
                                this.loginForm.get("password")?.patchValue('');
                                this.loginForm.get("passwordConfirm")?.patchValue('');
                            }
                        })
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Les deux mots de passe ne correspondent pas.', life: 3000 });
                    }
                } else {
                    this.validateAllFields(this.loginForm);
                }
            }

            get userValue() {
                return this.loginForm.get('user')
            }
            get passwordValue() {
                return this.loginForm.get('password')
            }
            get confPasswordValue() {
                return this.loginForm.get('passwordConfirm')
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
        }
