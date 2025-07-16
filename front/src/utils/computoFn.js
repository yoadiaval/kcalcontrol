
//distinct --> factor distintivo entre hombre y mujer
// data --> datos de la persona (peso, altura, edad, grasa corporal)

const bmrCompute = (distinct, data) => {
    let bmr = 0;
    if (data.bodyFat !== '') {

        /*Se tiene en cuenta la grasa corporal, ecuacion: Katch-McArdle */
        const masaMagra = parseFloat(data.peso) * (1 - parseFloat(data.bodyFat) / 100);
        console.log('masa magra ' + masaMagra)
        bmr = 370 + (21.6 * masaMagra);
        console.log('bmr ' + bmr)
    } else {
        /* ecuación: Mifflin-St Jeor */
        bmr = 10 * parseFloat(data.peso) +
            6.25 * parseFloat(data.altura) -
            5 * parseFloat(data.edad) +
            distinct;
    }
    return bmr;
};

const tdeeCompute = (bmr, actividad) => {
    let tdee = 0;
    switch (actividad) {
        case "1":
            tdee = bmr * 1.2;
            break;
        case "2":
            tdee = bmr * 1.375;
            break;
        case "3":
            tdee = bmr * 1.55;
            break;
        case "4":
            tdee = bmr * 1.725;
            break;
        case "5":
            tdee = bmr * 1.9;
            break;
        default:
            break;
    }
    return tdee;
};


const goalAdjustCompute = (gastoEnergTot, objetivo) => {
    let goalAdjust = 0;
    switch (objetivo) {
        case "1":
            goalAdjust = gastoEnergTot + 0.15 * gastoEnergTot;
            break;
        case "2":
            goalAdjust = gastoEnergTot;

            break;
        case "3":
            goalAdjust = gastoEnergTot - 0.15 * gastoEnergTot;

            break;

        default:
            break;
    }
    return goalAdjust;
};



export { bmrCompute, tdeeCompute, goalAdjustCompute };