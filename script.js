const fs = require('fs');
let filenames = fs.readdirSync("./books"); 
let toc = [];

function subheading(line) {
    return line.match(/<b>/); 
}
function mapper(o, fileName) {
    let output = [];
    let outText = `${fileName}\n`;
    o.forEach((entries, key) => {
        if (Array.isArray(entries)) {
            let headings = entries.filter(subheading)
                                  .map(line => 
                                    line.trim()
                                        .substring(line.lastIndexOf('<b>')+3, line.length - 4));
            output[key] = headings;
            outText += `${key}: \n`;
            headings.forEach(h => {
                outText += `-${h} \n`;
            });
        }
        else {
            let sub = mapper(new Map(Object.entries(entries)));
            output[key] = sub[0];
            outText += `${key}: \n`;
            outText += `${sub[1]} \n`;
        }
        outText += '\n';
    });
    return [output, outText];
}
  
filenames.forEach((file) => { 
    let sefer = require(`./books/${file}`);
    let vol = file.substring(0, 4);
    const seferMap = new Map(Object.entries(sefer.text));
    toc = mapper(seferMap, vol);
    fs.writeFile(`./tocs/${vol}-toc.txt`, toc, function (err) {
        if (err) throw err;
})});