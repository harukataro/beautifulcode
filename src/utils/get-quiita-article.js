const user = "harukax";
const https = require("https");
const fs = require("fs");
const URL = `https://qiita.com/api/v2/users/${user}/items`;

const fetchItems = () =>
    new Promise((resolve, reject) => {
        https
            .get(URL, (res) => {
                let rawData = "";
                res.setEncoding("utf8");
                res.on("data", (chunk) => (rawData += chunk));
                res.on("end", () => {
                    try {
                        resolve(JSON.parse(rawData));
                    } catch {
                        reject(e);
                    }
                });
            })
            .on("error", (e) => reject(e));
    });

const main = async () => {
    const items = await fetchItems();
    items.forEach((item) => {
        const { title, tags, body, created_at } = item;
        console.log(title);
        const content = [
            "---",
            `title: ${title}`,
            `date: ${created_at.split("T")[0]}`,
            `tags: [${tags.map((tag) => `"${tag.name}"`).join(",")}]`,
            "---",
            "",
            body,
        ].join("\n");

        fs.writeFile(
            `../../content/posts/${created_at}.md`,
            content,
            "utf8",
            (date, err) => { }
        );
    });
};

main();