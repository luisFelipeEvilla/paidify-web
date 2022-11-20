import PayConcept from "../general/PayConcept";

class PayConceptPerson {
    id!: number;
    ref_number!: string;
    pay_before!: string;
    completed!: number;
    payment_concept!: PayConcept;
}

export default PayConceptPerson;
