
import useCentralContext from "../hooks/useCentralContext";
import { LogoutOutlined } from '@ant-design/icons';


function SectionMain({ header, children }) {

    const { isMobile, logout } = useCentralContext();

    const exit = async () => {
        await logout();
    };
    return (
        <div className="h-[100vh] w-[100vw] sm:w-auto overflow-x-hidden overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 pt-2 py-4 px-2">
                <div className="flex justify-between ">
                    <h2 className="inline-block  text-lg font-semibold ">
                        {header}
                    </h2>
                    {isMobile && <div
                        onClick={exit}
                        className={'text-[20px] flex items-center justify-center gap-2 text-sm cursor-pointer mr-4 text-white bg-[#1E1E2F] rounded-full w-[30px] h-[30px]  hover:text-[#FF4DAB] transition-colors duration-200 '}
                    >
                        <LogoutOutlined className='group-hover:text-[#FF4DAB] text-[20px]' />
                    </div>}
                </div>


            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default SectionMain