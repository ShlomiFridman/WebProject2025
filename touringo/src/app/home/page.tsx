import EventTable from "@/components/EventTable";
import { TR_Event } from "@/utils/classes";
import { eventExamples } from "@/utils/examplesData";


const events = eventExamples as TR_Event[];


const page = () => {
  return (
      <div className="max-w-[1000px] my-4">
        <div className="text-3xl text-green-600 font-bold pb-4">Welcome to TouRingo!</div>
        <div className="AttractionsTitle">Attractions</div>
        <div>
        <EventTable events={events} />
        </div>

      </div>
  );
};

export default page;

