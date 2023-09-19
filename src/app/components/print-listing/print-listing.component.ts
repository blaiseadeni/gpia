import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { AbonnesService } from 'src/app/services/abonnes/abonnes.service';
import { CommuneService } from 'src/app/services/commune/commune.service';
import { FacturesService } from 'src/app/services/factures/factures.service';
import { QuartierService } from 'src/app/services/quartier/quartier.service';
import { RueService } from 'src/app/services/rue/rue.service';

@Component({
    selector: 'app-print-listing',
    templateUrl: './print-listing.component.html',
    styleUrls: ['./print-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class PrintListingComponent {
    
    url: any ;
    quartiers: any;
    id: any;
    pdfUrl: any;
    periodes: any;
    critere: any;
    criteres: any;
    rues: any;
    values: any;
    
    pa: any;
    quartierId: any;
    periode: any;
    factureForm: FormGroup;
    
    
    constructor(
        private breadcrumbService: BreadcrumbService,
        private service: FacturesService,
        private messageService: MessageService,
        private factureService: FacturesService,
        private communeService: CommuneService,
        private rueService: RueService,
        private quartierService: QuartierService) {
            this.breadcrumbService.setItems([
                {label: 'Edition'},
                {label: 'Listing'}
            ]);
        }
        
        ngOnInit(): void {
            
            this.values = [
                { libelle: 'Commune', value: 'commune' },
                { libelle: 'Quartier', value: 'quartier' },
                { libelle: 'Rue', value: 'rue' },
            ];
            
            
            this.factureForm = new FormGroup({
                periode: new FormControl('', Validators.required),
                id: new FormControl(''),
            })
            this.getAllPeriodes();
        }
        
        getcritere(event: any) {
            this.critere = event.value.value;
            if (this.critere === "commune") {
                this.getAllCommunes();
            } else {
                if (this.critere === "quartier") {
                    this.getAllQuart();
                } else {
                    if (this.critere === "rue") {
                        this.getAllRues();
                    } else {
                        
                    }
                }
            }
        }
        
        printListing() {
            if (this.critere === "commune") {
                const request = {
                    communeId: this.idValue.value.id,
                    periode: this.periodeValue.value.periode
                }
                this.service.listingCommune(request)
                .subscribe({
                    next: (response) => {
                        let blob: Blob = response.body as Blob;
                        this.url = blob;
                    },
                    complete: () => {
                        
                    },
                    error: (e) => {
                    }
                });
                
            } else {
                if (this.critere === "quartier") {
                    const request = {
                        quartierId: this.idValue.value.id,
                        periode: this.periodeValue.value.periode
                    }
                    this.service.listingQuartier(request)
                    .subscribe({
                        next: (response) => {
                            let blob: Blob = response.body as Blob;
                            this.url = blob;
                        },
                        complete: () => {
                            
                        },
                        error: (e) => {
                        }
                    });
                } else {
                    if (this.critere === "rue") {
                        const request = {
                            rueId: this.idValue.value.id,
                            periode: this.periodeValue.value.periode
                        }
                        this.service.listingRue(request)
                        .subscribe({
                            next: (response) => {
                                let blob: Blob = response.body as Blob;
                                this.url = blob;
                            },
                            complete: () => {
                                
                            },
                            error: (e) => {
                            }
                        });
                    } else {
                        
                    }
                }
            }
            
        }
        
        getAllCommunes() {
            this.communeService.getAll()
            .subscribe({
                next: (response) => {
                    this.criteres = response;
                    console.log(this.criteres);
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
                    this.criteres = response;
                    console.log(this.criteres);
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        getAllPeriodes() {
            this.factureService.getAllPeriodes()
            .subscribe({
                next: (response) => {
                    this.periodes = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        getAllQuart() {
            this.quartierService.getAll()
            .subscribe({
                next: (response) => {
                    this.criteres = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        get(event: any) {
            this.id = event.value.id;
        }
        
        
        
        get idValue() {
            return this.factureForm.get('id')
        }
        
        get periodeValue() {
            return this.factureForm.get('periode')
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
    