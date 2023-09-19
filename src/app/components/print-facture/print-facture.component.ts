import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbonnesService } from './../../services/abonnes/abonnes.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { FacturesService } from 'src/app/services/factures/factures.service';
import { QuartierService } from 'src/app/services/quartier/quartier.service';

@Component({
    selector: 'app-print-facture',
    templateUrl: './print-facture.component.html',
    styleUrls: ['./print-facture.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class PrintFactureComponent implements OnInit {
    
    url: any ;
    quartiers: any;
    id: any;
    pdfUrl: any;
    periodes: any;
    critere: boolean = false;
    clients: any;
    
    
    pa: any;
    quartierId: any;
    periode: any;
    factureForm: FormGroup;
    
    
    constructor(
        private breadcrumbService: BreadcrumbService,
        private service: FacturesService,
        private messageService: MessageService,
        private factureService: FacturesService,
        private clientService: AbonnesService,
        private quartierService: QuartierService) {
            this.breadcrumbService.setItems([
                {label: 'Edition'},
                {label: 'Facture'}
            ]);
        }
        
        ngOnInit(): void {
            this.factureForm = new FormGroup({
                periode: new FormControl('', Validators.required),
                quartierId: new FormControl(''),
                pa: new FormControl(''),
            })
            this.getAllQuart();
            this.getAllPeriodes();
            this.getAllClients();
        }
        
        facture() {
            if (this.critere === true) {
                const request = {
                    pa: this.paValue.value.pa,
                    periode: this.periodeValue.value.periode
                }
                this.service.getFacture(request)
                .subscribe({
                    next: (response) => {
                        let blob: Blob = response.body as Blob;
                        this.url = blob;
                        // window.open(window.URL.createObjectURL(blob));
                    },
                    complete: () => {
                        // window.open(window.URL.createObjectURL(this.url)); 
                        
                        
                    },
                    error: (e) => {
                        //  window.open(window.URL.createObjectURL(this.url)); 
                        
                    }
                });
            } else {
                const request = {
                    quartierId: this.quartierIdValue.value.id,
                    periode: this.periodeValue.value.periode
                    
                }
                this.service.getAllFact(request)
                .subscribe({
                    next: (response) => {
                        let blob: Blob = response.body as Blob;
                        this.url = blob;
                        // window.open(window.URL.createObjectURL(blob));
                    },
                    complete: () => {
                        // window.open(window.URL.createObjectURL(this.url)); 
                        
                        
                    },
                    error: (e) => {
                        // window.open(window.URL.createObjectURL(this.url)); 
                        
                    }
                });
            }
            
        }
        
        getAllClients() {
            this.clientService.getAll()
            .subscribe({
                next: (response) => {
                    this.clients = response;
                    console.log(this.clients);
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
                    this.quartiers = response;
                },
                error: (errors) => {
                    console.log(errors);
                }
            });
        }
        
        
        
        // PrintInvoice() {
        
        //     if (this.critere === true) {
        //         const request = {
        //             pa: this.paValue.value.pa,
        //             periode: this.periodeValue.value.periode
        //         }
        
        //         if (request.periode != null && request.pa != null) {
        //             this.service.getAllFact(request).subscribe(
        //                 (res: any) => {
        //                     let blob: Blob = res.body as Blob;
        //                     this.url = blob;
        //                     window.open(window.URL.createObjectURL(blob));
        //                 },
        //                 err => {
        //                     if (err.status == 500)
        //                     this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Information non trouvée.', life: 3000 });
        //                     else
        //                     console.log(err);
        //                 }
        //                 );
        //             } else {
        //                 this.messageService.add({ severity: 'error', summary: 'Avertissement', detail: 'Prière de sélectionner un quartier !', life: 3000 });
        //             }
        //         } else {
        //             const request = {
        //                 quartierId: this.quartierIdValue.value.id,
        //                 periode: this.periodeValue.value.periode
        
        //             }
        
        //             if ( request.periode != null && request.quartierId != null) {
        //                 this.service.getFacture(request).subscribe(
        //                     (res: any) => {
        //                         let blob: Blob = res.body as Blob;
        //                         this.url = blob;
        //                         window.open(window.URL.createObjectURL(blob));
        //                     },
        //                     err => {
        //                         if (err.status == 500)
        //                         this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Information non trouvée.', life: 3000 });
        //                         else
        //                         console.log(err);
        //                     }
        //                     );
        //                 } else {
        //                     this.messageService.add({ severity: 'error', summary: 'Avertissement', detail: 'Prière de sélectionner un quartier !', life: 3000 });
        //                 }
        //             }
        
        
        
        //         }
        
        getcritere(event: any) {
            this.critere = event.checked;
            console.log(this.critere);
        }
        
        get(event: any) {
            this.id = event.value.id;
        }
        
        get paValue() {
            return this.factureForm.get('pa')
        }
        
        get quartierIdValue() {
            return this.factureForm.get('quartierId')
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
    