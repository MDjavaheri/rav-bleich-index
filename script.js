const sefer = require('./vol1.json');
cosnt fs = require('fs');
const seferMap = new Map(Object.entries(sefer.text));
let toc = [];

function subheading(line) {
    return line.match(/<b>/); 
}
function mapper(o) {
    let output = [];
    o.forEach((entries, key) => {
        if (Array.isArray(entries)) {
            let headings = entries.filter(subheading)
                                  .map(line => line.trim().substring(line.lastIndexOf('<b>')+3, line.length - 4));
            output[key] = headings;
        }
        else {
            let sub = mapper(new Map(Object.entries(entries)));
            output[key] = sub;
        }
    });
    return output;
}
toc = mapper(seferMap);


