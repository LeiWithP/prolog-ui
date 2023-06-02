"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TicketForm = ({ formData, onCreate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [consultas, setConsultas] = useState([]);
  const [costos, setCostos] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [ventanas, setVentanas] = useState([]);
  const [pinturas, setPinturas] = useState([]);
  const [climas, setClimas] = useState([]);
  const [disenos, setDisenos] = useState([]);
  const [cocinas, setCocinas] = useState([]);
  const [tamanos, setTamanos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/prolog/piso(X)")
      .then((response) => response.json())
      .then((data) => setPisos(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/prolog/ventana(X)")
      .then((response) => response.json())
      .then((data) => setVentanas(data))
      //.then(data => console.log(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/prolog/pintura(X)")
      .then((response) => response.json())
      .then((data) => setPinturas(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/prolog/clima(X)")
      .then((response) => response.json())
      .then((data) => setClimas(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/prolog/diseno(X)")
      .then((response) => response.json())
      .then((data) => setDisenos(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/prolog/cocina(X)")
      .then((response) => response.json())
      .then((data) => setCocinas(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/prolog/metros(X)")
      .then((response) => response.json())
      .then((data) => setTamanos(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/prolog/costo(X,Y)")
      .then((response) => response.json())
      .then((data) => setCostos(data))
      .catch((error) => console.error(error));
  }, [formData, reset]);

  const onSubmit = (data) => {
    console.log(costos);
    console.log(
      `http://127.0.0.1:8000/prolog/combinaciones(${data.piso},${data.ventana},${data.pintura},${data.clima},${data.diseno},${data.cocina},${data.tamano},${data.presupuesto},Total)`
    );
    fetch(
      `http://127.0.0.1:8000/prolog/combinaciones(${data.piso},${data.ventana},${data.pintura},${data.clima},${data.diseno},${data.cocina},${data.tamano},${data.presupuesto},Total)`
    )
      .then((response) => response.json())
      .then((consult) => {
        const sortedConsultas = consult.sort((a, b) => b.Total - a.Total);
        setConsultas(sortedConsultas);
        console.log(sortedConsultas);
      })
      .catch((error) => console.error(error));
  };

  const handleValueChange = (event) => {
    const selectedPiso = event.target.value;
    console.log("Selection:", selectedPiso);
  };

  return (
    <div className=" grid grid-cols-2 w-full h-full bg-green-500 overflow-hidden">
      {
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mx-auto grid grid-cols-4 gap-4 px-2 py-2 w-full h-1/2 overflow-hidden"
        >
          <div className="mb-4 col-span-2">
            <label htmlFor="presupuesto" className="block mb-1">
              Presupuesto
            </label>
            <input
              {...register("presupuesto", { required: true })}
              id="presupuesto"
              placeholder="Presupuesto"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
            />
            {errors.presupuesto && (
              <span className="text-red-500">El campo es requerido.</span>
            )}
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="piso" className="block mb-1">
              Pisos
            </label>
            <select
              {...register("piso", { required: false })}
              id="piso"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
              // onChange={handleValueChange}
            >
              <option value="F">----</option>
              {pisos.map((piso, index) => {
                const matchingCosto = costos.find(
                  (costo) => costo.X === piso.X
                );
                const costoValue = matchingCosto ? matchingCosto.Y : "";
                return (
                  <option key={index} value={piso.X}>
                    {piso.X} $ {costoValue}
                  </option>
                );
              })}
            </select>

            {errors.piso && (
              <span className="text-red-500">
                Por favor selecciona una piso.
              </span>
            )}
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="ventanas" className="block mb-1">
              Ventanas
            </label>
            <select
              {...register("ventana", { required: false })}
              id="ventanas"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
            >
              <option ventana="" value="W">
                ----
              </option>
              {ventanas.map((ventana, index) => {
                const matchingCosto = costos.find(
                  (costo) => costo.X === ventana.X
                );
                const costoValue = matchingCosto ? matchingCosto.Y : "";
                return (
                  <option key={index} value={ventana.X}>
                    {ventana.X} $ {costoValue}
                  </option>
                );
              })}
            </select>
            {errors.ventanas && (
              <span className="text-red-500">
                Por favor selecciona una ventanas.
              </span>
            )}
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="cocinas" className="block mb-1">
              Cocinas
            </label>
            <select
              {...register("cocina", { required: false })}
              id="cocinas"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
            >
              <option cocina="" value="K">
                ----
              </option>
              {cocinas.map((cocina, index) => {
                const matchingCosto = costos.find(
                  (costo) => costo.X === cocina.X
                );
                const costoValue = matchingCosto ? matchingCosto.Y : "";
                return (
                  <option key={index} value={cocina.X}>
                    {cocina.X} $ {costoValue}
                  </option>
                );
              })}
            </select>
            {errors.cocinas && (
              <span className="text-red-500">
                Por favor selecciona una opción.
              </span>
            )}
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="pintura" className="block mb-1">
              Pinturas
            </label>
            <select
              {...register("pintura", { required: false })}
              id="pintura"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
            >
              <option pintura="" value="P">
                ----
              </option>
              {pinturas.map((pintura, index) => {
                const matchingCosto = costos.find(
                  (costo) => costo.X === pintura.X
                );
                const costoValue = matchingCosto ? matchingCosto.Y : "";
                return (
                  <option key={index} value={pintura.X}>
                    {pintura.X} $ {costoValue}
                  </option>
                );
              })}
            </select>
            {errors.medio && (
              <span className="text-red-500">
                Por favor selecciona un medio de origen.
              </span>
            )}
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="clima" className="block mb-1">
              Climas Artificiales
            </label>
            <select
              {...register("clima", { required: false })}
              id="clima"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
            >
              <option clima="" value="AW">
                ----
              </option>
              {climas.map((clima, index) => {
                const matchingCosto = costos.find(
                  (costo) => costo.X === clima.X
                );
                const costoValue = matchingCosto ? matchingCosto.Y : "";
                return (
                  <option key={index} value={clima.X}>
                    {clima.X} $ {costoValue}
                  </option>
                );
              })}
            </select>
            {errors.levanta && (
              <span className="text-red-500">
                Por favor selecciona un usuario.
              </span>
            )}
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="diseno" className="block mb-1">
              Diseños
            </label>
            <select
              {...register("diseno", { required: false })}
              id="diseno"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
            >
              <option diseno="" value="D">
                ----
              </option>
              {disenos.map((diseno, index) => {
                const matchingCosto = costos.find(
                  (costo) => costo.X === diseno.X
                );
                const costoValue = matchingCosto ? matchingCosto.Y : "";
                return (
                  <option key={index} value={diseno.X}>
                    {diseno.X} $ {costoValue}
                  </option>
                );
              })}
            </select>
            {errors.diseno && (
              <span className="text-red-500">
                Por favor selecciona una diseno.
              </span>
            )}
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="tamano" className="block mb-1">
              Tamaño
            </label>
            <select
              {...register("tamano", { required: false })}
              id="tamano"
              className="border border-gray-300 rounded px-3 py-2 w-full text-emerald-950"
            >
              <option tamano="" value="M">
                ----
              </option>
              {tamanos.map((tamano, index) => {
                const matchingCosto = costos.find(
                  (costo) => costo.X === tamano.X
                );
                const costoValue = matchingCosto ? matchingCosto.Y : "";
                return (
                  <option key={index} value={tamano.X}>
                    {tamano.X} $ {costoValue}
                  </option>
                );
              })}
            </select>
            {errors.tamano && (
              <span className="text-red-500">
                Por favor selecciona una tamano.
              </span>
            )}
          </div>

          <div className="py-7">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-black rounded px-4 py-2 h-10 "
            >
              Guardar
            </button>
          </div>
        </form>
      }
      <div className="h-screen">
        <div className="h-full bg-white text-emerald-950 overflow-y-scroll">
          {consultas.length > 0 ? (
            consultas.map((consulta, index) => (
              <div key={index} className="px-5 pt-4">
                {consulta.F && <p>Piso: {consulta.F}</p>}
                {consulta.W && <p>Ventana: {consulta.W}</p>}
                {consulta.P && <p>Pintura: {consulta.P}</p>}
                {consulta.AW && <p>Clima: {consulta.AW}</p>}
                {consulta.D && <p>Diseño: {consulta.D}</p>}
                {consulta.K && <p>Cocina: {consulta.K}</p>}
                {consulta.M && <p>Terreno: {consulta.M}m2</p>}
                <p>Total: {consulta.Total}</p>
                <hr />
              </div>
            ))
          ) : (
            <div className="px-5 pt-4">
              <p>No hay resultados con ese presupuesto</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
