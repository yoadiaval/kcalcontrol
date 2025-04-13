function CardFood(){
    return (<div className="w-[230px] bg-[#F6F6F6] rounded p-[10px]">
        <h3>Patatas fritas</h3>
        <hr className="w-[100%] border-neutral-200" />
        <p>Datos (para 100g)</p>
        <div className="flex justify-between">
            <div className="flex items-center gap-[5px]">
                <div className="w-[10px] h-[10px] rounded-full bg-[#51a2ff]"></div>
                <p>Proteínas</p>
            </div>
            <p>200g</p>
        </div>
        <div className="flex justify-between">
            <div className="flex items-center gap-[5px]">
                <div className="w-[10px] h-[10px] rounded-full bg-[#66be72]"></div>
                <p>Carbohidratos</p>
            </div>
            <p>200g</p>
        </div>
        <div className="flex justify-between">
            <div className="flex items-center gap-[5px]">
                <div className="w-[10px] h-[10px] rounded-full bg-[#ffc64d]"></div>
                <p>Grasas</p>
            </div>
            <p>200g</p>
        </div>
        <hr className="border-neutral-200 " />
        <div className="flex justify-between py-[10px]">
            <p>cantidad(g)</p>
            <input type="number" min={0} className="border border-neutral-200 w-[80px] bg-white rounded" />
        </div>
        <hr className="w-[100%] border-neutral-200" />
        <div className="flex justify-between py-[10px]">
            <p>Total calorias</p>
            <p>280 Kcal</p>
        </div>

    </div>)
}

export default CardFood;