import Link from "next/link";
import { useEffect, useState } from "react";
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

const InfoCard = (props: invoice) => {
  const paymentDate = new Date(props.paymentDate);
  const [color, setColor] = useState('yellow');
  const [state, setState] = useState('Pendiente');

  useEffect(() => {
    if (props.state === 1) {
      setColor('green');
      setState('Exitoso');	
    } else if (props.effectiveDate === undefined) {
      setColor("yellow");
      setState("Pendiente");
    } else {
      setColor("red");
      setState("Fallido");
    }
  }, [])

  return (
    <div style={{ maxWidth: '650px'}}
    className='shadow-lg border-gray-300 border p-8 mx-auto my-12 flex justify-between rounded w-6/12'>
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
              <Link href={{
                pathname: '/orderResume', query: {
                  concept: props.concept,
                  invoiceNumber: props.invoiceNumber,
                  amount: props.amount
                }
              }}>
                <a className=''>
                  <PrimaryButton text="Pagar" color={"blue"} />
                </a>
              </Link>
            </>
            :
            <>
              <p className={`text-${color}-500`}> <b> {state} </b> </p>
              <p> <b> ${props.amount.toLocaleString()} </b> </p>
            </>
        }
      </div>

    </div>
  )
}

export default InfoCard;
