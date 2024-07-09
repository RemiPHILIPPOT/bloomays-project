import React, { useEffect, useState } from "react";
import axios from "axios";

const LeavingArrivingBloomers = () => {
    const [arriving, setArriving] = useState({});
    const [leaving, setLeaving] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/missions"
                );
                const missions = response.data;

                const today = new Date();
                const endOfNextMonth = new Date(
                    today.getFullYear(),
                    today.getMonth() + 2,
                    0
                );

                const arrivingBloomers = {};
                const leavingBloomers = {};

                missions.forEach((mission) => {
                    const beginDate = new Date(mission.beginDate);
                    const endDate = new Date(mission.endDate);

                    if (beginDate >= today && beginDate <= endOfNextMonth) {
                        const dateStr = beginDate.toISOString().split("T")[0];
                        if (!arrivingBloomers[dateStr]) {
                            arrivingBloomers[dateStr] = [];
                        }
                        arrivingBloomers[dateStr].push({
                            firstname: mission.freelance.firstname,
                            lastname: mission.freelance.lastname,
                            beginMission: mission.beginDate,
                            endMission: mission.endDate,
                            id: mission.id,
                        });
                    }

                    if (endDate >= today && endDate <= endOfNextMonth) {
                        const dateStr = endDate.toISOString().split("T")[0];
                        if (!leavingBloomers[dateStr]) {
                            leavingBloomers[dateStr] = [];
                        }
                        leavingBloomers[dateStr].push({
                            firstname: mission.freelance.firstname,
                            lastname: mission.freelance.lastname,
                            beginMission: mission.beginDate,
                            endMission: mission.endDate,
                            id: mission.id,
                        });
                    }
                });

                setArriving(arrivingBloomers);
                setLeaving(leavingBloomers);
            } catch (error) {
                console.error("Error fetching missions:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Bloomers Entrant</h2>
            {Object.keys(arriving).map((date) => (
                <div key={date}>
                    <h3>{date}</h3>
                    <ul>
                        {arriving[date].map((bloomer) => (
                            <li key={bloomer.id}>
                                {bloomer.firstname} {bloomer.lastname} (Début:{" "}
                                {bloomer.beginMission}, Fin:{" "}
                                {bloomer.endMission})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <h2>Bloomers Sortant</h2>
            {Object.keys(leaving).map((date) => (
                <div key={date}>
                    <h3>{date}</h3>
                    <ul>
                        {leaving[date].map((bloomer) => (
                            <li key={bloomer.id}>
                                {bloomer.firstname} {bloomer.lastname} (Début:{" "}
                                {bloomer.beginMission}, Fin:{" "}
                                {bloomer.endMission})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default LeavingArrivingBloomers;
