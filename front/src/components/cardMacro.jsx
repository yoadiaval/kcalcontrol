function CardMacro({ content, color }) {
  return (
    <div
      className="rounded flex justify-end w-[100%] max-w-[400px]"
      style={{ backgroundColor: color }}
    >
      <div
        className="w-[97%] bg-white rounded border flex items-center justify-between p-[10px]"
        style={{ borderColor: color }}
      >
        <div className="flex gap-2 ">
          <p>{content.macro}</p>
          <p>{content.value}</p>
        </div>
        <div
          className="w-[20px] h-[20px] rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

export default CardMacro