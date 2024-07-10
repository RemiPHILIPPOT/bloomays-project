const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;

app.get("/missions", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Missions`,
            {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
                },
            }
        );

        const missions = response.data.records.map((record) => ({
            id: record.id,
            label: record.fields.Label,
            beginDate: record.fields.BeginDate,
            endDate: record.fields.EndDate,
            missionType: record.fields.MissionType,
            freelance: {
                id: record.fields.FreelanceId,
                firstname: record.fields.Firstname,
                lastname: record.fields.Lastname,
                email: record.fields.Email,
            },
        }));

        res.json(missions);
    } catch (error) {
        console.error("Error fetching missions:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
