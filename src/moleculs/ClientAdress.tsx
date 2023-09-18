

export const ClientAdress = ({ adress } : props) => {
    const arrayAdress = adress.split("|");    
    return(
        <div>
            {
                arrayAdress.map((element, i) => {
                    const aux = element.split(":");
                    return(
                        <p key={i}><span className="font-bold">{aux[0]}</span>{":" + aux[1]}</p>
                    )
                })
            }
        </div>
    )
}
