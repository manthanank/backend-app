require('dotenv').config();
const { Client } = require('@notionhq/client');
const logger = require('../logger');

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

module.exports = {
  getNotes: async function () {
    const payload = {
      path: `databases/${database_id}/query`,
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
    const payload = {
      path: 'pages',
      method: 'POST',
      body: {
        parent: { database_id: database_id },
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
      logger.error('Error creating note:', error.body);
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
      logger.error(`Failed to retrieve note with ID ${id}:`, error);
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
      logger.error(`Failed to update note with ID ${id}:`, error);
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
      logger.error(`Failed to delete note with ID ${id}:`, error);
      throw error;
    }
  },
};
