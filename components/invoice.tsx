import Link from "next/link";
import PrimaryButton from "./buttons/primary";

type invoice = {
    concept: string,
    paymentDate: string,
    invoiceNumber: number,
    amount: number
}

const Invoice = (props: invoice) => {
    return (
        <div className='shadow-lg border-gray-300 border p-8 mx-auto my-12 flex justify-between rounded w-6/12'>
        <div>
          <div className='flex'>
            <p> <b>Concepto: </b> {props.concept} </p>
          </div>
          <div >
            <p className='pt-3'><b>Fecha de Pago: </b> { props.paymentDate} </p>
            <p className='pt-1'><b>No. de Factura: </b> {props.invoiceNumber} </p>
          </div>
        </div>

        <div className='text-center'>
          <p> <b> ${props.amount.toLocaleString()} </b> </p>
          <Link href="">
            <a className=''>
              <PrimaryButton text="Pagar" color={"blue"} />
            </a>
          </Link>
        </div>

      </div>
    )
}

export default Invoice;
