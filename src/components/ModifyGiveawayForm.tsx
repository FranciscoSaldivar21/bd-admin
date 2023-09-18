import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore";
import { apiURL } from "../api/config";

//Hacer función dentro de useEffect para obtener fecha actual y no poner una anterior a esa para el sorteo

export const ModifyGiveawayForm = ({id} : props) => {
  const navigate = useNavigate();
  const token = userStore((state) => state.token);
  const reset = userStore((state) => state.reset);

  const [textAlert, setAlert] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleButtonPress = async (event) => {
    event.preventDefault();

    if (images.length <= 0) {
      setAlert("Sube por lo menos una imagen");
      setTimeout(() => {
        setAlert("");
      }, 4000);
      return;
    }

    if (brand === "" || brand.length < 2) {
      setAlert("Ingresa una marca válida");
      setTimeout(() => {
        setAlert("");
      }, 4000);
      return;
    }

    if (ticketPrice === "" || ticketPrice <= 0) {
      setAlert("Ingresa un precio por boleto válido");
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

    //Colocar código aqui para guardar todos los atributos
    const form = new FormData();
    for (let i = 0; i < images.length; i++) {
      form.append("images", images[i]);
    }
    form.append("brand", brand);
    form.append("model", model);
    form.append("description", description);
    form.append("year", year);
    form.append("date", newDate);
    form.append("ticketPrice", ticketPrice);

    try {
      const { data } = await axios.put(
        `${apiURL}giveaway/${id}`,
        form,
        {
          headers: {
            "Content-type": "multipart/form-data",
            "x-token": token,
          },
        }
      );
      navigate(0);
    } catch (error) {
      const ok = error.response.data.ok;
      if(!ok){
        alert("Tu sesión ha expirado, inicia sesión de nuevo");
        reset();
      }
    }
  };

  return (
    <form className="flex-1 flex-col">
      <p className="mt-6 text-3xl font-semibold">Editar vehiculo</p>
      <p className="mt-6 text-xl font-semibold">Datos del vehículo</p>

      <div className="flex">
        <div className="flex flex-col mt-4 flex-1 mr-6">
          <label>Marca del vehículo: </label>
          <input
            value={brand}
            onChange={({ target }) => setBrand(target.value)}
            type="text"
            placeholder="Nissan, Porsche, BMW, Ford..."
            className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"
          />
        </div>
        <div className="flex flex-col mt-4 flex-1 mr-6">
          <label>Modelo: </label>
          <input
            value={model}
            onChange={({ target }) => setModel(target.value)}
            type="text"
            placeholder="370z, Cayman, M4, Mustang..."
            className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"
          />
        </div>
        <div className="flex flex-col mt-4 flex-1 mr-6">
          <label>Año: </label>
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
            type="text"
            placeholder="2019, 2020, 2021..."
            className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"
          />
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col mt-4 flex-1 mr-6">
          <label>Especificaciones del vehículo: </label>
          <textarea
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            rows={7}
            type="text"
            placeholder="Motor, cilindraje, transmisión..."
            className="px-4 py-1.5 border-2 rounded-md mt-2 w-full"
          />
        </div>
      </div>

      <div className="flex-col mt-6">
        <label className="block mb-2" htmlFor="file_input">
          Imagenes del vehículo:{" "}
        </label>
        <input
          className="block w-full border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={({ target }) => setImages(target.files)}
          multiple
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, WEBP, PNG, JPG or GIF.
        </p>
      </div>

      <p className="mt-6 text-xl font-semibold">Datos del sorteo</p>

      <div className="flex-col mt-6">
        <label className="block mb-2" htmlFor="file_input">
          Fecha de sorteo:{" "}
        </label>
        <input
          value={date}
          onChange={({ target }) => setDate(target.value)}
          type="date"
          className="px-4 py-1.5 border-2 rounded-md mt-2"
        />
      </div>
      <div className="flex-col mt-6">
        <label className="block mb-2" htmlFor="file_input">
          Precio por boleto
        </label>
        <input
          value={ticketPrice}
          onChange={({ target }) => setTicketPrice(target.value)}
          type="number"
          className="px-4 py-1.5 border-2 rounded-md mt-2"
        />
      </div>
      <div className="mt-8">
        <p className="my-4 text-red-500">{textAlert}</p>
        <button
          type="submit"
          onClick={(event) => handleButtonPress(event)}
          className="bg-green-500 py-2 px-5 text-white font-medium rounded-md hover:bg-green-600 hover:font-bold w-32"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
