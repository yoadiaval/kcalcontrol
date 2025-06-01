import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // estilos base
import "react-date-range/dist/theme/default.css"; // tema por defecto
import Button from './button'

export default function DateRangeComponent({ onChange }) {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    const handleRange = () => {
        onChange(range)
    }

    return (
        <div className="w-[fit-content]">
            <div className=' border border-neutral-200 max-w-[fit-content] h-[100%] flex flex-col justify-center items-center  sm:p-[1rem] rounded '>
                <p className="mb-4 font-bold">Seleccione un rango de fechas</p>
                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                />
                <div className="mt-4">
                    <p>
                        <span>Desde:</span> {range[0].startDate.toLocaleDateString()}
                    </p>
                    <p>
                        <span>Hasta:</span> {range[0].endDate.toLocaleDateString()}
                    </p>
                </div>
            </div>
            <Button className='w-[100%] my-[1rem]' onClick={handleRange} >Enviar</Button>
        </div>
    );
}