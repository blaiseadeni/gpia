export interface Agence { id: any; code: any; libelle: any; site: any; secteur: any; commune: any; }

export interface Compteur{ id: any; numero: any; marque: any; montant: any; agenceId: any; }

export interface Abonne { id: any; nom: any; postnom: any; prenom: any; contact: any; mail: any; avenue: any; quartier: any; sexe: any; adresse: any; compteurId: any }

export interface Indexage { date: any; numero: any; quantite: any; compteurId: any; }
