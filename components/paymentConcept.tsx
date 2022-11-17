import Link from "next/link";
import PrimaryButton from "./buttons/primary";

type invoice = {
  concept: string,
  paymentDate: string,
  invoiceNumber: string,
  amount: number
  state: number | null | undefined;
  isConcept: boolean;
  effectiveDate: string | null;
}

const Invoice = (props: invoice) => {
  const paymentDate = new Date(props.paymentDate);

  const getState = () => {
    if (props.state === 1) {
      return "Exitoso";
    } else if (props.effectiveDate === undefined) {
      return "Pendiente";
    } else {
      return "Fallido";
    }
  }

  const getColor = () => {
    if (props.state === 1) {
      return "green";
    } else if (props.effectiveDate === undefined) {
      return "yellow";
    } else {
      return "red";
    }
  }

  return (
    <div className='shadow-lg border-gray-300 border p-8 mx-auto my-12 flex justify-between rounded w-6/12'>
      <div>
        <div className='flex'>
          <p> <b>Concepto: </b> {props.concept} </p>
        </div>
        <div >
          <p className='pt-3'><b>Fecha de Pago: </b> {paymentDate.toLocaleDateString()} </p>
          <p className='pt-1'><b>No. de Factura: </b> {props.invoiceNumber} </p>
        </div>
      </div>

      <div className='text-center'>
        {
          props.isConcept ?
            <>
              <p> <b> ${props.amount.toLocaleString()} </b> </p>
              <Link href="">
                <a className=''>
                  <PrimaryButton text="Pagar" color={"blue"} />
                </a>
              </Link>
            </>
            :
            <>
              <p className={`text-${getColor()}-500`}> <b> {getState()} </b> </p>
              <p> <b> ${props.amount.toLocaleString()} </b> </p>
            </>
          }
      </div>

    </div>
  )
}

export default Invoice;
