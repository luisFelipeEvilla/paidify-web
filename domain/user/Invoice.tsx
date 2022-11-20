import PayConcept from "../general/PayConcept";

class Invoice {
    id!: number;
    description!: string;
    invoice_number!: string;
    amount!: number;
    balance!: number;
    effective_date!: string;
    fulfilled!: number;
    successful!: number;
    num_installments!: number;
    card_type!: string;
    campus!: string;
    payment_concept!: PayConcept;
}

export default Invoice;
