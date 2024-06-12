import { Avatar } from "native-base";

import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "../../../styles/style.css";
import { epochToDate } from "../../../utils/epochToDate";
import { truncateString } from "../../../utils/trancare-string";
export const VerticleTimelineElement = ({ data }: { data: any }) => {
  const date = epochToDate(data.date.toString());
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work timeline-card"
      date={date}
      dateClassName="date-class"
      contentStyle={{
        background: "white",
        color: "#000",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
      contentArrowStyle={{ borderRight: "7px solid" }}
      iconStyle={{
        background: "rgb(109, 40, 217)",
        color: "#fff",
        borderColor: "black",
      }}
      icon={
        <Avatar
          size={10}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU",
          }}
        ></Avatar>
      }
    >
      <h3 className="vertical-timeline-element-title">{data.name}</h3>
      <h4 className="vertical-timeline-element-subtitle">{data.type}</h4>
      <p>email: {data.email}</p>
      <a className="link" style={{ color: "black" }} href="#">
        #{truncateString(data.id_)}
      </a>
    </VerticalTimelineElement>
  );
};
