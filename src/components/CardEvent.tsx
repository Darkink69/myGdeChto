import { observer } from "mobx-react-lite";

const CardEvent = observer(({ data }: any) => {
  // type Data = {
  //   name: string;
  //   body: string;
  //   userId: number;
  //   id: number;
  // };

  return (
    <>
      <div>
        <h1 className="font-sans text-xl text-gray-500">
          {data.attributes.name}
        </h1>
        {/* <p>{data.objectId}</p> */}
        <p className="text-sm">{data.attributes.description}</p>
        <img src={data.attributes.img} alt="" />
        <p>{data.attributes.note}</p>
        <p>{data.attributes.text_date}</p>
        <p>{data.attributes.text_time}</p>
        <h1>{data.attributes.address}</h1>
        <h1>{data.attributes.place}</h1>
        <p>{data.attributes.approve}</p>
      </div>
    </>
  );
});

export default CardEvent;
