const mongoose = require('mongoose');

const Uses = mongoose.model('uses', {
    laptop: { type: String },
    desktop: { type: String },
    keyboard: { type: String },
    mouse: { type: String },
    mobile: { type: String },
    tablet: { type: String },
    smartwatch: { type: String },
    watch: { type: String },
    earbuds: { type: String },
    headphones: { type: Array },
    neckband: { type: String },
    smartbulb: { type: String },
    framework: { type: String },
    editor: { type: String },
    os: { type: String },
    browser: { type: Array },
    searchengine: { type: String },
    mail: { type: String },
    cloud: { type: String },
    notes: { type: Array },
    database: { type: Array },
    hosting: { type: Array },
    frontend: { type: Array },
    backend: { type: Array },
    api: { type: Array },
    vcs: { type: String },
    ci: { type: String },
    design: { type: String },
    video: { type: String },
    audio: { type: String },
    social: { type: Array },
    ecommerce: { type: Array },
    food: { type: Array },
    travel: { type: Array },
    bank: { type: Array }
});

module.exports = Uses;

module.exports = Uses;