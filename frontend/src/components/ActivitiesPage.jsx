import { useEffect, useState } from "react";
import Activity from "./Activity";

const { VITE_API_URL } = import.meta.env;

function ActivitiesPage() {
  const [activities, setActivities] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          const errorMessage = await response.text();
          setError({
            title: "Problems with backend",
            message: errorMessage || "Invalid email or password.",
          });
          return;
        }

        console.log(data);
        setActivities(data);
      } catch (error) {
        console.log(error);
        setError({
          title: "Server Unreachable",
          message: "Failed to add user, please try again later.",
        });
        return;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden">
      <div className="flex flex-col items-center bg-lightbrown w-dvw mb-10 m-30 rounded-lg max-w-430">
        <div className="bg-darkbrown p-8 text-center rounded-b-lg">
          <h1 className="h1 text-4xl font-bold text-lightbrown">Activities</h1>
          {/* <p className="text-lg mb-8">Explore our exciting activities!</p> */}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 overflow-y-auto h-[60lvh]">
          {activities &&
            activities.map((activ) => (
              <Activity key={activ.id} isPinned={true} activity={activ} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;
