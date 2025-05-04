import logo from '../assets/logo-dark.png'
function AnimationLanding(){

    const texto = " · CONTROLAR LO QUE COMES · TE ACERCA A TU OBJETIVO"
    const length = texto.length;
    const degree = 360/length;

    return(
        <div className="relative">
            <div className="w-[500px] h-[500px] bg-blue-100  rounded-full absolute " >
                <div className="w-[100px] h-[100px] bottom-[50px] bg-blue-400 absolute rounded-full"></div>
            </div>
           
        <div className="spinning-text-wrapper">
            <div className="spining-text">
                <p>{texto.split("").map((letra,i)=>(
                    <span key={i} style={{transform:`rotate(${degree*i}deg)`}}>
                       {letra}
                    </span>
                ))}</p>

            </div>
            <div className='circle-container'>
                <div className="orbit"><div className="small-circle bg-[#51A2FF]"></div></div>
                <div className="orbit"><div className="small-circle bg-blue-700"></div></div>
                <div className="orbit"><div className="small-circle bg-[#66BE72]"></div></div>
                <div className="orbit"><div className="small-circle bg-[#FFC64D]"></div></div>
                <div className="orbit"><div className="small-circle bg-[#C10007]"></div></div>
            </div>
            <img src={logo} className='w-[65%]'/>
        </div>
        </div>
    )
}

export default AnimationLanding;