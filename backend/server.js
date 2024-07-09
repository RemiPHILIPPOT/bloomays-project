const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const missions = [
    {
        id: "1",
        label: "Mission 1",
        beginDate: "2024-07-01",
        endDate: "2024-12-01",
        missionType: "Type A",
        freelance: {
            id: "1",
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
        },
    },
    {
        id: "2",
        label: "Mission 2",
        beginDate: "2024-08-01",
        endDate: "2024-11-01",
        missionType: "Type B",
        freelance: {
            id: "2",
            firstname: "Jane",
            lastname: "Smith",
            email: "jane.smith@example.com",
        },
    },
];

app.get("/missions", (req, res) => {
    res.json(missions);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
