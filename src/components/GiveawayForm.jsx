import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//Hacer función dentro de useEffect para obtener fecha actual y no poner una anterior a esa para el sorteo

export const GiveawayForm = () => {
    const navigate = useNavigate();

    const [alert, setAlert] = useState("");

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [tickets, setTickets] = useState(0);
    const [date, setDate] = useState("");

    const handleButtonPress = async (event) => {
        event.preventDefault();

        if(brand === '' || brand.length < 2){
            setAlert("Ingresa una marca válida");
            setTimeout(() => {
                setAlert("");
            }, 4000);
            return;
        }

        if (model === "" || model.length < 2) {
            setAlert("Ingresa un modelo válido");
            setTimeout(() => {
            setAlert("");
            }, 4000);
            return;
        }

        if (year === "" || year < 1900) {
            setAlert("Ingresa un año válido");
            setTimeout(() => {
            setAlert("");
            }, 4000);
            return;
        }
        
        if (description === "" || description.length < 30) {
            setAlert("Ingresa mas información a las especificaciones");
            setTimeout(() => {
            setAlert("");
            }, 4000);
            return;
        }

        if (tickets === "" || tickets < 10000) {
            setAlert("Revisa el numero de boletos");
            setTimeout(() => {
            setAlert("");
            }, 4000);
            return;
        }
        
        if (date === "") {
            setAlert("Revisa la fecha");
            setTimeout(() => {
            setAlert("");
            }, 4000);
            return;
        }

        //Acomodar fecha al formato de México
        let fecha = date.split("-");
        fecha.reverse();
        let newDate = fecha[0] + "/" + fecha[1] + "/" + fecha[2];

        try {
            const { data } = await axios.post("http://localhost:3000/api/giveaway/", {
              brand,
              model,
              year,
              description,
              tickets,
              date: newDate,
            });

            navigate("/giveaway/id=" + data.id);

        } catch (error) {
            console.log(error);
        }
    };

  return (
    <form className="flex-1 flex-col">
        <p className="mt-6 text-xl font-semibold">Datos del vehículo</p>

        <div className="flex">
            <div className="flex flex-col mt-4 flex-1 mr-6">
                <label>Marca del vehículo: </label>
                <input value={brand} onChange={({target}) => setBrand(target.value)} type="text" placeholder="Nissan, Porsche, BMW, Ford..." className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"/>
            </div>
            <div className="flex flex-col mt-4 flex-1 mr-6">
                <label>Modelo: </label>
                <input value={model} onChange={({target}) => setModel(target.value)} type="text" placeholder="370z, Cayman, M4, Mustang..." className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"/>
            </div>
            <div className="flex flex-col mt-4 flex-1 mr-6">
                <label>Año: </label>
                <input value={year} onChange={({target}) => setYear(target.value)} type="text" placeholder="2019, 2020, 2021..." className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"/>
            </div>
        </div>

        <div className="flex">
            <div className="flex flex-col mt-4 flex-1 mr-6">
                <label>Especificaciones del vehículo: </label>
                <textarea value={description} onChange={({target}) => setDescription(target.value)} rows={7} type="text" placeholder="Motor, cilindraje, transmisión..." className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"/>
            </div>
        </div>

        <div className="flex-col mt-6">
            <label className="block mb-2" htmlFor="file_input">Imagenes del vehículo: </label>
            <input className="block w-full border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" multiple/>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF.</p>
        </div>

        <p className="mt-6 text-xl font-semibold">Datos del sorteo</p>
        <div className="flex-col mt-6">
            <label className="block mb-2" htmlFor="file_input">Numero de boletos: </label>
            <input value={tickets} onChange={({target}) => setTickets(target.value)} type="number" className="px-4 py-1.5 border-2 rounded-md mt-2" />
        </div>

        <div className="flex-col mt-6">
            <label className="block mb-2" htmlFor="file_input">Fecha de sorteo: </label>
            <input value={date} onChange={({target}) => setDate(target.value)} type="date" className="px-4 py-1.5 border-2 rounded-md mt-2" />
        </div>
        <div className="mt-8">
            <p className="my-4 text-red-500">{ alert }</p>
            <button type="submit" onClick={(event) => handleButtonPress(event)} className="bg-green-500 py-2 px-5 text-white font-medium rounded-md hover:bg-green-600 hover:font-bold">Guardar</button>
        </div>
    </form>
  )
}
