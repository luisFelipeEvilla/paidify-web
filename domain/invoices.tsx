class Invoices {
        id!: number;
        description!: string;
        invoice_number!: string;
        amount!: number;
        balance!: number;
        effective_date!: string;
        fulfilled!: number;
        successful!: number;
        num_installments!:  number;
        card_type!: string;
        user_id!: number;
        person_id!: number;
        campus!: string;
        payment_concept!: PaymentConcept;
        payer!: Payer; 
    
}

class Payer {
    guest_id!: number;
    first_name!: string;
    last_name!: string;
    doc_number!: string;
}

export default Invoices;