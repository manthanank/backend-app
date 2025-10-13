require('dotenv').config();
const { Client } = require('@notionhq/client');

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2025-09-03',
});

const database_id = process.env.NOTION_DATABASE_ID;

// Cache for data source ID to avoid repeated API calls
let dataSourceId = null;

// Function to get data source ID from database ID
async function getDataSourceId() {
  if (dataSourceId) {
    return dataSourceId;
  }

  try {
    const response = await notion.databases.retrieve({
      database_id: database_id,
    });
    
    if (response.data_sources && response.data_sources.length > 0) {
      dataSourceId = response.data_sources[0].id;
      return dataSourceId;
    } else {
      throw new Error('No data sources found for database');
    }
  } catch (error) {
    console.error('Failed to fetch data source ID:', error);
    throw error;
  }
}

module.exports = {
  getNotes: async function () {
    const sourceId = await getDataSourceId();
    const payload = {
      path: `data_sources/${sourceId}/query`,
      method: 'POST',
    };

    const { results } = await notion.request(payload);

    const notes = results.map((page) => {
      return {
        id: page.id,
        note: page.properties.Note.title[0].text.content,
        date: page.properties.Date.date.start,
      };
    });

    return notes;
  },
  createNote: async function (note) {
    const currentDate = new Date().toISOString();
    const sourceId = await getDataSourceId();
    const payload = {
      path: 'pages',
      method: 'POST',
      body: {
        parent: { 
          type: 'data_source_id',
          data_source_id: sourceId 
        },
        properties: {
          Note: {
            title: [
              {
                text: {
                  content: note,
                },
              },
            ],
          },
          Date: {
            date: {
              start: currentDate,
            },
          },
        },
      },
    };

    try {
      const response = await notion.request(payload);
      return {
        id: response.id,
        note: note,
      };
    } catch (error) {
      console.error('Error creating note:', error.body);
      throw error;
    }
  },
  getNote: async function (id) {
    try {
      const response = await notion.pages.retrieve({ page_id: id });
      const note = {
        id: response.id,
        note: response.properties.Note.title[0].text.content,
        date: response.properties.Date.date.start,
      };
      return note;
    } catch (error) {
      console.error(`Failed to retrieve note with ID ${id}: ${error}`);
      throw error;
    }
  },
  updateNote: async function (id, note) {
    const currentDate = new Date().toISOString();
    try {
      const response = await notion.pages.update({
        page_id: id,
        properties: {
          Note: {
            title: [
              {
                text: {
                  content: note,
                },
              },
            ],
          },
          Date: {
            date: {
              start: currentDate,
            },
          },
        },
      });
      return response;
    } catch (error) {
      console.error(`Failed to update note with ID ${id}: ${error}`);
      throw error;
    }
  },
  deleteNote: async function (id) {
    try {
      const response = await notion.pages.update({
        page_id: id,
        archived: true, // This marks the page as deleted (archived) in Notion
      });
      return response;
    } catch (error) {
      console.error(`Failed to delete note with ID ${id}: ${error}`);
      throw error;
    }
  },
};
