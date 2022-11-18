import Link from "next/link";
import PrimaryButton from "../buttons/primary";

import PayConeptPerson from "../../domain/payConceptPersons";
import { useState } from "react";

const InfoCard = (props: PayConeptPerson) => {
  const { amount, pay_before, payment_concept, ref_number } = props;
  const [completed] = useState(props.completed);

  return (
    <div className='shadow-lg border-gray-300 border p-8 mx-auto my-12 flex justify-between rounded w-6/12'>
      <div>
        <div className='flex'>
          <p> <b>Concepto: </b> {payment_concept} </p>
        </div>
        <div >
          <p className='pt-3'><b>Fecha Límite de Pago: </b> {new Date(pay_before).toLocaleDateString()} </p>
          <p className='pt-1'><b>No. de Factura: </b> {ref_number} </p>
        </div>
      </div>

      <div className='text-center'>
        {
          completed ?
            <>
              <p className={`text-green-500`}> <b> Exitoso </b> </p>
              <p> <b> ${amount} </b> </p>
            </>
            :
            <>
              <p> <b> ${amount} </b> </p>
              <Link href="">
                <a className=''>
                  <PrimaryButton text="Pagar" color={"blue"} />
                </a>
              </Link>
            </>
        }
      </div>
    </div>
  );
}

export default InfoCard;
