import "./list.scss";
import { listData } from "../../lib/dummyData";
import Card from "../Card/Card";
function List() {
  return (
    <div className="list">
      {listData.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
}

export default List;
