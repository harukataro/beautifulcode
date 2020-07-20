const https = require('https');
const fs = require('fs');

const user = 'harukax';
const URL = `https://qiita.com/api/v2/users/${user}/items`;

const fetchItems = () => new Promise((resolve, reject) => {
  https
    .get(URL, (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch {
          reject(e);
        }
      });
    })
    .on('error', (e) => reject(e));
});

const main = async () => {
  const items = await fetchItems();
  items.forEach((item) => {
    const {
      title, tags, body, createdAt
    } = item;
    console.log(title);
    const content = [
      '---',
      `title: ${title}`,
      `date: ${createdAt.split('T')[0]}`,
      `tags: [${tags.map((tag) => `'${tag.name}'`).join(',')}]`,
      '---',
      '',
      body,
    ].join('\n');

    fs.writeFile(
      `../../content/posts/${createdAt}.md`,
      content,
      'utf8',
      () => { }
    );
  });
};

main();