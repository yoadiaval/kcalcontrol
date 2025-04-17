function SectionMain({ header, children }) {
    return (
        <div className="p-[20px] ">
            <div>
                <h2 className="inline-block border-b-4 border-b-blue-300 ">{header}</h2>
                <hr className="w-[100%] border-gray-200" />
            </div>
            <div >
                {children}
            </div>
        </div>
    )
}

export default SectionMain