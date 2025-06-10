
import fatImg from '../assets/fat.png'

function InfoText(props) {

    const info = {
        proteinInfo: 'Se recomienda consumir entre <strong>1.6 y 2.2 gramos</strong> por kilogramo de peso corporal al día para <strong>deportes de fuerza</strong>, y entre <strong>1.2 y 1.6 gramos</strong> por kilogramo de peso corporal al día para <strong>deportes de resistencia</strong>.',
        fatInfo: 'Se recomienda consumir entre <strong>1 y 1.5 gramos </strong> por kilogramo de peso corporal al día.',
        carbInfo: 'Para deportistas de resistencia, se sugieren entre 6 y 10 gramos por kilogramo de peso corporal al día, mientras que para deportes de fuerza, la recomendación es entre 4 y 7 gramos por kilogramo de peso corporal al día.</br> <strong>***Este valor se ajusta a partir de los datos indicados de proteinas y grasas</strong>',
        bodyFatInfo: `<img src=${fatImg} alt="Fat" />`
    }

    return <>
        <div className="max-w-[700px]" dangerouslySetInnerHTML={{ __html: info[props.infoType] }} />
    </>
}

export default InfoText;