import useFetch from "../../hooks/useFetch";
import "./courseList.css";

const CourseList = () => {
  const data = [
    { type: "Design", count: 10 },
    { type: "Development", count: 15 },
    { type: "Marketing", count: 8 },
    { type: "IT&Software", count: 20 },
    { type: "Music", count: 5 },
  ];

  const images = [
    "https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg",
"https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg",
    "https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg",
"https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg",
"https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg"
];
  return (
    <div className="pList">
     
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
    </div>
  );
};

export default CourseList;