type Props = {
    campus: string,
    numInstallments: any,
    cardNumber: string,
    cvv: string,
    expMonth: string,
    expYear: string,
}

const StepConfirm = ({ campus, numInstallments, cardNumber, cvv, expMonth, expYear }: Props) => {

    const prettifyCardNumber = (cardNumber: string) => {
        return cardNumber.replace(/(.{4})/g, '$1 ').trim();
    }
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4">
                <label className="my-auto">Tarjeta Nro.</label>
                <input className="py-1 px-2" type="text" readOnly value={prettifyCardNumber(cardNumber)} />
            </div>
            <div className="flex gap-4">
                <label className="my-auto">Sede</label>
                <input className="py-1 px-2" type="text" readOnly value={campus} />
            </div>
            {numInstallments === null ?
                <div className="flex gap-4">
                    <label className="my-auto">Tipo de pago</label>
                    <input className="py-1 px-2" type="text" readOnly value="Pago único" />
                </div>
                : numInstallments === undefined || numInstallments === '' ?
                    <div className="flex gap-4">
                        <label className="my-auto">Número de cuotas</label>
                        <input className="py-1 px-2" type="text" readOnly value='No seleccionado' />
                    </div>
                    :
                    <div className="flex gap-4">
                        <label className="my-auto">Número de cuotas</label>
                        <input className="py-1 px-2" type="text" readOnly value={numInstallments} />
                    </div>
            }
            <div className="flex gap-4">
                <label className="my-auto">CVV</label>
                <input className="py-1 px-2" type="text" readOnly value={cvv ? '***' : 'No ingresado'} />
            </div>
            <div className="flex gap-4">
                <label className="my-auto">Fecha de expiración</label>
                <input className="py-1 px-2" type="text" readOnly value={expMonth && expYear ? '** / ****' : 'No ingresado'} />
            </div>
        </div>
    );
}

export default StepConfirm;
