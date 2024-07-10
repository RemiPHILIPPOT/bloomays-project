import React, { useEffect, useState } from "react";
import "./LeavingArrivingBloomers.css";

const LeavingArrivingBloomers = () => {
    const [arriving, setArriving] = useState({});
    const [leaving, setLeaving] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/missions");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const missions = await response.json();

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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="modal-bloomers">
            <button onClick={toggleModal} className="open-modal-button">
                Open Bloomers Info
            </button>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button
                            onClick={toggleModal}
                            className="close-modal-button"
                        >
                            &times;
                        </button>
                        <div className="bloomers-container">
                            <div className="bloomers-section">
                                <h2 className="bloomers-title arriving">
                                    Bloomers Entrants
                                </h2>
                                {Object.keys(arriving).map((date) => (
                                    <div
                                        key={date}
                                        className="bloomers-date-group"
                                    >
                                        <h3 className="bloomers-date">
                                            {date}
                                        </h3>
                                        <ul className="bloomers-list">
                                            {arriving[date].map((bloomer) => (
                                                <li
                                                    key={bloomer.id}
                                                    className="bloomer-item"
                                                >
                                                    {bloomer.firstname}{" "}
                                                    {bloomer.lastname}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="bloomers-section">
                                <h2 className="bloomers-title leaving">
                                    Bloomers Sortants
                                </h2>
                                {Object.keys(leaving).map((date) => (
                                    <div
                                        key={date}
                                        className="bloomers-date-group"
                                    >
                                        <h3 className="bloomers-date">
                                            {date}
                                        </h3>
                                        <ul className="bloomers-list">
                                            {leaving[date].map((bloomer) => (
                                                <li
                                                    key={bloomer.id}
                                                    className="bloomer-item"
                                                >
                                                    {bloomer.firstname}{" "}
                                                    {bloomer.lastname}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeavingArrivingBloomers;
